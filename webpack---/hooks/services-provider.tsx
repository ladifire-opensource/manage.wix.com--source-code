import { biReporter } from '@services/bi-reporter';
import { dashboardStatus } from '@services/dashboard-status';
import { fedopsReporter } from '@services/fedops-reporter';
import { timestamp } from '@services/timestamp';
import { widgetConfiguration } from '@services/widget-configuration';
import { widgetMetrics } from '@services/widget-metrics';
import { widgetStatus } from '@services/widget-status';
import { sessionRecorder } from '@services/session-recorder';
import { useMemo } from 'react';
import { useBILogger, useFedops, useModuleParams, useSentry } from 'yoshi-flow-bm-runtime';
import { initializeServices } from '../services-initializer';
import { ServicesProvider } from '@services/types';
import { createInitialLayoutService } from '@services/initial-layout';
import { createAvailableWidgetsService } from '@services/available-widgets';
import { DashboardLayout, WidgetsDefinitions } from '@types';
import { createWidgetsDefinitionsService } from '@services/widgets-definitions';

export const useServicesContainer = ({
  layout,
  widgetsDefinitions,
  availableWidgets,
  overrides = {},
}: {
  widgetsDefinitions: WidgetsDefinitions;
  layout: DashboardLayout;
  availableWidgets: string[];
  overrides: Partial<ServicesProvider> | undefined;
}) => {
  const fedops = useFedops();
  const sentry = useSentry();
  const bi = useBILogger();
  const moduleParams = useModuleParams();

  return useMemo(
    () =>
      initializeServices({
        sentry: () => sentry,
        fedops: () => fedops,
        bi: () => bi,
        moduleParams: () => moduleParams,
        wixRecorder: () => overrides.wixRecorder || window.wixRecorder,
        fedopsReporter,
        dashboardStatus,
        widgetConfiguration,
        widgetStatus,
        widgetMetrics,
        biReporter,
        timestamp: ctx => overrides.timestamp || timestamp(ctx),
        sessionRecorder,
        initialLayout: createInitialLayoutService(layout),
        availableWidgets: createAvailableWidgetsService(availableWidgets),
        widgetsDefinitions: createWidgetsDefinitionsService(widgetsDefinitions),
      }),
    // modules params is changing for some reason
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};
