import { registerWidget } from '@wix/business-dashboard-api';

export const init = () => {
  registerWidget({
    widgetId: 'ASCEND_TASKS_WIDGET-TasksWidget',
    bmComponentName: 'ascend-tasks-widget',
  });
};
