import { InvoiceStatus } from '@wix/ambassador-wix-quotes-web/types';

export const MAX_NUMBER_INVOICES = 3;

export const REFERRER = 'invoice_widget_BM';

export const OVERDUE_STATUS = [
  InvoiceStatus.Overdue,
  InvoiceStatus.PartialAndOverdue,
];
