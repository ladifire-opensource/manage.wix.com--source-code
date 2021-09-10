import { ModuleId, PageComponentId, TModuleParams } from '@wix/business-manager-api';

// Note: should be in sync with the config inside your BM module ERB
export const MODULE_ID = ModuleId.AnalyticsNG;
export const ANALYTICS_NG_BM_COMPONENT_NAME = PageComponentId.AnalyticsNgBm;
export const ANALYTICS_NG_TOOLS_COMPONENT_NAME = PageComponentId.AnalyticsNgTools;
export const ANALYTICS_NG_PERFORMANCE_COMPONENT_NAME = PageComponentId.AnalyticsNgPerformance;
export const ANALYTICS_NG_CUSTOM_REPORTS_COMPONENT_NAME = PageComponentId.AnalyticsNgCustomReports;
export const ANALYTICS_NG_NATIVE_OVERVIEWS_COMPONENT_NAME =
  PageComponentId.AnalyticsNgNativeOverviews;

export interface IERBConfig {
  topology: {
    staticsUrl: string;
    sharedTranslations: string;
    reactDealerViewerStaticsUrl: string;
    reactDealerViewerTranslationsUrl: string;
    dashboardWidget: string;
  };
}

export interface IBMModuleParams extends TModuleParams {
  config: IERBConfig;
}
