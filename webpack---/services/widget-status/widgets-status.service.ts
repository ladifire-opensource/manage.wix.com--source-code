import { ServiceFactory } from '@services/types';
import { WidgetStatus, WidgetStatusService } from './widget-status.types';

export interface StatusIndicatior {
  status: WidgetStatus;
  statusAwaiters: Record<WidgetStatus, StatusAwaiter>;
}

export interface StatusAwaiter {
  promise: Promise<void>;
  notify: () => void;
}

export const widgetStatus: ServiceFactory<WidgetStatusService> = () => {
  const indicators: { [widgetId: string]: StatusIndicatior } = {};

  const initIndicator = (widgetId: string) =>
    (indicators[widgetId] = {
      status: WidgetStatus.UNKNOWN,
      statusAwaiters: createStatusIndicators(),
    });

  const getIndicator = (widgetId: string) => indicators[widgetId] ?? initIndicator(widgetId);

  const waitForStatus = async (widgetId: string, status: WidgetStatus) =>
    getIndicator(widgetId).statusAwaiters[status].promise;

  return {
    setWidgetStatus: (widgetId: string, status: WidgetStatus) => {
      const indicator = getIndicator(widgetId);
      if (indicator.status !== status) {
        indicator.statusAwaiters[status].notify();
      }
      indicator.status = status;
    },
    getWidgetStatus: (widgetId: string) => getIndicator(widgetId).status,
    widgetLoaded: (widgetId: string) => waitForStatus(widgetId, WidgetStatus.LOADED),
    widgetLoading: (widgetId: string) => waitForStatus(widgetId, WidgetStatus.LOADING),
    widgetLoadingError: (widgetId: string) => waitForStatus(widgetId, WidgetStatus.LOADING_ERROR),
    widgetNotPermitted: (widgetId: string) => waitForStatus(widgetId, WidgetStatus.NOT_PERMITTED),
  };
};

const createStatusIndicators = () =>
  Object.values(WidgetStatus).reduce((all, status) => {
    let notify;
    const promise = new Promise<void>(res => (notify = res));
    return {
      ...all,
      [status]: {
        promise,
        notify,
      },
    };
  }, {}) as Record<WidgetStatus, StatusAwaiter>;
