import {
  InvoicesGetResponse,
  InvoiceStatus,
  QueryResponse,
} from '@wix/ambassador-wix-quotes-web/types';
import { OVERDUE_STATUS } from '../constants';
import { InvoiceDataElement } from '../internal-types';
import { formatDate, numToLocalizedCurrencyStr } from '../utils';

const calcualteDaysOverdue = (dueDate: string | undefined) => {
  const MILI_SEC_IN_DAY = 1000 * 60 * 60 * 24;
  const diffFromDue = new Date().getTime() - new Date(`${dueDate}`).getTime();
  return Math.ceil(diffFromDue / MILI_SEC_IN_DAY);
};

const invoiceDTO = (serverInvoice: InvoicesGetResponse, locale: string) => ({
  customerName: `${serverInvoice.data?.customer?.name}`,
  invoiceNumber: `#${serverInvoice.data?.number}`,
  price: numToLocalizedCurrencyStr({
    num: serverInvoice.data?.totals?.total?.serializedValue ?? 0,
    locale,
    currency: serverInvoice.data?.currencyCode ?? 'USD',
  }),
  dueDate: formatDate(`${serverInvoice.data?.dates?.dueDate}`, locale),
  numberOfDayOverdue: OVERDUE_STATUS.includes(serverInvoice.status!)
    ? calcualteDaysOverdue(serverInvoice.data?.dates?.dueDate)
    : 0,
  invoiceStatus: serverInvoice.status ?? InvoiceStatus.Void,
  lastViewedBy: undefined,
  invoiceId: `${serverInvoice.id?.id}`,
});

export const invoicesDTO = (serverInvoices: QueryResponse, locale: string) =>
  serverInvoices.results &&
  serverInvoices.results.map((invoiceData) => invoiceDTO(invoiceData, locale));

export const joinUniqueInvoicesLists = (
  array1: InvoiceDataElement[],
  array2: InvoiceDataElement[],
) => {
  const newInstance = array1.concat(array2);
  for (let i = 0; i < newInstance.length; ++i) {
    for (let j = i + 1; j < newInstance.length; ++j) {
      if (newInstance[i].invoiceNumber === newInstance[j].invoiceNumber) {
        newInstance.splice(j--, 1);
      }
    }
  }

  return newInstance;
};
