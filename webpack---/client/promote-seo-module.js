import {
  ModuleId,
  BusinessManagerModule,
  registerModule,
  registerPageComponentMonitors,
  PageComponentId,
} from '@wix/business-manager-api';
import { sentryClient } from './sentry-client';
import { ModuleRegistry, ReactLoadableComponent } from 'react-module-container';

import PromoteSeoLazyComponent from './business-manager-manifest';

const PROMOTE_SEO_SWITCH_GOOGLE_ACCOUNT_FLOW =
  'promote-seo-switch-google-account-flow';

class PromoteSeoModule extends BusinessManagerModule {
  constructor(moduleId) {
    super(moduleId);
    ModuleRegistry.registerComponent(
      PageComponentId.PromoteSeo,
      () => PromoteSeoLazyComponent,
    );
  }

  init() {
    registerPageComponentMonitors(PageComponentId.PromoteSeo, {
      sentryClient,
    });
  }

  register(moduleParams) {
    super.register(moduleParams);
    this.registerComponentWithModuleParams(
      PROMOTE_SEO_SWITCH_GOOGLE_ACCOUNT_FLOW,
      ReactLoadableComponent(PROMOTE_SEO_SWITCH_GOOGLE_ACCOUNT_FLOW, async () =>
        import(
          './components/switch-google-account-flow/switch-google-account-flow'
        ),
      ),
    );
  }
}

ModuleRegistry.getModule(ModuleId.PromoteSeo) ||
  registerModule(ModuleId.PromoteSeo, PromoteSeoModule);
