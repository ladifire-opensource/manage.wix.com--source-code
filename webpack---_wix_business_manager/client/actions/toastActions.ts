import { ToastConfig } from '@wix/business-manager-api';
import { Action } from 'redux';
import * as types from '../actionTypes/toastActionTypes';
import { ToastId, ToastEntry } from '../types/toasts';

export type ShowToastAction = Action & ToastEntry;
export type ShowToastActionCreator = (ToastId, ToastConfig) => ShowToastAction;
export type RemoveToastAction = Action & { id: ToastId };
export type RemoveToastActionCreator = (ToastId) => RemoveToastAction;

export const showToast: ShowToastActionCreator = (id: ToastId, config: ToastConfig): ShowToastAction => {
  return {
    type: types.SHOW_TOAST,
    config,
    id
  };
};

export const removeToast: RemoveToastActionCreator = (id: ToastId): RemoveToastAction => {
  return {
    type: types.REMOVE_TOAST,
    id
  };
};
