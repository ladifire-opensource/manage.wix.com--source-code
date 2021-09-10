import { ModuleInitFn } from '@wix/yoshi-flow-bm';
import { registerWidget } from '@wix/business-dashboard-api';
import {
  DASHBOARD_TOP_WIDGET_COMPONENT_ID,
  BUSINESS_MANAGER_TOP_WIDGET_COMPONENT_ID,
  DASHBOARD_SECTION_WIDGET_COMPONENT_ID,
  BUSINESS_MANAGER_SECTION_WIDGET_COMPONENT_ID,
} from './common/constants';

export const init: ModuleInitFn = () => {
  registerWidget({
    widgetId: DASHBOARD_SECTION_WIDGET_COMPONENT_ID,
    bmComponentName: BUSINESS_MANAGER_SECTION_WIDGET_COMPONENT_ID,
  });
  registerWidget({
    widgetId: DASHBOARD_TOP_WIDGET_COMPONENT_ID,
    bmComponentName: BUSINESS_MANAGER_TOP_WIDGET_COMPONENT_ID,
  });
};
