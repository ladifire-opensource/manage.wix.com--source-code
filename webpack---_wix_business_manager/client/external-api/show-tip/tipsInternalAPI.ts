import { ModuleRegistry } from 'react-module-container';
import { axiosInstance } from '../../utils/axiosInstance';
import { showTip } from '../../actions/tipActions';
import { TipProps } from '../../components/TipsPanel/Tip';
import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';
import { TIPS_DEALER_PROJECT_GUID } from './getTipFromRemote';

const initMethodName = 'businessManagerTest.initTipSequence';
const nextTipMethodName = 'businessManagerTest.nextTip';

export const registerInternalAPIs = (msid, dispatch) => {
  let tips, tipsCounter;
  ModuleRegistry.registerMethod(initMethodName, () => async () => {
    const signedInstance = getCurrentInstance(appDefIds.metaSite);
    const headers = { Authorization: signedInstance };
    tipsCounter = 0;
    const url = `/_api/wix-dealer-webapp/v1/dealerOffers?realEstateId=${TIPS_DEALER_PROJECT_GUID}`;
    const response =  await axiosInstance.post(url, { headers });
    tips = response.data.offers;
  });

  ModuleRegistry.registerMethod(nextTipMethodName, () => () => {
    if (tips[tipsCounter]) {
      const tip: TipProps = dealerTipToTipProps(tips[tipsCounter++]);
      dispatch(showTip(tip));
    }
  });
};

const dealerTipToTipProps = (dealerTip): TipProps => {
  const rawTip = JSON.parse(dealerTip.asset.payloadJson);
  return {
    title: rawTip.title,
    text: rawTip.description,
    action: {
      text: rawTip.actionTarget.value.key,
      type: rawTip.actionTarget.type,
      config: rawTip.actionTarget.value.value
      },
    id: dealerTip.asset.id,
    biData: {} as any,
    leftPosition: false
  };
};
