import * as Sentry from '@sentry/browser';
import {
  BusinessManagerModule,
  ModuleId,
  PageComponentId,
  registerModule,
  registerPageComponentMonitors,
  TModuleParams,
} from '@wix/business-manager-api';
import { DashboardAPI } from '@wix/business-manager-dashboard-api';
// @ts-ignore
import { ReactLoadableComponent } from 'react-module-container';
import { PromoteCampaignsLazyComponent } from './bm-lazy-component';
import { STORE_ORDERS_WIDGET_ID } from '../widgets/store-orders/config';

const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://75ad957211fb4fa5b8e59a7dc6e76c07@sentry.wixpress.com/50',
});

class PromoteCampaignsModule extends BusinessManagerModule {
  constructor(moduleId: ModuleId) {
    super(moduleId);
    this.registerPageComponent(
      PageComponentId.PromotePaidAds,
      PromoteCampaignsLazyComponent,
    );

    this.registerComponentWithModuleParams(
      STORE_ORDERS_WIDGET_ID,
      ReactLoadableComponent(
        STORE_ORDERS_WIDGET_ID,
        () =>
          import(
            /* webpackPrefetch: true */ '../widgets/store-orders/orders-widget-bm-component'
          ),
      ),
    );
  }

  init({ config }: TModuleParams) {
    registerPageComponentMonitors(PageComponentId.PromotePaidAds, {
      sentryClient,
    });
    DashboardAPI.registerWidgets({
      id: 'fb-ads-widget',
      staticUrl: config.topology.staticsBaseUrl,
      initialDataEndpoint: '',
    });
  }
}

registerModule(ModuleId.PromotePaidAds, PromoteCampaignsModule);
