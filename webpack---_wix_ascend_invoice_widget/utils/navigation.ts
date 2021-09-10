import { navigateTo, PageComponentId } from '@wix/business-manager-api';
import { REFERRER } from '../constants';

const referrer = REFERRER;

export const navigate = navigateTo;

export const navigateToAddInvoice = () =>
  navigate({
    pageComponentId: PageComponentId.Invoices,
    contextData: {
      referrer,
      appState: 'create',
    },
  });

export const navigateToSeeAllInvoices = () =>
  navigate({
    pageComponentId: PageComponentId.Invoices,
    contextData: {
      referrer,
    },
  });

export const navigateToSeeAllOverdueInvoices = () =>
  navigate({
    pageComponentId: PageComponentId.Invoices,
    contextData: {
      referrer,
      appState: '?status=Overdue',
    },
  });

export const navigateToEditInvoice = (invoiceId: string) =>
  navigate({
    pageComponentId: PageComponentId.Invoices,
    contextData: {
      referrer,
      appState: `${invoiceId}/edit`,
    },
  });

export const navigateToSendInvoice = (invoiceId: string) =>
  navigate({
    pageComponentId: PageComponentId.Invoices,
    contextData: {
      referrer,
      appState: `?action=Send&action-target-id=${invoiceId}`,
    },
  });

export const navigateToShareInvoice = (invoiceId: string) =>
  navigate({
    pageComponentId: PageComponentId.Invoices,
    contextData: {
      referrer,
      appState: `?action=ShareLink&action-target-id=${invoiceId}`,
    },
  });

export const navigateToPaymentInvoice = (invoiceId: string) =>
  navigate({
    pageComponentId: PageComponentId.Invoices,
    contextData: {
      referrer,
      appState: `?action=AddPayment&action-target-id=${invoiceId}`,
    },
  });
