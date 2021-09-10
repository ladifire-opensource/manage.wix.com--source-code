import { Reducer } from 'redux';
import { TipProps } from '../components/TipsPanel/Tip';
import { SHOW_TIP, HIDE_TIP } from '../actionTypes/tipActionTypes';

const emptyState = null;

export const tip: Reducer<TipProps> = (state = emptyState, action) => {
  switch (action.type) {
    case SHOW_TIP:
      return action.tip;
    case HIDE_TIP:
      return emptyState;
    default:
      return state;
  }
};
