import { axiosInstance } from '../../utils/axiosInstance';
import { TipExternal } from './builders';
import { TipProps } from '../../components/TipsPanel/Tip';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';

export const TIPS_DEALER_PROJECT_GUID = 'ffc04780-7e52-465f-86f4-1dabc87f0e5f';

export const getTipFromRemote = async (sourceApplication, msid, oneMinuteDelay = false) => {
  const delay = oneMinuteDelay ? 1 : 24 * 60;
  const url = `/_api/whats-next-web/tips?appDefId=${sourceApplication}&delayInMinutes=${delay}`;
  const headers = { Authorization: getCurrentInstance(appDefIds.metaSite) };
  const response = await axiosInstance.get(url, { headers });
  const tip: TipExternal = response.data.tip;
  if (!tip.id) {
    return null;
  }
  const tipProps: TipProps = {
    id: tip.id,
    title: tip.title,
    text: tip.description,
    action: {
      text: tip.actionLabel,
      type: tip.actionTarget.type,
      config: tip.actionTarget.target
    },
    biData: {
      asset_campaign_guid: TIPS_DEALER_PROJECT_GUID,
      asset_campaign_id: tip.name,
      offering_guid: tip.id,
      asset_location_on_page: 0,
      promotion_asset_type: tip.actionTarget.type,
      hosting: 'MA',
      msid
    },
    leftPosition: sourceApplication === appDefIds.inbox
  };
  return tipProps;
};
