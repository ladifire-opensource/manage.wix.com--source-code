import { sendSearchBI } from './bi-service';
import { BIConsts, BIEvents, SEARCH_ORIGIN } from './bi-events';
import { ResultsSectionStats, DataType } from '../../types';

export interface IBaseBIParams {
  src?: number;
  evid?: number;
  msid: string;
  view: string;
  sub_view: string;
  origin: string;
}

export interface ISearchResultsBIEvent extends IBaseBIParams {
  src: number;
  evid: number;
  query: string;
  results: ResultsSectionStats;
}

export interface ISectionVisibleResults {
  [key: string]: number;
}

const noResultsData: ResultsSectionStats = [{
  section: BIConsts.no_results_section,
  num_results: 0,
  total_results: 0,
  seen_results: 0,
  time_to_load_ms: 0,
  is_expand_results_shown: 0
}];

function structureSectionResults(results: ResultsSectionStats): string {
  if (!results || !results.length) {
    return JSON.stringify(noResultsData);
  }
  return JSON.stringify(results);
}

export enum ResultsTrigger {
  Search = 'search',
  ShowMore = 'expand_results'
}

interface ISearchPerformedBIParams extends IBaseBIParams {
  query: string;
  results: ResultsSectionStats;
  triggred_from: ResultsTrigger;
}

export const sendSearchPerformedBiEvent = async ({ query, msid, results, view, triggred_from, sub_view }: ISearchPerformedBIParams) => {
  await sendSearchBI({
    evid: BIEvents.searchPerformed,
    query,
    msid,
    view,
    sub_view,
    triggred_from,
    results: structureSectionResults(results),
    origin: SEARCH_ORIGIN
  });
};

export interface IOptionBIParams extends IBaseBIParams {
  section: string;
  query: string;
  title: string;
  title_id: string;
  section_index: number;
  item_index: number;
  item_index_in_section: number;
}

const sendOptionBiEvent = async (evid: number, { evid: discard_evid, ...params }: IOptionBIParams) => {
  await sendSearchBI({
    evid,
    ...params
  });
};

export interface IFocusedBIParams extends IOptionBIParams {
  is_first_hover: boolean;
  results: ResultsSectionStats;
}

export const sendOptionFocusedBiEvent = async ({ results, ...params }: IFocusedBIParams) => {
  const focusParams = {
    ...params,
    results: structureSectionResults(results)
  };

  await sendOptionBiEvent(BIEvents.searchResultFocused, focusParams);
};

export const sendOptionClickedBiEvent = async (params: IOptionBIParams) => {
  await sendOptionBiEvent(BIEvents.searchResultClicked, params);
};

export interface IDialogClosedParams extends IBaseBIParams {
  reason: string;
  time_in_dialog: number;
  query: string;
  results: ResultsSectionStats;
}

export const sendDialogClosedBIEvent = async (params: IDialogClosedParams) => {
  await sendSearchBI({
    evid: BIEvents.searchDropdownClosed,
    ...params,
    results: structureSectionResults(params.results)
  });
};

export interface IDialogScrollParams extends IBaseBIParams { }

export const sendDialogScrollBIEvent = async (params: IDialogScrollParams) => {
  await sendSearchBI({
    evid: BIEvents.searchResultsScrolled,
    ...params
  });
};

interface IExtendResultsClickParams extends IBaseBIParams {
  section: DataType;
  section_index: number;
  title?: string;
  title_id?: string;
  query: string;
  results: ResultsSectionStats;
}

const sendExtendResultsClickEvent = async ({ results, ...params }: IExtendResultsClickParams) => {
  await sendSearchBI({
    ...params,
    results: structureSectionResults(results)
  });
};

export type IShowMoreClickedParams = IExtendResultsClickParams;

export const sendShowMoreClickedEvent = async (params: IShowMoreClickedParams) => sendExtendResultsClickEvent({
  evid: BIEvents.searchShowMoreClicked,
  title: 'expand_results',
  title_id: 'expand_results',
  ...params
});

export type ISeeAllClickedParams = IExtendResultsClickParams;

export const sendSeeAllClickedEvent = async (params: ISeeAllClickedParams) => sendExtendResultsClickEvent({
  evid: BIEvents.searchSeeAllClicked,
  title: 'go_to_relevant_page',
  title_id: 'go_to_relevant_page',
  ...params
});
