import { ServiceFactory } from '@services/types';
import { AvailableWidgetsService } from './available-widgets.types';

export const createAvailableWidgetsService = (
  availableWidgets: string[],
): ServiceFactory<AvailableWidgetsService> => () => {
  const _availableWidgets: string[] = availableWidgets;

  return {
    getAvailableWidgets: () => _availableWidgets,
  };
};
