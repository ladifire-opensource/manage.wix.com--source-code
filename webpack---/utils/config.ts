const NODE_ENV = ((process && process.env.NODE_ENV) || '').toLowerCase();
export const isDevelopment = NODE_ENV === 'development';
export const isProduction = NODE_ENV === 'production';
export const sentryDsn = 'https://712e6de8e84640cca138a2f995e11e9a@sentry.wixpress.com/450';
export const dealerPremiumRealEstateId = 'bc2d4965-7e40-4147-8927-9e71d88da271';

export const appDefIds = {
  /** @type import("@wix/business-manager-api").appDefIds.cashier */
  cashier: '14bca956-e09f-f4d6-14d7-466cb3f09103',
  /** @type import("@wix/business-manager-api").appDefIds.wixPaymentsBalance */
  wixPaymentsBalance: '44616341-9ea2-4d3b-a091-a0e717a485c0',
};

export const PageComponentId = {
  /** @type import('@wix/business-manager-api').PageComponentId.WixPaymentsPayables */
  WixPaymentsPayables: 'wix-payments-payables',
  /** @type import('@wix/business-manager-api').PageComponentId.WixPaymentsPayouts */
  WixPaymentsPayouts: 'wix-payments-payouts',
  /** @type import('@wix/business-manager-api').PageComponentId.CashierPaymentsDashboard */
  CashierPaymentsDashboard: 'cashier-payments-dashboard',
};

export const ambassadorBaseUrls = {
  MerchantService: '/_api/merchant-service',
  WixpayPayout: '/_api/wixpay-payout',
  TransactionService: '/_api/transaction-service',
  PaymentSettingsWeb: '_api/payment-settings-web',
  WixMetaSiteManagerWebapp: '/_api/msm-server',
};

export const ENTRY_POINT = {
  AM: 'AM',
  BM: 'BM',
  BO: 'BO',
};
