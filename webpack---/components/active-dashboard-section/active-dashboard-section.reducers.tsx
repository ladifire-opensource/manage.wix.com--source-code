import { ActionMap, ActiveDashboardLayout } from '@types';
import { ActiveDashboardSectionState } from './active-dashboard-section.types';
import {
  addWidgetToLayout,
  getNextWidgetColumn,
  removeWidgetFromLayout,
} from './active-dashboard-section.utils';

export enum ActiveDashboardSectionActionTypes {
  SetLayout = 'setLayout',
  AddWidget = 'addWidget',
  RemoveWidget = 'removeWidget',
  UpdateNextWidgetCol = 'updateNextWidgetCol',
  SetIsCustomizing = 'setIsCustomizing',
}

type ActiveDashboardSectionPayload = {
  [ActiveDashboardSectionActionTypes.SetLayout]: { layout: ActiveDashboardLayout };
  [ActiveDashboardSectionActionTypes.AddWidget]: { widgetId: string };
  [ActiveDashboardSectionActionTypes.RemoveWidget]: { widgetId: string };
  [ActiveDashboardSectionActionTypes.UpdateNextWidgetCol]: undefined;
  [ActiveDashboardSectionActionTypes.SetIsCustomizing]: boolean;
};

export type ActiveDashboardSectionDispatchActions = ActionMap<
  ActiveDashboardSectionPayload
>[keyof ActionMap<ActiveDashboardSectionPayload>];

export const activeDashboardSectionReducer = (
  state: ActiveDashboardSectionState,
  action: ActiveDashboardSectionDispatchActions,
) => {
  switch (action.type) {
    case ActiveDashboardSectionActionTypes.SetLayout: {
      return { ...state, widgets: { ...action.payload.layout } };
    }

    case ActiveDashboardSectionActionTypes.AddWidget: {
      const { widgets, removed } = addWidgetToLayout(state, action.payload.widgetId);
      return { ...state, widgets, removed };
    }
    case ActiveDashboardSectionActionTypes.RemoveWidget: {
      const { widgets, removed, nextWidgetCol } = removeWidgetFromLayout(
        state,
        action.payload.widgetId,
      );

      return { ...state, widgets, nextWidgetCol, removed };
    }

    case ActiveDashboardSectionActionTypes.UpdateNextWidgetCol: {
      return { ...state, nextWidgetCol: getNextWidgetColumn(state.widgets) };
    }

    case ActiveDashboardSectionActionTypes.SetIsCustomizing: {
      return { ...state, isCustomizing: action.payload };
    }

    default:
      return state;
  }
};
