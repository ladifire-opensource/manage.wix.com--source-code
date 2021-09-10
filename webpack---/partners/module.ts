import {
  BusinessManagerModule,
  registerModule,
  ModuleId,
  notifyViewStartLoading,
} from '@wix/business-manager-api';
import { ReactLoadableComponent } from 'react-module-container';
import { MODULE_ID, COMPONENT_NAME } from './config';

class BMModule extends BusinessManagerModule {
  constructor(moduleId: ModuleId) {
    super(moduleId);
    notifyViewStartLoading(COMPONENT_NAME);
    this.registerPageComponent(
      COMPONENT_NAME,
      ReactLoadableComponent(
        COMPONENT_NAME,
        () => import(/* webpackPrefetch: true */ './client'),
      ),
    );
  }
}

registerModule(MODULE_ID, BMModule);
