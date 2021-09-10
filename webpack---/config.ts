// import {appDefIds, ModuleId, PageComponentId} from '@wix/business-manager-api';
import {AmbassadorBaseUrls} from './services';

const {appDefIds, ModuleId, PageComponentId} = (() => {
  try {
    return require('@wix/business-manager-api');
  } catch (_) {
    return {};
  }
})();

const NODE_ENV = ((process && process.env.NODE_ENV) || '').toLowerCase();
export const isDevelopment = NODE_ENV === 'development';
export const isProduction = NODE_ENV === 'production';
export const bundleName = 'wix-payments-transactions-bm-client'; // should be in sync with app's entry-point name in package.json
export const moduleId = ModuleId?.WixPaymentsTransactions;
export const componentId = PageComponentId?.CashierPaymentsDashboard;
export const sentryDsn = 'https://00125e18ee554f78a6d60518328793c2@sentry.wixpress.com/540';
export const baseApiUrl = '/_api/wix-payments-server/';
export const dealerPremiumRealEstateId = 'bc2d4965-7e40-4147-8927-9e71d88da271';
export const appDefId = appDefIds?.wixPaymentsTransactions;
export const bmRoute = 'payments-dashboard';
export const ambassadorBaseUrls: AmbassadorBaseUrls = {
  PaymentDashboardWeb: '/_api/payment-dashboard-web',
  DealerOffersServingService: '/_api/dealer-offers-serving-service/',
  DealerOfferEventsService: '/_api/dealer-offer-events-service/',
  PaymentMetadataWeb: '/_api/payment-metadata-web',
  PaymentServicesWeb: '/_api/payment-services-web',
  PaymentSettingsWeb: '/payment-settings-web',
};

// {ignoredProtoHttpUrlPart: '/api'} is mandatory for now, see
// https://github.com/wix-private/ambassador/blob/master/README.md#proto-http-mapping-conflict-with-frying-pan-mapping
// https://wix.slack.com/archives/CBDTV7F5L/p1591963338414600
export const ambassadorMappingFix = {ignoredProtoHttpUrlPart: '/api'};

export const BmUserConstants = {
  roles: {
    owner: 'owner',
    coOwner: 'accountCoOwner',
  },

  permissions: {
    cashier: {
      manage: 'cashier.manage',
      read: 'cashier.read',
      readPayments: 'cashier.read-payments',
    },
  },
};
