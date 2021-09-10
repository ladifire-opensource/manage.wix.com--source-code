import { registerWidget } from '@wix/business-dashboard-api';

export const init = () => {
  registerWidget({
    widgetId: 'ASCEND_CONTACTS_WIDGET-AscendContactsWidget',
    bmComponentName: 'ascend-contacts-widget',
  });
};
