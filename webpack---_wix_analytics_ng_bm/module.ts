import {
  appDefIds,
  BusinessManagerModule,
  getCurrentInstance,
  PageComponentId,
  registerModule,
  registerPageComponentMonitors,
  TModuleParams,
} from '@wix/business-manager-api';
import { ModuleRegistry, ReactLoadableComponent } from 'react-module-container';
import axios, { AxiosInstance } from 'axios';
import { registerWidget } from '@wix/business-dashboard-api';

import {
  ANALYTICS_NG_BM_COMPONENT_NAME,
  ANALYTICS_NG_CUSTOM_REPORTS_COMPONENT_NAME,
  ANALYTICS_NG_NATIVE_OVERVIEWS_COMPONENT_NAME,
  ANALYTICS_NG_PERFORMANCE_COMPONENT_NAME,
  ANALYTICS_NG_TOOLS_COMPONENT_NAME,
  MODULE_ID,
} from './config';
import { sentryClient } from './utils/sentry-client';
import { withModuleProps } from './hocs/withModuleProps';
import { StorageService } from './services/StorageService';
import { TimeService } from './services/TimeService';
import { PremiumService } from './services/PremiumService';
import { IInitialDataService, IPremiumService, ITimeService } from './types';
import { ReportingService } from './services/ReportingServices/ReportingService';
import { DashboardWidgetLazy } from './exported-components/DashboardWidgetLazy';
import { InitialDataService } from './services/InitialDataService';
import { NGServerService } from './services/NGServerService';
import { AppsService } from './services/AppsService';
import { ComponentIds } from './constants/enums';
import { EmbeddedWidgetLazy } from './exported-components/EmbeddedWidgetLazy';
import { withServices } from './modules/services';
import { withProps } from './hocs/withProps';
import { InsightsWidgetLazy } from './exported-components/InsightsWidgetLazy';
import { EmbeddedReportLazy } from './exported-components/EmbeddedReportLazy';
import { withEntryPoint } from './hocs/withEntryPoint';

class BMModule extends BusinessManagerModule {
  _reportingService: ReportingService;
  _storageService: StorageService;
  _timeService: ITimeService;
  _premiumService: IPremiumService;
  _initialDataService: IInitialDataService;
  _ngServerService: NGServerService;
  _appsService: AppsService;

  _createAxiosInstance({ baseURL = '/', instance = '' }): AxiosInstance {
    return axios.create({
      baseURL,
      headers: { Authorization: instance },
    });
  }

  initServices(moduleParams: TModuleParams) {
    // TODO should be appDefIds.analyticsNg
    const instance = getCurrentInstance(appDefIds.analytics);
    this.initializeTimeService();
    this.initializeNGServerService(instance);
    this.initializePremiumService(moduleParams, instance);
    this.initializeStorageService(moduleParams, instance);
    this.initializeAppsService();
    this.initializeReportingService(moduleParams);
    this.initializeInitialDataService(moduleParams);
  }

  register(moduleParams: TModuleParams) {
    this.initServices(moduleParams);

    this.registerAnalyticsNativeOverviewsPageComponent();
    this.registerAnalyticsReportsPageComponent();
    this.registerAnalyticsToolsPageComponent();
    this.registerAnalyticsPerformancePageComponent();
    this.registerAnalyticsCustomReportsPageComponent();

    if (process.env.NODE_ENV === 'production') {
      registerPageComponentMonitors(PageComponentId.AnalyticsNgBm, {
        sentryClient,
      });
    }
  }

  init(moduleParams: TModuleParams) {
    this.registerAnalyticsStatsWidget(moduleParams);
    this.registerInsightsWidget(moduleParams);
  }

  initializeNGServerService(instance: string) {
    this._ngServerService = new NGServerService('/analytics-ng', instance);
  }

  initializePremiumService(moduleParams: TModuleParams, instance: string) {
    const axiosInstance = this._createAxiosInstance({ instance });
    const { metaSiteId } = moduleParams;

    this._premiumService = new PremiumService(metaSiteId, axiosInstance);

    this._premiumService.on('error', ({ metaSiteId: errorMetaSiteId, error }) => {
      console.error('Error in Premium Service', { metaSiteId: errorMetaSiteId }, error);
    });
  }

  initializeTimeService() {
    this._timeService = new TimeService();
  }

  registerInsightsWidget(moduleParams: TModuleParams) {
    ModuleRegistry.registerComponent('analytics-ng-insights-widget' as PageComponentId, () =>
      withProps(
        InsightsWidgetLazy,
        moduleParams,
        'analytics-ng-insights-widget', // analytics-ng-insights-widget is defined in package.json under "entry"
        ComponentIds.analyticsInsightsWidget,
      ),
    );

    registerWidget({
      widgetId: 'analytics-ng-insights-widget',
      bmComponentName: 'analytics-ng-insights-widget',
    });
  }

