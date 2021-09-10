import * as types from '../actionTypes/overlayActionTypes';

export const showOverlay = () => {
  return {
    type: types.SHOW_OVERLAY,
  };
};

export const hideOverlay = () => {
  return {
    type: types.HIDE_OVERLAY,
  };
};
