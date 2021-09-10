import { ModuleRegistry } from 'react-module-container';
import { BusinessManagerModule, getModule, ModuleId } from '@wix/business-manager-api';
import { WidgetRegistry } from './widget-registry';
import { WIDGET_REGISTRY_PROP } from '@consts';
import { omitBy, mapValues } from 'lodash';
import { WidgetComponentClass } from '@types';
import React from 'react';

export type ComponentsMap = Record<
  string,
  {
    componentName: string;
    Component: WidgetComponentClass;
  }
>;

export const getWidgetRegistryFromModule = (module: BusinessManagerModule) => {
  const untypedModule: any = module;
  return (untypedModule[WIDGET_REGISTRY_PROP] as WidgetRegistry) || null;
};

export const ensureWidgetRegistryOnModule = (module: BusinessManagerModule): void => {
  const untypedModule: any = module;
  if (!untypedModule[WIDGET_REGISTRY_PROP]) {
    untypedModule[WIDGET_REGISTRY_PROP] = new WidgetRegistry();
  }
};

export const getValidComponentsFromModule = (): ComponentsMap => {
  const widgetRegistry = getWidgetRegistryFromModule(getModule(ModuleId.Home));
  const components = widgetRegistry?.getAllWidgets() || {};
  const reactComponents = mapValues(components, bmComponentName => ({
    componentName: bmComponentName,
    Component: ModuleRegistry.component(bmComponentName),
  }));
  return omitBy(reactComponents, component => !component.Component);
};
