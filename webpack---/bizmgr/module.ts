import {
  BusinessManagerModule,
  registerModule,
  ModuleId,
  notifyViewStartLoading,
  registerPageComponentMonitors,
} from '@wix/business-manager-api';
import { ReactLoadableComponent } from 'react-module-container';
import { MODULE_ID, COMPONENT_NAME } from './config';

import { sentryClient } from '../services/sentry-client';

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

  init() {
    registerPageComponentMonitors(COMPONENT_NAME, {
      sentryClient,
    });
  }
}

registerModule(MODULE_ID, BMModule);
