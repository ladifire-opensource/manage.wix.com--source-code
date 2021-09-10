import { BusinessManagerModule, ModuleId, registerModule } from '@wix/business-manager-api';
import * as config from '../configs/backoffice';
import { registerBrowserNotificationsMethods } from '../registration';
import { BUSINESS_MANAGER_MODULE_ID } from '../types';

class BrowserNotificationsClientModule extends BusinessManagerModule {
  constructor(moduleId: ModuleId) {
    super(moduleId);
    registerBrowserNotificationsMethods(config);
  }
}

registerModule(BUSINESS_MANAGER_MODULE_ID as any, BrowserNotificationsClientModule);
