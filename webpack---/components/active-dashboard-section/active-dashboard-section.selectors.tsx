import { ActiveDashboardColumns, ActiveDashboardLayout } from '@types';
import { getWidgetOrder } from '@components/active-dashboard-section/active-dashboard-section.utils';
import { ActiveDashboardSectionState } from './active-dashboard-section.types';

export interface ActiveDashboardSectionSelectors {
  getState: () => ActiveDashboardSectionState;
  getWidgets: () => ActiveDashboardLayout;
  getAvailableWidgets: () => string[];
  getNextWidgetCol: () => ActiveDashboardColumns;
  getIsCustomizing: () => boolean;
  getRemoved: () => string[];
  hasWidgets: () => boolean;
  getWidgetOrder: (widgetId: string) => number | undefined;
}

export const getSelectors = (
  state: ActiveDashboardSectionState,
): ActiveDashboardSectionSelectors => {
  return {
    getState: () => state,
    getWidgets: () => state.widgets,
    getAvailableWidgets: () => state.availableWidgets,
    getWidgetOrder: widgetId => {
      return getWidgetOrder(state, widgetId);
    },
    getNextWidgetCol: () => state.nextWidgetCol,
    getIsCustomizing: () => state.isCustomizing,
    getRemoved: () => state.removed,
    hasWidgets: () => !!(state.widgets.left.length || state.widgets.right.length),
  };
};
