import { WixQuotesWeb } from '@wix/ambassador-wix-quotes-web/http';
import {
  CommonSortOrder,
  QueryResponse,
} from '@wix/ambassador-wix-quotes-web/types';
import { MAX_NUMBER_INVOICES } from '../constants';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';

export const BASE_URL = '/_api/wix-quotes-web';
export const HTTP_CLIENT_CONFIG = { ignoredProtoHttpUrlPart: '/api' };

type FetchContactInvoicesOptions = {
  filter?: any;
};

export function fetchContactInvoices(
  options: FetchContactInvoicesOptions,
): Promise<QueryResponse> {
  const headers = {
    Authorization: getCurrentInstance(appDefIds.invoices),
  };

  const Service = WixQuotesWeb(BASE_URL, HTTP_CLIENT_CONFIG);
  return Service.InvoicesService()(headers).query({
    query: {
      paging: {
        limit: MAX_NUMBER_INVOICES,
        offset: 0,
      },
      fields: [],
      filter: options.filter,
      fieldsets: ['id', 'data'],
      sort: [{ fieldName: 'issueDate', order: CommonSortOrder.DESC }],
    },
  });
}

export const invoiceMostRecent = () => fetchContactInvoices({});

export const invoiceOoverdue = () =>
  fetchContactInvoices({
    filter: {
      status: {
        $eq: 'Overdue',
      },
    },
  });
