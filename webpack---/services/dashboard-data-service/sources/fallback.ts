import { DashboardData } from '@types';

export const generateFallbackDashboardData = (): DashboardData => {
  return {
    layout: {
      column1: ['site-details'],
      column2: [],
      activeDashboard: {
        left: [],
        right: [],
        removed: [],
      },
    },
    availableWidgets: [],
    widgetsDefinitions: {
      'site-details': {
        widgetId: 'site-details',
        permissions: [],
        customData: '',
      },
    },
  };
};
