import { Reducer } from 'redux';
import * as types from '../actionTypes/toastActionTypes';
import { ToastEntry } from '../types/toasts';
import * as lifecycleTypes from '../actionTypes/lifecycleActionTypes';
import { ToastScope } from '@wix/business-manager-api';

export const toasts: Reducer<ToastEntry[]> = (state = [], action) => {
  switch (action.type) {
    case types.SHOW_TOAST:
      const { config, id } = action;
      return [...state, { config, id }];
    case types.REMOVE_TOAST:
      return state.filter(item => item.id !== action.id);
    case lifecycleTypes.MODULE_CHANGED:
      return state.filter(item => item.config.scope !== ToastScope.APP);
    default:
      return state;
  }
};
