import { ModuleRegistry } from 'react-module-container';

import {
  ModuleId,
  BusinessManagerModule,
  registerModule,
  PageComponentId,
  registerPageComponentMonitors,
} from '@wix/business-manager-api';

import MarketingIntegrationLazyComponent from './manifest';
import { sentryClient as miSentryClient } from './services/sentry-client';
import { sentryClient as gmbSentryClient } from './gmb/services/sentry-client';
import { GmbAppLazy } from './gmb/gmb-app-lazy';
import { GET_GMB_ACCESS_TOKEN } from './gmb/gmb-api';
import { getGMBAccessToken } from './gmb/api/get-access-token';

class MarketingIntegrationModule extends BusinessManagerModule {
  register() {
    ModuleRegistry.registerComponent(
      PageComponentId.MarketingIntegration,
      () => MarketingIntegrationLazyComponent,
    );
    ModuleRegistry.registerComponent(
      PageComponentId.GoogleMyBusiness,
      () => GmbAppLazy,
    );
    ModuleRegistry.registerMethod(
      GET_GMB_ACCESS_TOKEN,
      () => getGMBAccessToken,
    );
  }

  init() {
    registerPageComponentMonitors(PageComponentId.MarketingIntegration, {
      sentryClient: miSentryClient,
    });
    registerPageComponentMonitors(PageComponentId.GoogleMyBusiness, {
      sentryClient: gmbSentryClient,
    });
  }
}

registerModule(ModuleId.MarketingIntegration, MarketingIntegrationModule);
