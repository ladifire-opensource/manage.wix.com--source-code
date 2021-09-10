import { ActiveDashboardLayout, WidgetStatus, WidgetStatusService } from '@types';
import { HttpClient } from 'yoshi-serverless-client';
import { Dispatch } from 'react';
import { ActiveDashboardSectionSelectors } from '@components/active-dashboard-section/active-dashboard-section.selectors';
import {
  ActiveDashboardSectionActionTypes,
  ActiveDashboardSectionDispatchActions,
} from './active-dashboard-section.reducers';
import { WidgetNotificationPayload } from '@services/active-dashboard-widget-listeners/active-dashboard-widget-listeners.service';
import { saveCustomizedLayout } from '../../api/save-customized-layout.api';
import {
  addWidgetToLayout,
  removeWidgetFromLayout,
  widgetExistsInLayout,
} from '@components/active-dashboard-section/active-dashboard-section.utils';
import type { TFunction } from 'yoshi-flow-bm-runtime';
import { showErrorToast } from '@services/show-toast';
import { Logger } from '@wix/bi-logger-new-dash-platform';
import {
  sendAddOrDropWidgetErrorEvent,
  sendAddOrDropWidgetEvent,
} from '@components/active-dashboard-section/bi';
import { SaveCustomizedLayoutRequest } from '../../api/types';

export interface ActiveDashboardSectionActions {
  addWidget: (params: WidgetNotificationPayload) => void;
  removeWidget: (params: WidgetNotificationPayload) => void;
  setIsCustomizing: (isCustomizing: boolean) => void;
  updateNextWidgetCol: () => void;
  handleDragEnd: ({
    layout,
    fromLocation,
    toLocation,
    widgetId,
  }: {
    layout: ActiveDashboardLayout;
    fromLocation: string;
    toLocation: string;
    widgetId: string;
  }) => void;
  setLayout: (layout: ActiveDashboardLayout) => void;
  saveLayout: (layout?: ActiveDashboardLayout, removed?: string[]) => Promise<void>;
}

export interface GetActionsParams {
  dispatch: Dispatch<ActiveDashboardSectionDispatchActions>;
  selectors: ActiveDashboardSectionSelectors;
  widgetStatus: WidgetStatusService;
  httpClient: HttpClient;
  t: TFunction;
  bi: Logger;
}

export const getActions = ({
  dispatch,
  widgetStatus,
  selectors,
  httpClient,
  t,
  bi,
}: GetActionsParams): ActiveDashboardSectionActions => {
  const actions: ActiveDashboardSectionActions = {
    setLayout: layout => {
      dispatch({ type: ActiveDashboardSectionActionTypes.SetLayout, payload: { layout } });
    },

    handleDragEnd: async ({ layout, fromLocation, toLocation, widgetId }) => {
      actions.setLayout(layout);
      actions.updateNextWidgetCol();

      try {
        await actions.saveLayout(layout);
        sendAddOrDropWidgetEvent({
          logger: bi,
          widgetName: widgetId,
          fromLocation,
          toLocation,
        });
      } catch (e) {
        showErrorToast({ message: t('dashboard.customization.move_widget_error'), isTimed: true });
        sendAddOrDropWidgetErrorEvent({
          logger: bi,
          widgetName: widgetId,
          fromLocation,
        });
      }
    },

    addWidget: async ({ widgetId, onDone, onError }) => {
      const state = selectors.getState();

      if (widgetExistsInLayout(state.widgets, widgetId)) {
        onDone();
        return;
      }

      const { widgets, removed, widgetOrder } = addWidgetToLayout(state, widgetId);

      const logSuccessBi = () => {
        sendAddOrDropWidgetEvent({
          logger: bi,
          widgetName: widgetId,
          fromLocation: 'right-panel',
          toLocation: widgetOrder!.toString(),
        });
      };

      const logErrorBi = () => {
        sendAddOrDropWidgetErrorEvent({
          logger: bi,
          widgetName: widgetId,
          fromLocation: 'right-panel',
        });
      };

      try {
        await actions.saveLayout(widgets, removed);
      } catch (e) {
        showErrorToast({ message: t('dashboard.customization.add_widget_error'), isTimed: true });
        onError();
        logErrorBi();
        return;
      }

      dispatch({ type: ActiveDashboardSectionActionTypes.AddWidget, payload: { widgetId } });
      widgetStatus.setWidgetStatus(widgetId, WidgetStatus.LOADING);
      widgetStatus.widgetLoaded(widgetId).then(async () => {
        dispatch({ type: ActiveDashboardSectionActionTypes.UpdateNextWidgetCol });
        onDone();
        logSuccessBi();
      });
      widgetStatus.widgetLoadingError(widgetId).then(() => {
        showErrorToast({ message: t('dashboard.customization.add_widget_error'), isTimed: true });

        // if layout was saved, but widget failed to load - we send onDone
        onDone();
        logErrorBi();
      });
    },

    removeWidget: async ({ widgetId, onDone, onError }) => {
      const state = selectors.getState();
      const { widgets, removed } = removeWidgetFromLayout(state, widgetId);

      try {
        await actions.saveLayout(widgets, removed);
        dispatch({ type: ActiveDashboardSectionActionTypes.RemoveWidget, payload: { widgetId } });
        onDone();
      } catch (e) {
        showErrorToast({
          message: t('dashboard.customization.remove_widget_error'),
          isTimed: true,
        });
        onError();
      }
    },

    updateNextWidgetCol: () => {
      dispatch({ type: ActiveDashboardSectionActionTypes.UpdateNextWidgetCol });
    },

    setIsCustomizing: isCustomizing => {
      dispatch({
        type: ActiveDashboardSectionActionTypes.SetIsCustomizing,
        payload: isCustomizing,
      });
    },

    saveLayout: (widgets, removed) => {
      const { left, right } = widgets || selectors.getWidgets();

      const payload: SaveCustomizedLayoutRequest = {
        layout: {
          left: left.map(widget => ({
            widgetId: widget,
          })),
          right: right.map(widget => ({
            widgetId: widget,
          })),
        },
        removed: removed || selectors.getRemoved(),
      };

      return httpClient.request(saveCustomizedLayout)(payload);
    },
  };

  return actions;
};
