import { ServiceRegistry } from './utils/service-registry';
import { storePendingBIData } from './bi';
import { ISearchResult, IServiceSearchResults, DataType, ISearchSectionsResult, IResultsStatistics, SearchableService, ResultsSectionStats } from '../types';
import { BIEvents, BISources, SEARCH_ORIGIN } from '../services/bi/bi-events';
import { ActionTypes, SearchAction } from './types';
import { dataFetchCompleted, dataFetchStart } from './data-ready';
import { IStoreState, ISectionsPaging, ISectionPaging, ShowMoreType } from '../types/store';
import { ISearchResultsBIEvent } from '../services/bi/send-bi-events';
import { getCurrentView, getCurrentSubView } from '../services/current-view';
import * as time from './time';
import { experimentsSelectors } from '@wix/wix-experiments-redux';

type IFlattenResults = Pick<ISearchSectionsResult, 'results' | 'totalResults' | 'availableResults'>;

interface ISectionSearchResults extends IServiceSearchResults {
  section: string;
}

const flattenArray = (arrayOfAllResults: ISectionSearchResults[]) =>
  arrayOfAllResults.reduce<IFlattenResults>(
    (result, val) => {
      result.results.push.apply(result.results, val.results);
      result.totalResults[val.section] = val.totalResults;
      result.availableResults[val.section] = val.availableResults;
      return result;
    },
    {
      results: [],
      availableResults: {},
      totalResults: {}
    } as IFlattenResults
  );

const clearSearch = (dispatch) => {
  dispatch(setSearchQuery(''));
  dispatch(setSearchQueryThatProvidedResults(''));
  dispatch(setSearchResults([], ServiceRegistry.getEmptyQueryPagingInfo()));
};

export const createBIEventWithCurrentView = (query: string, getState: () => IStoreState): ISearchResultsBIEvent => {
  const { metaSiteId } = getState();
  return {
    src: BISources.businessManager,
    evid: BIEvents.searchPerformed,
    query,
    msid: metaSiteId,
    view: getCurrentView(),
    sub_view: getCurrentSubView(),
    results: [],
    origin: SEARCH_ORIGIN,
  };
};

const getServicesStatsArray = (servicesStats): ResultsSectionStats => Object.values(servicesStats);

const calculateDurationInMs = (startTimeMs: number) => time.getCurrentTime() - startTimeMs;

const createSuccessfullSectionStatistics = (section: string, service: SearchableService, results: ISearchResult[], totalResults: number, startTimeMs: number) => ({
  section,
  num_results: Math.min(results.length, service.pageSize),
  total_results: totalResults,
  time_to_load_ms: calculateDurationInMs(startTimeMs),
  is_expand_results_shown: 0
});

const createFaultySectionStatistics = (section: string) => ({
  section,
  num_results: -1,
  total_results: -1,
  time_to_load_ms: -1,
  is_expand_results_shown: 0
});

const performSearchOnAllSections = async (query: string, getState: () => IStoreState): Promise<ISearchSectionsResult> => {
  const state = getState();
  const { metaSiteId, isADIEditorType: isADI, locale } = state;
  const services = ServiceRegistry.getServices();
  const servicesStats: IResultsStatistics = {};
  const startTimeMs = time.getCurrentTime();
  const experiments = experimentsSelectors(getState());

  const arrayOfAllResults = await Promise.all<ISectionSearchResults>(
    services.map(({ section, service }) =>
      new Promise(resolve =>
        service.search({ query, metaSiteId, isADI, locale, experiments })
          .then(({ results, totalResults, availableResults }) => {
            servicesStats[section] = createSuccessfullSectionStatistics(section, service, results, totalResults, startTimeMs);

            resolve({ results, section, totalResults, availableResults });
          })
          .catch(() => {
            servicesStats[section] = createFaultySectionStatistics(section);

            resolve({ results: [], section, totalResults: -1, availableResults: 0 });
          })
      )
    )
  );

  return {
    ...flattenArray(arrayOfAllResults),
    servicesStats
  };
};

export const performSearch = (query: string) => {
  return async (dispatch, getState: () => IStoreState) => {

    if (!query) {
      clearSearch(dispatch);
      return;
    }

    dispatch(dataFetchStart());
    dispatch(setSearchQuery(query));

    const biEventWithCurrentViews = createBIEventWithCurrentView(query, getState);

    const searchSectionResults = await performSearchOnAllSections(query, getState);
    const sectionsPagingInfo = ServiceRegistry.getSectionPagingInfo(searchSectionResults);

    const { results, servicesStats } = searchSectionResults;

    dispatch(setSearchResults(results, sectionsPagingInfo));
    storePendingBIData(biEventWithCurrentViews, getServicesStatsArray(servicesStats));

    dispatch(setSearchQueryThatProvidedResults(query));
    dispatch(dataFetchCompleted());
  };
};

const setSearchQuery = (query: string): SearchAction => ({
  type: ActionTypes.SET_SEARCH_QUERY,
  query
});

const setSearchQueryThatProvidedResults = (query: string): SearchAction => ({
  type: ActionTypes.SEARCH_RESULTS_SET_QUERY_THAT_PROVIDED_RESULTS,
  query
});

const setSearchResults = (results: ISearchResult[], sections: ISectionsPaging): SearchAction => ({
  type: ActionTypes.SEARCH_RESULTS_RECEIVED,
  results,
  sections
});

export const extendSectionResults = (section: DataType) => {
  return async (dispatch, getState: () => IStoreState) => {
    const { searchStore: { sections = {} } = {} } = getState();
    dispatch(updateSectionPaging(section, {
      ...sections[section],
      displayedResults: sections[section].availableResults,
      showMoreType: sections[section].availableResults < sections[section].totalResults ? ShowMoreType.GotoMore : ShowMoreType.None
    }));
  };
};

const updateSectionPaging = (section: DataType, pagingInfo: ISectionPaging) => ({
  type: ActionTypes.SEARCH_RESULTS_UPDATE_SECTION_PAGING,
  section,
  pagingInfo
});
