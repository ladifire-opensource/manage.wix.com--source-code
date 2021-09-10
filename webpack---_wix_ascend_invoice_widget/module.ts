import { registerWidget } from '@wix/business-dashboard-api';

export const init = () => {
  registerWidget({
    widgetId: 'ASCEND_INVOICE_WIDGET-AscendInvoiceWidget',
    bmComponentName: 'ascend-invoice-widget',
  });
};
