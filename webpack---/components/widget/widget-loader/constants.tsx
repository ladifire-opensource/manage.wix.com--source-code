export const LAZY_COMPONENT_LOADING_ERROR_NAME = 'LazyComponentLoadingError';
export const LAZY_COMPONENT_LOADING_ERROR = 'lazy-component-loading-error';

export const FAILED_TO_LOAD_DATA_HOOK = 'widget-failed-to-load';

export enum ModuleRegistryEvents {
  StartLoading = 'reactModuleContainer.componentStartLoading',
  FailedToLoad = 'reactModuleContainer.error',
}

export enum WidgetComponentNames {
  DashboardSmartHeader = 'dashboard-smart-header',
  DashboardCelebrations = 'dashboard-celebrations-app.components.celebrations-widget',
  SetupWidget = 'DASHBOARD_SETUP_APP.components.dashboard-widget',
  SiteDetails = 'DASHBOARD_SITE_DETAILS_APP.components.dashboard-widget',
  SuggestionsWidget = 'DASHBOARD_SUGGESTIONS.components.section-widget',
  TopSuggestionsWidget = 'DASHBOARD_SUGGESTIONS.components.top-widget',
  SalesWidget = 'dashboard-sales',
  Analytics = 'analytics-ng-dashboard-next-widget',
  HelpWidget = 'dashboard-help',
}
