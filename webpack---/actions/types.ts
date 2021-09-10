import { ISearchResult, DataType } from '../types';
import { ISearchResultsBIEvent } from '../services/bi/send-bi-events';
import { ISectionsPaging, ISectionPaging } from '../types/store';

export enum ActionTypes {
  DATA_FETCHING = 'DATA_FETCHING',
  DATA_FETCHED = 'DATA_FETCHED',
  SET_SEARCH_QUERY = 'SET_SEARCH_QUERY',
  SEARCH_RESULTS_RECEIVED = 'SEARCH_RESULTS_RECEIVED',
  SEARCH_RESULTS_PEND_BI_HEURISTICS = 'SEARCH_RESULTS_PEND_BI_HEURISTICS',
  SEARCH_RESULTS_SET_QUERY_THAT_PROVIDED_RESULTS = 'SEARCH_RESULTS_SET_QUERY_THAT_PROVIDED_RESULTS',
  SEARCH_RESULTS_UPDATE_SECTION_PAGING = 'SEARCH_RESULTS_UPDATE_SECTION_PAGING'
}

export type SearchAction = {
  type: ActionTypes.SET_SEARCH_QUERY;
  query: string;
} | {
  type: ActionTypes.SEARCH_RESULTS_RECEIVED;
  results: ISearchResult[];
  sections: ISectionsPaging;
} | {
  type: ActionTypes.SEARCH_RESULTS_PEND_BI_HEURISTICS;
  event: ISearchResultsBIEvent;
} | {
  type: ActionTypes.SEARCH_RESULTS_SET_QUERY_THAT_PROVIDED_RESULTS;
  query: string;
} | {
  type: ActionTypes.SEARCH_RESULTS_UPDATE_SECTION_PAGING;
  section: DataType;
  pagingInfo: ISectionPaging;
};

export type DataFetchAction = {
  type: ActionTypes.DATA_FETCHED | ActionTypes.DATA_FETCHING | string;
};
