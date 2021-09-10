import { ModuleId, registerModule } from '@wix/business-manager-api';
import { InboxModule } from './InboxModule';

registerModule(ModuleId.Engage, InboxModule);
window.__IS_BUSINESS_MANAGER__ = true;
window.__BROWSER_NOTIFICATIONS_WORKERS_PATH__ =
  '/browser-notifications-test-app/';
