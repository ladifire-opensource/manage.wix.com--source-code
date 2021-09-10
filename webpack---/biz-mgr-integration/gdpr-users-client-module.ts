import { ModuleRegistry } from 'react-module-container';
import { BusinessManagerModule, ModuleId, registerModule } from '@wix/business-manager-api';
import { GdprUsersClientAppLazyPageComponent } from './gdpr-users-client-lazy-page-component';
import { LAZY_PAGE_COMPONENT, MODULE_ID } from './config';

class GdprUsersClientAppModule extends BusinessManagerModule {
  constructor(moduleId: ModuleId) {
    super(moduleId);

    ModuleRegistry.registerComponent(LAZY_PAGE_COMPONENT, () => GdprUsersClientAppLazyPageComponent);
  }
}

registerModule(MODULE_ID, GdprUsersClientAppModule);
