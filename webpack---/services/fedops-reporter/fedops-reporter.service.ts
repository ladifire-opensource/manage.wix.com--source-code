import { fedopsPhases } from '@consts';
import { ServiceFactory } from '@services/types';
import { FedopsReporterService } from './fedops-reporter.types';

export const fedopsReporter: ServiceFactory<FedopsReporterService> = services => ({
  start: () => {
    const { fedops, dashboardStatus, widgetConfiguration, widgetStatus } = services;
    fedops.appLoadingPhaseStart(fedopsPhases.LOAD_FIRST_INTERACTIVE_WIDGETS);

    widgetConfiguration.getAllRegisteredWidgets().forEach(({ widgetId }) => {
      const interaction = `${widgetId}-load`;
      fedops.interactionStarted(interaction);
      widgetStatus.widgetLoaded(widgetId).then(() => fedops.interactionEnded(interaction));
    });

    dashboardStatus.dashboardFirstInteractive().then(() => {
      fedops.appLoadingPhaseFinish(fedopsPhases.LOAD_FIRST_INTERACTIVE_WIDGETS);
      fedops.appLoadingPhaseStart(fedopsPhases.LOAD_REST_OF_WIDGETS);
    });

    services.dashboardStatus.dashboardLoaded().then(() => {
      fedops.appLoadingPhaseFinish(fedopsPhases.LOAD_REST_OF_WIDGETS);
      fedops.appLoaded();
    });
  },
});