  registerAnalyticsStatsWidget(moduleParams: TModuleParams) {
    ModuleRegistry.registerComponent('analytics-ng-dashboard-next-widget' as PageComponentId, () =>
      withModuleProps(
        DashboardWidgetLazy,
        this._reportingService,
        this._initialDataService,
        moduleParams,
        'analytics-ng-dashboard-next-widget', // analytics-ng-dashboard-next-widget is defined in package.json under "entry"
        ComponentIds.dashboardNext,
      ),
    );

    registerWidget({
      widgetId: 'analytics-ng-dashboard-next-widget',
      bmComponentName: 'analytics-ng-dashboard-next-widget',
    });

    ModuleRegistry.registerComponent('analytics-embedded-report' as PageComponentId, () =>
      withEntryPoint(
        EmbeddedReportLazy,
        moduleParams,
        'analytics-embedded-report', // analytics-embedded-report is defined in package.json under "entry"
        ComponentIds.analyticsEmbeddedReport,
      ),
    );

    ModuleRegistry.registerComponent(
      'analytics-dashboard-embedded-component' as PageComponentId,
      () =>
        withModuleProps(
          EmbeddedWidgetLazy,
          this._reportingService,
          this._initialDataService,
          moduleParams,
          'analytics-dashboard-container',
          ComponentIds.analyticsDashboardContainer,
        ),
    );
  }

  registerAnalyticsReportsPageComponent() {
    this.registerPageComponent(
      ANALYTICS_NG_BM_COMPONENT_NAME,
      withServices({
        component: ReactLoadableComponent(
          ANALYTICS_NG_BM_COMPONENT_NAME,
          () =>
            import(
              /* webpackChunkName: "analytics-ng-bm" */
              /* webpackPrefetch: true */
              './client'
            ),
        ),
        services: {
          storage: this._storageService,
        },
      }),
    );
  }

  registerAnalyticsCustomReportsPageComponent() {
    this.registerPageComponent(
      ANALYTICS_NG_CUSTOM_REPORTS_COMPONENT_NAME,
      ReactLoadableComponent(
        ANALYTICS_NG_CUSTOM_REPORTS_COMPONENT_NAME,
        () =>
          import(
            /* webpackChunkName: "analytics-ng-custom-reports" */
            /* webpackPrefetch: true */
            './custom-reports-client'
          ),
      ),
    );
  }

  registerAnalyticsToolsPageComponent() {
    this.registerPageComponent(
      ANALYTICS_NG_TOOLS_COMPONENT_NAME,
      ReactLoadableComponent(
        ANALYTICS_NG_TOOLS_COMPONENT_NAME,
        () =>
          import(
            /* webpackChunkName: "analytics-ng-tools" */
            /* webpackPrefetch: true */
            './tools-client'
          ),
      ),
    );
  }

  registerAnalyticsPerformancePageComponent() {
    this.registerPageComponent(
      ANALYTICS_NG_PERFORMANCE_COMPONENT_NAME,
      ReactLoadableComponent(
        ANALYTICS_NG_PERFORMANCE_COMPONENT_NAME,
        () =>
          import(
            /* webpackChunkName: "analytics-ng-performance" */
            /* webpackPrefetch: true */
            './performance-client'
          ),
      ),
    );
  }

  registerAnalyticsNativeOverviewsPageComponent() {
    this.registerPageComponent(
      ANALYTICS_NG_NATIVE_OVERVIEWS_COMPONENT_NAME,
      ReactLoadableComponent(
        ANALYTICS_NG_NATIVE_OVERVIEWS_COMPONENT_NAME,
        () =>
          import(
            /* webpackChunkName: "analytics-ng-native-overviews" */
            /* webpackPrefetch: true */
            './overviews-client'
          ),
      ),
    );
  }

  initializeStorageService(moduleParams: TModuleParams, instance: string): void {
    const { metaSiteId, userId } = moduleParams;
    this._storageService = new StorageService(`${metaSiteId}-${userId}`, instance);
  }

  initializeReportingService(moduleParams: TModuleParams) {
    const { metaSiteId } = moduleParams;

    this._reportingService = new ReportingService(
      metaSiteId,
      this._storageService,
      this._timeService,
      this._premiumService,
      this._ngServerService,
      this._appsService,
      {},
    );

    void this._reportingService.initialize(); // This is a promise;
  }

  initializeInitialDataService(moduleParams: TModuleParams) {
    const { metaSiteId, userId } = moduleParams;

    this._initialDataService = new InitialDataService(metaSiteId, userId);
  }

  initializeAppsService() {
    this._appsService = new AppsService();
  }
}

registerModule(MODULE_ID, BMModule);
