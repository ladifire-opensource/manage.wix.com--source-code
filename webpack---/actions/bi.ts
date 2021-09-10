import {BIConsts, SEARCH_ORIGIN} from '../services/bi/bi-events';
import { ISectionVisibleResults, sendSearchPerformedBiEvent, sendOptionFocusedBiEvent, sendOptionClickedBiEvent, ISearchResultsBIEvent, sendDialogClosedBIEvent, sendDialogScrollBIEvent, sendShowMoreClickedEvent, sendSeeAllClickedEvent, ResultsTrigger } from '../services/bi/send-bi-events';
import { IResultEntry } from '../components/SearchBox/Entries';
import { IStoreState, ISectionsPaging, ShowMoreType } from '../types/store';
import { getCurrentView, getCurrentSubView } from '../services/current-view';
import { ResultsSectionStats, DataType } from '../types';
import { createBIEventWithCurrentView } from './search';
import { ServiceRegistry } from './utils/service-registry';

let _pendingBIData: ISearchResultsBIEvent = null;

export const storePendingBIData = (biEvent: ISearchResultsBIEvent, results: ResultsSectionStats) => {
  _pendingBIData = {
    ...biEvent,
    results
  };
};

export const getAndCleanPendingBIData = (): ISearchResultsBIEvent => {
  const pendingBIData = _pendingBIData;
  _pendingBIData = null;
  return pendingBIData;
};

export const sendBISearchResults = (seenResults: ISectionVisibleResults, sectionsPaging: ISectionsPaging, biData?: ISearchResultsBIEvent, trigger: ResultsTrigger = ResultsTrigger.Search) => {
  const pendingBIData = biData || getAndCleanPendingBIData();
  const didAnyResultsReturn = pendingBIData.results.reduce((sum, section) => sum + section.num_results, 0);

  const sendSearchBIWithVisibleResultsInSections = () => sendSearchPerformedBiEvent({
    ...pendingBIData,
    triggred_from: trigger,
    results: pendingBIData.results.map(result => ({
      ...result,
      seen_results: seenResults[result.section] || 0,
      is_expand_results_shown: sectionsPaging[result.section].showMoreType === ShowMoreType.None ? 0 : 1
    }))
  });

  const sendSearchBIWithEmptyResults = () => sendSearchPerformedBiEvent({
    ...pendingBIData,
    triggred_from: trigger,
    results: [{
      section: BIConsts.no_results_section,
      num_results: 0,
      total_results: 0,
      time_to_load_ms: 0,
      seen_results: 0,
      is_expand_results_shown: 0
    }]
  });

  if (didAnyResultsReturn) {
    sendSearchBIWithVisibleResultsInSections();
  } else {
    sendSearchBIWithEmptyResults();
  }
};

const getServiceStats = (sectionVisibleResults: ISectionVisibleResults, sectionsPaging: ISectionsPaging): ResultsSectionStats => {
  const sectionNames = ServiceRegistry.getSectionNames();
  const servicesStats: ResultsSectionStats = sectionNames.map(section => ({
    section,
    num_results: sectionsPaging[section].displayedResults,
    time_to_load_ms: 0,
    is_expand_results_shown: 0,
    total_results: 0,
    seen_results: sectionVisibleResults[section] || 0
  }));

  return servicesStats;
};

const sendBIShowMoreSearchResults = (sectionVisibleResults: ISectionVisibleResults, sectionsPaging: ISectionsPaging) =>
  async (dispatch, getState: () => IStoreState) => {

    const { searchStore: { query } } = getState();
    const servicesStats = getServiceStats(sectionVisibleResults, sectionsPaging);

    const biData = {
      ...createBIEventWithCurrentView(query, getState),
      results: servicesStats
    };

    await sendBISearchResults(sectionVisibleResults, sectionsPaging, biData, ResultsTrigger.ShowMore);
  };

export interface SearchResultsBIParams {
  isUserSeeingNewResults: boolean;
  showMoreClicked: boolean;
  sectionVisibleResults: ISectionVisibleResults;
  sectionsPaging: ISectionsPaging;
}

export const sendBIOnSearchResults = ({ isUserSeeingNewResults, showMoreClicked, sectionVisibleResults, sectionsPaging }: SearchResultsBIParams) =>
  async (dispatch, getState: () => IStoreState) => {
    if (isUserSeeingNewResults) {
      sendBISearchResults(sectionVisibleResults, sectionsPaging);
    } else if (showMoreClicked) {
      dispatch(sendBIShowMoreSearchResults(sectionVisibleResults, sectionsPaging));
    }
  };

