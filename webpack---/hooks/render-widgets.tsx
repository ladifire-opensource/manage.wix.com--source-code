import { Widget } from '@components/widget';
import { Widget as NewWidget } from '@components/dashboard-widget';
import { getValidComponentsFromModule } from '@services/widget-registry';
import { DraggableWidgetMap } from '@types';
import React, { useCallback, useMemo } from 'react';
import { useExtensions } from './extensions';
import { useServices } from './services';
import { DASHBOARD_HOST_ID } from '@consts';
import { Extension, getModule, ModuleId } from '@wix/business-manager-api';
import { useExperiments } from 'yoshi-flow-bm-runtime';
import { DASHBOARD_HOSTING_API } from '../experiments';

export const useRenderWidgets = () => {
  const widgetsRecord: Record<string, DraggableWidgetMap> =
    (getModule(ModuleId.Home) as any).widgetsRecord ||
    ((getModule(ModuleId.Home) as any).widgetsRecord = {});

  const { experiments } = useExperiments();
  const hostingApi = experiments.enabled(DASHBOARD_HOSTING_API);

  const extensions = useExtensions(DASHBOARD_HOST_ID, hostingApi);

  const widgetsMap = useMemo(getValidComponentsFromModule, []);

  const extensionComponentsMap = useMemo(
    () =>
      extensions.reduce((allExtensions, extension) => {
        allExtensions[extension.componentId] = extension;
        return allExtensions;
      }, {} as Record<string, Extension<any>>),
    [extensions],
  );

  const { widgetsDefinitions } = useServices();

  return useCallback(
    (widgetIds: string[]): DraggableWidgetMap[] =>
      widgetIds
        .map(widgetId => {
          const config = widgetsDefinitions.getById(widgetId);
          return [
            config,
            hostingApi
              ? { ...extensionComponentsMap[config.widgetId], componentName: '' }
              : widgetsMap[config.widgetId],
          ] as const;
        })
        .filter(([_, component]) => component && !!component.Component)
        .map(([config, { componentName, Component }]) => {
          if (!widgetsRecord[config.widgetId]) {
            widgetsRecord[config.widgetId] = {
              widgetId: config.widgetId,
              component: hostingApi ? (
                <NewWidget key={config.widgetId} config={config} Component={Component as any} />
              ) : (
                <Widget
                  key={config.widgetId}
                  Component={Component as any}
                  config={config}
                  bmComponentName={componentName}
                />
              ),
            };
          }
          return widgetsRecord[config.widgetId];
        }),
    [widgetsMap, extensionComponentsMap, widgetsDefinitions, hostingApi],
  );
};
