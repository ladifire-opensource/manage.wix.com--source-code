import {TModuleParams, PageComponentId, ModuleId} from '@wix/business-manager-api';

// Common
export const baseApiUrl = '/_api/wix-payments-server/';

export const moduleId = ModuleId.WixPaymentsBalance;

// Payouts config
export const bmPayoutsComponentId = PageComponentId.WixPaymentsPayouts;
export const bmPayoutsRoute = 'payouts-dashboard';
export const bmPayoutBundleName = 'wix-payments-payout-bm-client'; // should be in sync with app's entry-point name in package.json

// Payables config
export const bmPayablesComponentId = PageComponentId.WixPaymentsPayables;
export const bmPayablesRoute = 'settlement-report';
export const bmPayablesBundleName = 'wix-payments-payables-bm-client'; // should be in sync with app's entry-point name in package.json

export const wixPaymentsTitleBmSidebarItem = {
  id: 'wix-payments-title',
  label: 'menu.financialTools.wixPayments',
  visibleInSiteless: true,
};

export const balancePayoutsBmSidebarItem = {
  id: 'wix-payments-payouts',
  label: 'menu.financialTools.payouts',
  biName: 'WixPaymentsPayouts',
  navigateToConfig: {
    pageComponentId: bmPayoutsComponentId,
  },
  visibleInSiteless: true,
};

export const balancePayablesBmSidebarItem = {
  id: 'wix-payments-payables',
  label: 'menu.financialTools.payables',
  biName: 'WixPaymentsPayables',
  navigateToConfig: {
    pageComponentId: bmPayablesComponentId,
  },
  visibleInSiteless: true,
};

export const BmUserRoles = {
  owner: 'owner',
};

// This type is what's passed to BM page components
// Copy-pasted from
// https://github.com/wix-private/business-manager/blob/master/business-manager-web/src/client/modules/buildMapStateToPageComponentProps/buildMapStateToPageComponentProps.ts#L5
export type TPageComponentProps = TModuleParams & {routeBaseName: string};
