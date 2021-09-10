import { sendSdkBI } from '../../services/BIService';
import { BIEvents } from '../../../common/consts/bi';
import { IState } from '../../types/store';
import { getEmbeddedServiceById } from '../../selectors/embeddedServicesSelectors';
import { getMetaSiteId } from '../../selectors/siteMetaDataSelectors';

enum PremiumIntent {
  NEUTRAL = 'NEUTRAL',
  FREE = 'FREE',
  PAID = 'PAID'
}

interface AppEngagedParams {
  premiumIntent: PremiumIntent;
  appDefinitionId: string;
}

export const sendAppEngagedEvent = (store: IState) => (appEngagedParams: AppEngagedParams) => {
  const embeddedService = getEmbeddedServiceById(store, appEngagedParams.appDefinitionId);
  const msid = getMetaSiteId(store);
  const instanceId = embeddedService ? embeddedService.instanceId : '';
  if (appEngagedParams && appEngagedParams.premiumIntent &&
      appEngagedParams.premiumIntent in PremiumIntent && appEngagedParams.appDefinitionId) {
    sendSdkBI({
      evid: BIEvents.appEngaged,
      app_id: appEngagedParams.appDefinitionId,
      instance_id: instanceId,
      msid,
      premium_intent: appEngagedParams.premiumIntent
    });
  }

};
