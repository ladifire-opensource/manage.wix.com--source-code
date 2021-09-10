import { ResolveFn } from '@wix/yoshi-flow-bm';
import { InvoiceDataElement } from '../internal-types';
import { invoiceMostRecent, invoiceOoverdue } from '../services/invoices';
import { invoicesDTO, joinUniqueInvoicesLists } from '../services/invoicesDTO';

export interface ResolvedProps {}

export const resolve: ResolveFn<ResolvedProps> = async ({
  moduleParams,
  fedopsLogger,
}) => {
  fedopsLogger.appLoadStarted();
  const locale = moduleParams.accountLanguage;
  let success: boolean = false;
  let totalNumberOfInvoices: number = 0;
  let totalNumberOfOverdue: number = 0;
  const serverMostRecentData = invoiceMostRecent();
  const serverOverdueData = invoiceOoverdue();

  const invoicesMostRecentData =
    invoicesDTO(await serverMostRecentData, locale) ?? [];
  const invoicesOverdueData =
    invoicesDTO(await serverOverdueData, locale) ?? [];

  const invoicesData: InvoiceDataElement[] = joinUniqueInvoicesLists(
    invoicesMostRecentData,
    invoicesOverdueData,
  );

  totalNumberOfInvoices = (await serverMostRecentData).totalResults ?? 0;
  totalNumberOfOverdue = (await serverOverdueData).totalResults ?? 0;

  success = true;

  return {
    invoicesData,
    success,
    totalNumberOfInvoices,
    totalNumberOfOverdue,
  };
};
