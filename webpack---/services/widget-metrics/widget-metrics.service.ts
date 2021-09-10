import { ServiceFactory } from '@services/types';
import { Metrics, WidgetMetricsService } from './widget-metrics.types';

export const widgetMetrics: ServiceFactory<WidgetMetricsService> = services => {
  const metrics: Record<string, Promise<Metrics>> = {};
  let pageLoadedTimestamp: number;

  const measureMetrics = async (widgetId: string): Promise<Metrics> => {
    const {
      widgetStatus: { widgetLoaded, widgetLoading },
      timestamp,
    } = services;

    const [startedLoadingTimestamp, loadedTimestamp] = await Promise.all([
      widgetLoading(widgetId).then(() => timestamp.now()),
      widgetLoaded(widgetId).then(() => timestamp.now()),
    ]);

    return {
      widgetStartedLoadingToLoaded: loadedTimestamp - startedLoadingTimestamp,
      pageLoadedToWidgetLoaded: loadedTimestamp - pageLoadedTimestamp,
    };
  };

  return {
    startMeasuring: () => {
      const { widgetConfiguration, timestamp } = services;

      pageLoadedTimestamp = timestamp.now();

      widgetConfiguration.getAllRegisteredWidgets().forEach(({ widgetId }) => {
        metrics[widgetId] = measureMetrics(widgetId);
      });
    },

    getMetrics: (widgetId: string) => {
      return metrics[widgetId];
    },
  };
};
