import { ServiceFactory } from '@services/types';
import { DashboardWidget } from '@types';
import { WidgetConfigurationService } from './widget-configuration.types';

export const widgetConfiguration: ServiceFactory<WidgetConfigurationService> = services => {
  let registeredWidgets: {
    coreWidgets: DashboardWidget[];
    activeDashboardWidgets: DashboardWidget[];
  };

  return {
    registerWidgets: (coreWidgets: string[], activeDashboardWidgets: string[]) => {
      const _coreWidgets = coreWidgets.map(widgetId =>
        services.widgetsDefinitions.getById(widgetId),
      );
      const _activeDashboardWidgets = activeDashboardWidgets.map(widgetId =>
        services.widgetsDefinitions.getById(widgetId),
      );

      registeredWidgets = {
        coreWidgets: _coreWidgets,
        activeDashboardWidgets: _activeDashboardWidgets,
      };
    },
    getAllRegisteredWidgets: () => [
      ...registeredWidgets.coreWidgets,
      ...registeredWidgets.activeDashboardWidgets,
    ],
    getBasicRegisteredWidgets: () => registeredWidgets.coreWidgets,
    getRegisteredActiveDashboardWidgets: () => registeredWidgets.activeDashboardWidgets,
  };
};
