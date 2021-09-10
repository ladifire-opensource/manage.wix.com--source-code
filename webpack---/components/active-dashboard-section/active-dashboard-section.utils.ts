import { ActiveDashboardColumns, ActiveDashboardLayout } from '@types';
import { cloneDeep } from 'lodash';
import { ActiveDashboardSectionState } from './active-dashboard-section.types';

export const getNextWidgetColumn = (widgets: ActiveDashboardLayout): ActiveDashboardColumns => {
  return widgets[ActiveDashboardColumns.RIGHT].length < widgets[ActiveDashboardColumns.LEFT].length
    ? ActiveDashboardColumns.RIGHT
    : ActiveDashboardColumns.LEFT;
};

export const widgetExistsInLayout = (widgets: ActiveDashboardLayout, widgetId: string): boolean => {
  const allWidgets = [
    ...widgets[ActiveDashboardColumns.LEFT],
    ...widgets[ActiveDashboardColumns.RIGHT],
  ];

  return allWidgets.includes(widgetId);
};

export const addWidgetToLayout = (currState: ActiveDashboardSectionState, widgetId: string) => {
  const state = cloneDeep(currState);

  state.widgets[state.nextWidgetCol].push(widgetId);
  state.nextWidgetCol = getNextWidgetColumn(state.widgets);

  const indexInRemovedList = state.removed.indexOf(widgetId);

  if (indexInRemovedList >= 0) {
    state.removed.splice(indexInRemovedList, 1);
  }

  return {
    widgets: state.widgets,
    removed: state.removed,
    nextWidgetCol: state.nextWidgetCol,
    widgetOrder: getWidgetOrder(state, widgetId),
  };
};

export const getWidgetOrder = (state: ActiveDashboardSectionState, widgetId: string) => {
  const leftIndex = state.widgets.left.indexOf(widgetId);
  const order = leftIndex !== -1 ? leftIndex * 2 : state.widgets.right.indexOf(widgetId) * 2 + 1;

  return order;
};

export const removeWidgetFromLayout = (state: ActiveDashboardSectionState, widgetId: string) => {
  const nextWidgetsState = {
    [ActiveDashboardColumns.LEFT]: [...state.widgets.left],
    [ActiveDashboardColumns.RIGHT]: [...state.widgets.right],
    removed: [],
  };
  const nextRemoved = [...state.removed];
  let searchInCol: ActiveDashboardColumns = ActiveDashboardColumns.LEFT;
  let nextWidgetCol = state.nextWidgetCol;

  const getIndexToRemove = (col: ActiveDashboardColumns) => nextWidgetsState[col].indexOf(widgetId);

  let indexToRemove = getIndexToRemove(searchInCol);
  if (indexToRemove < 0) {
    searchInCol = ActiveDashboardColumns.RIGHT;
    indexToRemove = getIndexToRemove(searchInCol);
  }

  if (indexToRemove >= 0) {
    nextWidgetsState[searchInCol].splice(indexToRemove, 1);
    nextWidgetCol = getNextWidgetColumn(nextWidgetsState);
    nextRemoved.push(widgetId);
  }

  return {
    widgets: nextWidgetsState,
    removed: nextRemoved,
    nextWidgetCol,
  };
};
