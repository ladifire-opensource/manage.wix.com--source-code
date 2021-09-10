import { ServiceFactory } from '@services/types';
import { DashboardStatusService } from './dashboard-status.types';

export const dashboardStatus: ServiceFactory<DashboardStatusService> = services => {
  const excludeFromMetrics = new Set([
    'analytics-ng-dashboard-next-widget',
    'analytics-ng-insights-widget',
  ]);

  const getAllWidgets = () =>
    services.widgetConfiguration
      .getAllRegisteredWidgets()
      .filter(({ includeInDashboardMainMetrics, widgetId }) => {
        return includeInDashboardMainMetrics !== false && !excludeFromMetrics.has(widgetId);
      });

  const getBasicWidgets = () =>
    services.widgetConfiguration
      .getBasicRegisteredWidgets()
      .filter(({ includeInDashboardMainMetrics, widgetId }) => {
        return includeInDashboardMainMetrics !== false && !excludeFromMetrics.has(widgetId);
      });

  return {
    dashboardLoaded: async () =>
      Promise.all(
        getAllWidgets().map(({ widgetId }) => services.widgetStatus.widgetLoaded(widgetId)),
      ),

    basicWidgetsLoaded: async () =>
      Promise.all(
        getBasicWidgets().map(({ widgetId }) => services.widgetStatus.widgetLoaded(widgetId)),
      ),

    dashboardFirstInteractive: async () =>
      Promise.all(
        getAllWidgets()
          .filter(({ isFirstInteractive }) => isFirstInteractive)
          .map(({ widgetId }) => services.widgetStatus.widgetLoaded(widgetId)),
      ),
  };
};
