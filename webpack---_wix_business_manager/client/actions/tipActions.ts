import { SHOW_TIP, HIDE_TIP } from '../actionTypes/tipActionTypes';
import { Action } from 'redux';
import { TipProps } from '../components/TipsPanel/Tip';

type ShowTipAction = Action & { tip: TipProps };
type ShowTipActionCreator = (TipProps) => (dispatch: (args: ShowTipAction) => void) => void;

type HideTipAction = Action;
type HideTipActionCreator = () => HideTipAction;

const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

export const showTip: ShowTipActionCreator = tip => dispatch =>
  delay(2000).then(() =>
    dispatch({
      type: SHOW_TIP,
      tip
    }));

export const hideTip: HideTipActionCreator = () => {
  return {
    type: HIDE_TIP
  };
};
