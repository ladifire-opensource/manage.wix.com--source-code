import { ActiveDashboardLayout, DashboardData, WidgetDefinition, WidgetsDefinitions } from '@types';
import { BrowserClient } from '@sentry/browser';
import { widgetMissingFromDefinitions, SentryMetaData } from '@services/sentry';

interface PermittedParams {
  userPermissions: string[];
  widget: WidgetDefinition;
}

export const mapDashboardData = ({
  sentry,
  sentryMetaData,
  dashboardData,
  userPermissions,
  isNonPermittedExperimentOn,
}: {
  sentry: BrowserClient;
  sentryMetaData: SentryMetaData;
  dashboardData: DashboardData;
  userPermissions: string[];
  isNonPermittedExperimentOn: boolean;
}): DashboardData => {
  let activeDashboard: ActiveDashboardLayout = { left: [], right: [], removed: [] };

  if (dashboardData.layout.activeDashboard) {
    activeDashboard = getActiveDashboardSection({
      sentry,
      sentryMetaData,
      dashboardData,
      userPermissions,
      isNonPermittedExperimentOn,
    });
  }

  return {
    ...dashboardData,
    layout: {
      ...getMainLayout({
        sentry,
        sentryMetaData,
        dashboardData,
        userPermissions,
      }),
      activeDashboard,
    },
  };
};

const isWidgetPermitted = ({ userPermissions, widget }: PermittedParams): Boolean =>
  !widget?.permissions ||
  widget.permissions?.every((permission: string) => userPermissions.includes(permission));

const getMainLayout = ({
  sentry,
  sentryMetaData,
  dashboardData,
  userPermissions,
}: {
  sentry: BrowserClient;
  sentryMetaData: SentryMetaData;
  dashboardData: DashboardData;
  userPermissions: string[];
}) => {
  const { widgetsDefinitions } = dashboardData;

  return {
    column1: filterWidgets({
      widgets: dashboardData.layout.column1,
      widgetsDefinitions,
      sentry,
      sentryMetaData,
      userPermissions,
      shouldRenderNonPermittedWidgets: false,
    }),
    column2: filterWidgets({
      widgets: dashboardData.layout.column2,
      widgetsDefinitions,
      sentry,
      sentryMetaData,
      userPermissions,
      shouldRenderNonPermittedWidgets: false,
    }),
  };
};

const getActiveDashboardSection = ({
  sentry,
  sentryMetaData,
  dashboardData,
  userPermissions,
  isNonPermittedExperimentOn,
}: {
  sentry: BrowserClient;
  sentryMetaData: SentryMetaData;
  dashboardData: DashboardData;
  userPermissions: string[];
  isNonPermittedExperimentOn: boolean;
}): ActiveDashboardLayout => {
  const { widgetsDefinitions, layout } = dashboardData;

  return {
    left: filterWidgets({
      widgets: layout.activeDashboard.left,
      widgetsDefinitions,
      sentry,
      sentryMetaData,
      userPermissions,
      shouldRenderNonPermittedWidgets: isNonPermittedExperimentOn,
    }),
    right: filterWidgets({
      widgets: layout.activeDashboard.right,
      widgetsDefinitions,
      sentry,
      sentryMetaData,
      userPermissions,
      shouldRenderNonPermittedWidgets: isNonPermittedExperimentOn,
    }),
    removed: layout.activeDashboard.removed,
  };
};

const filterWidgets = ({
  widgets,
  widgetsDefinitions,
  sentry,
  sentryMetaData,
  userPermissions,
  shouldRenderNonPermittedWidgets,
}: {
  widgets: string[];
  widgetsDefinitions: WidgetsDefinitions;
  sentryMetaData: SentryMetaData;
  sentry: BrowserClient;
  userPermissions: string[];
  shouldRenderNonPermittedWidgets: boolean;
}) => {
  return widgets.filter(widgetId => {
    const widgetDefinition = widgetsDefinitions[widgetId];

    if (!widgetDefinition) {
      widgetMissingFromDefinitions(sentry, sentryMetaData, widgetId);
    }

    return (
      widgetDefinition &&
      (shouldRenderNonPermittedWidgets ||
        isWidgetPermitted({
          userPermissions,
          widget: widgetDefinition,
        }))
    );
  });
};
