import type { ModuleInitFn } from '@wix/yoshi-flow-bm';
import { registerWidget } from '@wix/business-dashboard-api';

export const init: ModuleInitFn = () => {
  registerWidget({
    widgetId: 'dashboard-smart-header',
    bmComponentName: 'dashboard-smart-header',
  });
};
