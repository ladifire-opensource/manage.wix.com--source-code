import { ActionTypes, DataFetchAction } from '../actions/types';

export const isDataLoading = (state = false, action: DataFetchAction) => {
  switch (action.type) {
    case ActionTypes.DATA_FETCHING:
      return true;
    case ActionTypes.DATA_FETCHED:
      return false;
    default:
      return state;
  }
};
