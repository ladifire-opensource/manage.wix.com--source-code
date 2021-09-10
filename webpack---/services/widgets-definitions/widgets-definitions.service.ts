import { ServiceFactory } from '@services/types';
import { WidgetsDefinitions } from '@types';
import { WidgetsDefinitionsService } from './widgets-definitions.types';

export const createWidgetsDefinitionsService = (
  definitions: WidgetsDefinitions,
): ServiceFactory<WidgetsDefinitionsService> => services => {
  const widgetsDefinitions: WidgetsDefinitions = definitions;

  return {
    getAll: () => widgetsDefinitions,
    getById: (widgetId: string) => widgetsDefinitions[widgetId] || { widgetId },
  };
};
