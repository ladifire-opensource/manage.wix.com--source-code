import { ActionTypes } from './types';

export const dataFetchStart = () => ({
  type: ActionTypes.DATA_FETCHING
});

export const dataFetchCompleted = () => ({
  type: ActionTypes.DATA_FETCHED
});