export interface ISearchBoxFocusOption extends IResultEntry {
  isFirtstHover: boolean;
  sectionVisibleResults: ISectionVisibleResults;
  sectionsPaging: ISectionsPaging;
}

export const sendBIOptionFocused = ({ type, displayTitle, id, index, indexInSection, sectionIndex, isFirtstHover, sectionVisibleResults, sectionsPaging }: ISearchBoxFocusOption) =>
  async (dispatch, getState: () => IStoreState) => {

    const { metaSiteId, searchStore: { query } } = getState();
    const servicesStats = getServiceStats(sectionVisibleResults, sectionsPaging);

    await sendOptionFocusedBiEvent({
      msid: metaSiteId,
      view: getCurrentView(),
      sub_view: getCurrentSubView(),
      section: type,
      query,
      title: type === DataType.Contacts ? 'Contact' : displayTitle,
      title_id: id,
      item_index: index,
      section_index: sectionIndex,
      item_index_in_section: indexInSection,
      is_first_hover: isFirtstHover,
      results: servicesStats,
      origin: SEARCH_ORIGIN
    });
  };

export const sendBIOptionClicked = ({ type, displayTitle, id, index, indexInSection, sectionIndex }: IResultEntry) =>
  async (dispatch, getState: () => IStoreState) => {

    const { metaSiteId, searchStore: { query } } = getState();
    await sendOptionClickedBiEvent({
      msid: metaSiteId,
      view: getCurrentView(),
      sub_view: getCurrentSubView(),
      section: type,
      query,
      title: type === DataType.Contacts ? 'Contact' : displayTitle,
      title_id: id,
      item_index: index,
      section_index: sectionIndex,
      item_index_in_section: indexInSection,
      origin: SEARCH_ORIGIN
    });
  };

  export enum CloseDialogReason {
    ResultClicked = 'Result Clicked',
    ClickOutside = 'Click Outside',
    ClickOnClear = 'Click On Clear'
  }

  export const sendBIDropdownClosed = (reason: CloseDialogReason, time_in_dialog: number, sectionVisibleResults: ISectionVisibleResults, sectionsPaging: ISectionsPaging) =>
    async (dispatch, getState: () => IStoreState) => {

      const { metaSiteId, searchStore: { query } } = getState();
      const servicesStats = getServiceStats(sectionVisibleResults, sectionsPaging);

      await sendDialogClosedBIEvent({
        msid: metaSiteId,
        view: getCurrentView(),
        sub_view: getCurrentSubView(),
        reason,
        query,
        results: servicesStats,
        time_in_dialog,
        origin: SEARCH_ORIGIN
      });
    };

  export const sendBIDropdownScroll = () =>
    async (dispatch, getState: () => IStoreState) => {

      const { metaSiteId } = getState();
      await sendDialogScrollBIEvent({
        msid: metaSiteId,
        view: getCurrentView(),
        sub_view: getCurrentSubView(),
        origin: SEARCH_ORIGIN
      });
    };

export const sendBIShowMoreClicked = (section: string, section_index: number, sectionVisibleResults: ISectionVisibleResults, sectionsPaging: ISectionsPaging) =>
  async (dispatch, getState: () => IStoreState) => {
    const { metaSiteId, searchStore: { query } } = getState();
    const servicesStats = getServiceStats(sectionVisibleResults, sectionsPaging);

    await sendShowMoreClickedEvent({
      msid: metaSiteId,
      view: getCurrentView(),
      sub_view: getCurrentSubView(),
      section: section as DataType,
      section_index,
      query,
      results: servicesStats,
      origin: SEARCH_ORIGIN
    });
  };

export const sendBISeeAllClicked = (section: string, section_index: number, sectionVisibleResults: ISectionVisibleResults, sectionsPaging: ISectionsPaging) =>
  async (dispatch, getState: () => IStoreState) => {
    const { metaSiteId, searchStore: { query } } = getState();
    const servicesStats = getServiceStats(sectionVisibleResults, sectionsPaging);

    await sendSeeAllClickedEvent({
      msid: metaSiteId,
      view: getCurrentView(),
      sub_view: getCurrentSubView(),
      section: section as DataType,
      section_index,
      query,
      results: servicesStats,
      origin: SEARCH_ORIGIN
    });
  };
