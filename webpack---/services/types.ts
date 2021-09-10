import type { useBILogger, useFedops, useModuleParams, useSentry } from 'yoshi-flow-bm-runtime';
import { BiReporterService } from './bi-reporter/bi-reporter.types';
import { DashboardStatusService } from './dashboard-status/dashboard-status.types';
import { FedopsReporterService } from './fedops-reporter/fedops-reporter.types';
import { Timestamp } from './timestamp/timestamp.types';
import { WidgetConfigurationService } from './widget-configuration/widget-configuration.types';
import { WidgetMetricsService } from './widget-metrics/widget-metrics.types';
import { WidgetStatusService } from './widget-status/widget-status.types';
import type { WixRecorder } from '@wix/wix-recorder';
import { SessionRecorderService } from './session-recorder/session-recorder.types';
import { InitialLayoutService } from './initial-layout/initial-layout.types';
import { WidgetsDefinitionsService } from './widgets-definitions/widgets-definitions.types';
import { AvailableWidgetsService } from '@services/available-widgets/available-widgets.types';

export * from './bi-reporter/bi-reporter.types';
export * from './dashboard-status/dashboard-status.types';
export * from './fedops-reporter/fedops-reporter.types';
export * from './timestamp/timestamp.types';
export * from './widget-configuration/widget-configuration.types';
export * from './widget-metrics/widget-metrics.types';
export * from './widget-status/widget-status.types';
export * from './initial-layout/initial-layout.types';
export * from './available-widgets/available-widgets.types';
export * from './widgets-definitions/widgets-definitions.types';

export interface ServicesProvider {
  sentry: ReturnType<typeof useSentry>;
  fedops: ReturnType<typeof useFedops>;
  bi: ReturnType<typeof useBILogger>;
  moduleParams: ReturnType<typeof useModuleParams>;
  wixRecorder: WixRecorder;
  timestamp: Timestamp;
  widgetStatus: WidgetStatusService;
  widgetMetrics: WidgetMetricsService;
  dashboardStatus: DashboardStatusService;
  widgetConfiguration: WidgetConfigurationService;
  fedopsReporter: FedopsReporterService;
  biReporter: BiReporterService;
  sessionRecorder: SessionRecorderService;
  initialLayout: InitialLayoutService;
  widgetsDefinitions: WidgetsDefinitionsService;
  availableWidgets: AvailableWidgetsService;
}

export type ServiceFactory<S> = (services: ServicesProvider) => S;
