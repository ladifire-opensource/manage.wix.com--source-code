import { ModuleInitFn } from '@wix/yoshi-flow-bm';
import { registerWidget } from '@wix/business-dashboard-api';
import {
  CELEBRATIONS_REAL_ESTATE_ID,
  DASHBOARD_BM_COMPONENT,
  WIDGET_ID,
} from '@consts';

export const init: ModuleInitFn = () => {
  registerWidget({
    bmComponentName: DASHBOARD_BM_COMPONENT,
    widgetId: WIDGET_ID,
    prefetchRealEstateIds: [CELEBRATIONS_REAL_ESTATE_ID],
  });
};
