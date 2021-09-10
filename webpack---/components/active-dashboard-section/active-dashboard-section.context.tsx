import React, { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { ActiveDashboardColumns, ActiveDashboardLayout } from '@types';
import {
  ActiveDashboardSectionSelectors,
  getSelectors,
} from './active-dashboard-section.selectors';
import { ActiveDashboardSectionActions, getActions } from './active-dashboard-section.actions';
import { activeDashboardSectionReducer } from './active-dashboard-section.reducers';
import { useServices } from '@hooks/services';
import { useBILogger, useHttpClient, useTranslation } from 'yoshi-flow-bm-runtime';
import { ActiveDashboardSectionState } from './active-dashboard-section.types';

export const ActiveDashboardSectionContext = createContext<{
  selectors: ActiveDashboardSectionSelectors;
  actions: ActiveDashboardSectionActions;
}>({
  selectors: {} as ActiveDashboardSectionSelectors,
  actions: {} as ActiveDashboardSectionActions,
});

export const useActiveDashboardSection = () => useContext(ActiveDashboardSectionContext);

export interface ActiveDashboardSectionProps {
  widgets: ActiveDashboardLayout;
  availableWidgets: string[];
  removed: string[];
}

export const ActiveDashboardSectionProvider: FC<ActiveDashboardSectionProps> = props => {
  const {
    children,
    widgets = { left: [], right: [], removed: [] },
    removed = [],
    availableWidgets = [],
  } = props;
  const { widgetStatus } = useServices();
  const httpClient = useHttpClient();
  const { t } = useTranslation();
  const bi = useBILogger();
  const initialActiveDashboardState: ActiveDashboardSectionState = {
    widgets,
    removed,
    nextWidgetCol: ActiveDashboardColumns.LEFT,
    isCustomizing: false,
    availableWidgets,
  };
  const [state, dispatch] = useReducer(activeDashboardSectionReducer, initialActiveDashboardState);
  const selectors = getSelectors(state);

  const actions = getActions({ dispatch, selectors, widgetStatus, httpClient, t, bi });

  useEffect(() => {
    if (widgets?.left && widgets?.right) {
      actions.setLayout(widgets);
      actions.updateNextWidgetCol();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ActiveDashboardSectionContext.Provider value={{ selectors, actions }}>
      {children}
    </ActiveDashboardSectionContext.Provider>
  );
};
