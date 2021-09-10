import { ServicesProvider } from '@services/types';
import { notifyViewFinishedLoading, notifyViewFirstInteractive } from '@wix/business-manager-api';
import { DASHBOARD_MAIN_PAGE } from '@consts';
import { appDefId } from '../../../.module.json';
import { getDashboardModuleLoadedTime, getTimeSinceBiStart } from '../../utils/bi.utils';

export const biReporter = (services: ServicesProvider) => {
  return {
    start: () => {
      const { widgetConfiguration, availableWidgets, dashboardStatus } = services;
      const basicWidgets = widgetConfiguration
        .getBasicRegisteredWidgets()
        .map(({ widgetId }) => widgetId);
      const activeDashboardWidgets = widgetConfiguration
        .getRegisteredActiveDashboardWidgets()
        .map(({ widgetId }) => widgetId);
      const availableWidgetsIds = availableWidgets.getAvailableWidgets();

      dashboardStatus
        .dashboardFirstInteractive()
        // evid: 309
        .then(() => notifyViewFirstInteractive(DASHBOARD_MAIN_PAGE));

      dashboardStatus.basicWidgetsLoaded().then(() => sendBasicWidgetsLoadedBI(services));
      dashboardStatus.dashboardLoaded().then(() => sendDashboardLoadedBI(services));

      sendDashboardPlatformWidgetesLoadedBi(
        services,
        basicWidgets,
        activeDashboardWidgets,
        availableWidgetsIds,
      );
      subscribeToWidgetStatusChange(services, basicWidgets, activeDashboardWidgets);
    },

    sendDashboardWidgetVisibleBi: (widgetName: string, order?: string) => {
      const {
        moduleParams: { metaSiteId: msid, viewMode: hosting },
        bi,
      } = services;
      bi.dashboardWidgetSeen({ hosting, msid, order, widget_name: widgetName });
    },
  };
};

const sendDashboardPlatformWidgetesLoadedBi = (
  services: ServicesProvider,
  basicWidgets: string[],
  activeDashboardWidgets: string[],
  availableWidgets: string[],
) => {
  const {
    moduleParams: { metaSiteId: msid, viewMode: hosting },
    bi,
  } = services;

  // evid: 1183
  bi.dashboardPlatformWidgetsLoaded({
    available_widgets: basicWidgets.join(','),
    selected_active_dashboard_widgets: activeDashboardWidgets.length
      ? activeDashboardWidgets.join(',')
      : 'no-active-dashboard-widgets',
    available_active_dashboard_widgets: availableWidgets.join(','),
    hosting,
    msid,
  });
};

const subscribeToWidgetStatusChange = (
  services: ServicesProvider,
  basicWidgets: string[],
  activeDashboardWidgets: string[],
) => {
  const {
    moduleParams: { metaSiteId: msid, viewMode: hosting },
    bi,
    widgetStatus,
    widgetMetrics,
  } = services;

  const listenToWidgetStatusChange = (widgetId: string) => {
    widgetStatus.widgetLoaded(widgetId).then(async () => {
      const { pageLoadedToWidgetLoaded, widgetStartedLoadingToLoaded } =
        await widgetMetrics.getMetrics(widgetId);

      // evid: 299
      bi.widgetLoaded({
        widget_name: widgetId,
        hosting,
        msid,
        is_shown: true,
        loading_time: widgetStartedLoadingToLoaded,
        loading_time_from_start_loading_home: pageLoadedToWidgetLoaded,
      });
    });

    widgetStatus.widgetLoadingError(widgetId).then(async () => {
      // evid: 370
      services.bi.analyticsErrorMessage({
        widget_name: widgetId,
        msid: services.moduleParams.metaSiteId,
        hosting: services.moduleParams.viewMode,
        error_type: 'Widget Loading Error',
      });
    });

    widgetStatus.widgetNotPermitted(widgetId).then(async () => {
      // evid: 370
      services.bi.analyticsErrorMessage({
        widget_name: widgetId,
        msid: services.moduleParams.metaSiteId,
        hosting: services.moduleParams.viewMode,
        error_type: 'No Permission Error',
      });
    });
  };

  [...basicWidgets, ...activeDashboardWidgets].forEach(async id => {
    listenToWidgetStatusChange(id);
  });
};

const sendBasicWidgetsLoadedBI = (services: ServicesProvider) => {
  const {
    moduleParams: { metaSiteId: msid, viewMode: hosting },
    timestamp,
    bi,
  } = services;
  const timeSincePageLoad = timestamp.relativeNow();
  const timeSinceBiPerformanceStart = getTimeSinceBiStart(timeSincePageLoad);

  // evid: 1463
  bi.dashboardFinishLoadingBasicDashboardWidgets({
    hosting,
    msid,
    loading_time: timeSincePageLoad,
    loading_time_from_module: timestamp.now() - getDashboardModuleLoadedTime(msid),
    loading_time_from_start: timeSinceBiPerformanceStart,
    sub_view: DASHBOARD_MAIN_PAGE,
    view: appDefId,
  });
};

const sendDashboardLoadedBI = (services: ServicesProvider) => {
  const {
    moduleParams: { metaSiteId: msid, viewMode: hosting },
    timestamp,
    bi,
  } = services;

  // evid: 302
  notifyViewFinishedLoading(DASHBOARD_MAIN_PAGE);

  // evid: 1215
  bi.dashboardFinishLoadingLoadingTimeFromStartModule({
    hosting,
    loading_time: timestamp.now() - getDashboardModuleLoadedTime(msid),
    msid,
    sub_view: DASHBOARD_MAIN_PAGE,
    view: appDefId,
  });
};
