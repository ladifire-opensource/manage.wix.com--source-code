import { WIDGET_REGISTRY_PROP } from '@consts';
import { WidgetRegistry } from '@services/widget-registry';
import { HostConfig } from '@types';
import { WidgetOptions } from '@wix/business-dashboard-common';
import { setupExtensionComponent } from '@wix/business-manager-api';
import { MethodFn } from 'yoshi-flow-bm-runtime';

type MethodParams = Parameters<MethodFn>;
type RegisterFunction = (params: MethodParams[0], args: WidgetOptions) => ReturnType<MethodFn>;

const registerWidget: RegisterFunction = (
  { module },
  { bmComponentName, widgetId, prefetchRealEstateIds },
) => {
  if (!module[WIDGET_REGISTRY_PROP]) {
    module[WIDGET_REGISTRY_PROP] = new WidgetRegistry();
    module.extensionsCache = {};
  }

  const widgetRegistry: WidgetRegistry = module[WIDGET_REGISTRY_PROP];

  widgetRegistry.registerWidget(bmComponentName, widgetId);

  setupExtensionComponent<HostConfig>(widgetId, {
    componentOptions: {
      prefetchRealEstateIds,
    },
    loaderComponent: {
      componentName: 'DashboardSkeletonLoader',
      componentProps: { height: `120px` },
    },
  });
};

export default registerWidget;
