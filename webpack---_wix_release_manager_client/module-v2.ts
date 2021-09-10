import {
  BusinessManagerModule,
  ModuleId,
  registerModule,
  registerPageComponentMonitors,
} from '@wix/business-manager-api';
import { ReactLoadableComponent } from 'react-module-container';
import { MODULE_ID, LAZY_COMPONENT_ID } from './config';
import { sentryClient } from './sentryClient';

class BMModule extends BusinessManagerModule {
  constructor(moduleId: ModuleId) {
    super(moduleId);
    this.registerPageComponent(
      LAZY_COMPONENT_ID,
      ReactLoadableComponent(LAZY_COMPONENT_ID, () =>
        import(/* webpackPrefetch: true */ './client-v2'),
      ),
    );
  }
  init() {
    registerPageComponentMonitors(LAZY_COMPONENT_ID, {
      sentryClient,
    });
  }
}

registerModule(MODULE_ID, BMModule);
