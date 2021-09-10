import { ActionTypes, SearchAction } from '../actions/types';
import { ISearchStoreState } from '../types/store';

const initialState: ISearchStoreState = {
  query: '',
  queryThatProvidedResults: '',
  results: [],
  sections: {}
};

export const searchStore = (state: ISearchStoreState = initialState, action: SearchAction): ISearchStoreState => {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.query
      };
    case ActionTypes.SEARCH_RESULTS_RECEIVED:
      return {
        ...state,
        results: action.results,
        sections: action.sections
      };
    case ActionTypes.SEARCH_RESULTS_SET_QUERY_THAT_PROVIDED_RESULTS:
      return {
        ...state,
        queryThatProvidedResults: action.query
      };
    case ActionTypes.SEARCH_RESULTS_UPDATE_SECTION_PAGING:
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.section]: action.pagingInfo
        }
      };
    default:
      return state;
  }
};
