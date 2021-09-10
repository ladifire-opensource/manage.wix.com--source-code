import { ModuleRegistry } from 'react-module-container';
import { ActiveDashboardLayoutItem } from '../../types';

export enum ActiveDashboardWidgetListenerTypes {
  ADD_WIDGET = 'businessDashboard.addWidget',
  REMOVE_WIDGET = 'businessDashboard.removeWidget',
}

export interface WidgetNotificationPayload extends ActiveDashboardLayoutItem {
  onDone(): void;
  onError(): void;
}

export interface ListenToWidgetNotificationPayload {
  callback: (params: WidgetNotificationPayload) => void;
}

export const sendAddWidgetNotification = (payload: WidgetNotificationPayload) => {
  ModuleRegistry.notifyListeners(ActiveDashboardWidgetListenerTypes.ADD_WIDGET, payload);
};

export const sendRemoveWidgetNotification = (payload: WidgetNotificationPayload) => {
  ModuleRegistry.notifyListeners(ActiveDashboardWidgetListenerTypes.REMOVE_WIDGET, payload);
};

export const listenToAddWidgetNotification = (payload: ListenToWidgetNotificationPayload) =>
  ModuleRegistry.addListener(ActiveDashboardWidgetListenerTypes.ADD_WIDGET, payload.callback);

export const listenToRemoveWidgetNotification = (payload: ListenToWidgetNotificationPayload) =>
  ModuleRegistry.addListener(ActiveDashboardWidgetListenerTypes.REMOVE_WIDGET, payload.callback);
