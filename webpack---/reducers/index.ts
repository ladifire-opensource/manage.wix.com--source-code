import { searchStore } from './search';
import { combineReducers } from 'redux';
import { IStoreState } from '../types/store';
import { isDataLoading } from './is-data-loading';

const buildFakeReducer = (defaultValue) => (state = defaultValue, action) => state;

export const rootReducer: (state: IStoreState, action: any) => IStoreState = combineReducers<IStoreState>({
  isDataLoading,
  searchStore,
  locale: buildFakeReducer('en'),
  metaSiteId: buildFakeReducer(''),
  isADIEditorType: buildFakeReducer(false),
  debug: buildFakeReducer(false),
  experiments: buildFakeReducer({}),
});
