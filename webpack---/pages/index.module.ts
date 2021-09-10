import { ResolveFn, ComponentHooksFlowAPI, FilesFn } from 'yoshi-flow-bm-runtime';
import { WidgetRegistry } from '@services/widget-registry';
import { DashboardRootProps } from '@components/dashboard';
import { loadDashboardData } from '@services/dashboard-data-service';
import { fedopsPhases } from '@consts';
import { setDashboardModuleLoadedTime } from '../utils/bi.utils';
import { DASHBOARD_NON_PERMITTED_WIDGET } from '../experiments';

export interface DashboardModule {
  widgetRegistry: WidgetRegistry;
}

export interface DashboardModuleOptions extends ComponentHooksFlowAPI {
  module: DashboardModule;
}

export const resolve: ResolveFn<DashboardRootProps> = async ({
  moduleParams,
  getFedopsLogger,
  getBILogger,
  sentry,
  httpClient,
  getExperiments,
  getI18n,
}: DashboardModuleOptions) => {
  setDashboardModuleLoadedTime(moduleParams.metaSiteId);
  const [fedopsLogger, biLogger, experiments, i18n] = await Promise.all([
    getFedopsLogger(),
    getBILogger(),
    getExperiments(),
    getI18n(),
  ]);

  // Untill the old dashboard deprecated we need to send appLoaded for the old dashboard.
  // BM sends appStarted to our home componentId and we need to send app loaded in order
  // to aviod false alerts.
  fedopsLogger.appLoaded({ appId: 'home' });

  // This will send app load started instead of BM because we have a different pageId.
  fedopsLogger.appLoadStarted();
  fedopsLogger.appLoadingPhaseStart(fedopsPhases.LOAD_DASHBOARD_PAGE);

  const { userPermissions, metaSiteId, userId } = moduleParams;
  const isNonPermittedExperimentOn = experiments.enabled(DASHBOARD_NON_PERMITTED_WIDGET);

  const dashboardData = await loadDashboardData({
    metaSiteId,
    userId,
    userPermissions,
    fedopsLogger,
    biLogger,
    sentry,
    httpClient,
    isNonPermittedExperimentOn,
    i18n,
  });

  return { dashboardData };
};

// support old dashboard api for not breaking modules
(window as any).DashboardAPI = {
  registerWidgets: (props: any) => {
    console.warn('business-dashboard: old dashboard api usage:', props.id);
  },
};

// This is a workaround to make sales widget load faster
export const files: FilesFn = flowAPI => {
  const {
    config: {
      topology: { reactDealerViewer },
    },
    debug,
  } = flowAPI.moduleParams;

  return [
    `${reactDealerViewer}dealer-react-viewer.bundle${minified(debug)}.js`,
    `${reactDealerViewer}dealer-react-viewer${minified(debug)}.css`,
  ];
};

const minified = (debug: boolean) => (debug ? '' : '.min');
