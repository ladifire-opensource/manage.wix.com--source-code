import { Action } from 'redux';
import * as types from '../actionTypes/lifecycleActionTypes';

export type ModuleChangeAction = Action;
export type ModuleChangeActionCreator = () => ModuleChangeAction;

export const moduleChanged: ModuleChangeActionCreator = () => {
  return {
    type: types.MODULE_CHANGED
  };
};
