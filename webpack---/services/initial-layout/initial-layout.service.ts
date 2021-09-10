import { ServiceFactory } from '@services/types';
import { DashboardLayout } from '@types';
import { InitialLayoutService } from './initial-layout.types';

export const createInitialLayoutService = (
  dashboardLayout: DashboardLayout,
): ServiceFactory<InitialLayoutService> => () => {
  const initialLayout: DashboardLayout = dashboardLayout;

  return {
    getInitialLayout: () => initialLayout,
    getWidgetOrder: widgetId => {
      const { left, right } = initialLayout.activeDashboard;

      const leftIndex = left.indexOf(widgetId);
      const rightIndex = right.indexOf(widgetId);

      if (leftIndex < 0 && rightIndex < 0) {
        return undefined;
      }

      return leftIndex !== -1 ? leftIndex * 2 : rightIndex * 2 + 1;
    },
  };
};
