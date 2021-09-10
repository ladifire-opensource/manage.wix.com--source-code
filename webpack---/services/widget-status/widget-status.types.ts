export interface WidgetStatusService {
  setWidgetStatus(widgetId: string, status: WidgetStatus): void;
  getWidgetStatus(widgetId: string): WidgetStatus;
  widgetLoaded(widgetId: string): Promise<void>;
  widgetLoading(widgetId: string): Promise<void>;
  widgetLoadingError(widgetId: string): Promise<void>;
  widgetNotPermitted(widgetId: string): Promise<void>;
}

export enum WidgetStatus {
  UNKNOWN,
  LOADING,
  LOADED,
  LOADING_ERROR,
  NOT_PERMITTED,
}
