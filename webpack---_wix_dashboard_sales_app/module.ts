import { ModuleInitFn } from '@wix/yoshi-flow-bm';
import { registerWidget } from '@wix/business-dashboard-api';
import {
  DASHBOARD_PARTNERS_BM_COMPONENT,
  DASHBOARD_SALES_BM_COMPONENT,
  PARTNERS_WIDGET_ID,
  SALES_WIDGET_ID,
} from '@consts';

export const init: ModuleInitFn = () => {
  registerWidget({
    bmComponentName: DASHBOARD_SALES_BM_COMPONENT,
    widgetId: SALES_WIDGET_ID,
  });

  registerWidget({
    bmComponentName: DASHBOARD_PARTNERS_BM_COMPONENT,
    widgetId: PARTNERS_WIDGET_ID,
  });
};
