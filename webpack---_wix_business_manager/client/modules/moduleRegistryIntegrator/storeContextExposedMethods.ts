import { provisionAppFromStore } from '../../external-api/provision-app/provisionApp';
import { sendAppEngagedEvent } from '../../external-api/app-engaged/appEngaged';
import { PROVISION_APP, APP_ENGAGED } from '@wix/business-manager-api';

export const storeIntegrationMethods = {
  [PROVISION_APP]: provisionAppFromStore,
  [APP_ENGAGED]: sendAppEngagedEvent
};
