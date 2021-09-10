import { Reducer } from 'redux';
import * as types from '../actionTypes/overlayActionTypes';
import { OverlayEntry } from '../types/overlay';

export const overlay: Reducer<OverlayEntry> = (state = { isShown: false }, action) => {
  switch (action.type) {
    case types.SHOW_OVERLAY:
      return {...state, isShown: true};
    case types.HIDE_OVERLAY:
      return {...state, isShown: false};
    default:
      return state;
  }
};
