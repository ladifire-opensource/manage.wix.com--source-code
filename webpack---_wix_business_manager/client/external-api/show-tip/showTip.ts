import { ModuleRegistry } from 'react-module-container';
import { Store } from 'redux';
import { showTip, hideTip } from '../../actions/tipActions';
import { showTipActioMethodName, ShowTipParams, onNavigation } from '@wix/business-manager-api';
import { getTipFromRemote } from './getTipFromRemote';
import { experimentsSelectors } from '../../services/essentials';
import { IState } from '../../types/store';
import { sendBusinessManagerBI } from '../../services/BIService';
import { BIEvents } from '../../../common/consts/bi';
import { registerInternalAPIs } from './tipsInternalAPI';
import { getMetaSiteId } from '../../selectors/siteMetaDataSelectors';
import { isAnswersChatVisible } from '../../selectors/answersChatSelectors';

const TipsShortDelaySpec = 'specs.wos.TipsShortDelay';

export const initShowTipApi = (store: Store<IState>) => {

  const state = store.getState();
  const dispatch = store.dispatch;

  if (experimentsSelectors(state).enabled(TipsShortDelaySpec)) {
    registerInternalAPIs(getMetaSiteId(state), dispatch);
  }
  let navigationWasTriggered;
  const shouldApplyShortDelay = experimentsSelectors(state).enabled(TipsShortDelaySpec);
  const clearCancellationFlag = () => {
    navigationWasTriggered = false;
  };
  const dontShowNextTip = () => {
    navigationWasTriggered = true;
  };
  const shouldShowNextTip = () => !navigationWasTriggered && !isAnswersChatVisible(store.getState());

  const showTipMethod = async (showTipParams: ShowTipParams) => {
    clearCancellationFlag();
    const tipToShow = await getTipFromRemote(
      showTipParams.sourceApplication,
      getMetaSiteId(state),
      shouldApplyShortDelay
    );
    if (tipToShow && !navigationWasTriggered) {
      sendBusinessManagerBI({
        evid: BIEvents.exposureEvent,
        hosting: 'MA',
        msid: getMetaSiteId(state),
        exposure_name: 'tip',
        item_id: tipToShow.id
      });
    }
    if (tipToShow && shouldShowNextTip()) {
      dispatch(showTip(tipToShow));
    }
  };
  ModuleRegistry.registerMethod(showTipActioMethodName, () => showTipMethod);

  const handleNavigation = () => {
    dontShowNextTip();
    return dispatch(hideTip());
  };
  onNavigation(handleNavigation);
};
