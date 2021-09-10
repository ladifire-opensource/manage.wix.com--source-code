import * as API_COMMON from '@wix/wix-payments-server/dist/src/exports/API/common';
import { isTest } from '../config/statics';

export const cashierInstanceRequestHeaderKey = 'Cashier-Instance-Id';
export const authorizationHeaderKey = 'Authorization';
export const defaultSettingsEndpoint = '/_api/payment-services-web/merchant/dynamicsettings';
export const merchantInfoEndpoint = '/payment-settings-web/onboarding/v1/merchant-info';
export const merchantInfoCbdFlowUpdateEndpoint = '/payment-settings-web/onboarding/v1/merchant-info/custom-flows/cbd';
export const merchantInfoRestrictedGoodsUpdateEndpoint = '/payment-settings-web/onboarding/v1/merchant-info/custom-flows/restricted-goods';
export const merchantInfoApprovedServicesUpdateEndpoint = '/payment-settings-web/onboarding/v1/merchant-info/custom-flows/partner';
export const providersListEndpoint = '/payment-settings-web/onboarding/v1/payment-providers';
export const providerFeeEndpoint = '/payment-settings-web/onboarding/v1/payment-providers/{{providerId}}/fee';
export const merchantInfoConfirmCountryEndpoint = '/payment-settings-web/onboarding/v1/info/confirm-country';
export const merchantInfoUpdateCountryEndpoint = '/payment-settings-web/onboarding/v1/merchant-info/country';
export const merchantMethodsEndpoint = '/_api/payment-services-web/merchant/methods';
export const providerActionCompleteEndpoint = '/cashier-settings-server/payment-provider-action-complete';
export const providersMetadataEndpoint = '/_api/payment-metadata-web/plugins/data?country={{country}}&locale={{locale}}'; // eslint-disable-line max-len
export const countriesTranslationsEndpoint = '/_api/cashier-metadata/v2/locales/countries?locale={{locale}}';
export const profileDataEndpoint = '/_api/wix-bi-profile-webapp/v2/user/{{userGuid}}?{{fieldsForCheck}}';
const wixPaymentsServerPrefix = '/_api/wix-payments-server';
export const merchantServiceBaseUrl = isTest
  ? 'http://local.com/_api/merchant-service'
  : '/_api/merchant-service';
export const wpActivationStatusEndpoint = `${wixPaymentsServerPrefix}/{{country}}/${API_COMMON.Endpoints.Account.GetActivationStatus}`;
export const wpPayoutsSettingsEndpoint = `${wixPaymentsServerPrefix}/{{country}}/${API_COMMON.Endpoints.Account.GetPayoutSettings}/{{profileId}}`;
export const wpAccountProfileDetailsEndpoint = `${wixPaymentsServerPrefix}/{{country}}/${API_COMMON.Endpoints.Account.GetAccountProfileDetails}/{{profileId}}`;
export const wpUpdateSoftDescriptorEndpoint = `${wixPaymentsServerPrefix}/{{country}}/${API_COMMON.Endpoints.Account.UpdateSoftDescriptor}/{{profileId}}`;
export const wpUpdatePayoutsSettingsEndpoint = `${wixPaymentsServerPrefix}/{{country}}/${API_COMMON.Endpoints.Account.UpdatePayoutSettings}/{{profileId}}`;
export const wpAccountsEndpoint = `${wixPaymentsServerPrefix}/{{country}}/${API_COMMON.Endpoints.Account.GetAccounts}`;
export const wpPayoutsListEndpoint = '/_api/wixpay-payout/v4/payouts';

export const listPaymentSettings = '/payment-settings-web/onboarding/v1/payment-settings';
export const paymentMethodsEndpoint = '/payment-settings-web/onboarding/v1/payment-methods';
export const paymentMethodEnableEndpoint = '/payment-settings-web/onboarding/v1/payment-methods/{{id}}/enable';
export const paymentMethodDisableEndpoint = '/payment-settings-web/onboarding/v1/payment-methods/{{id}}/disable';
export const paymentProvidersEndpoint = '/payment-settings-web/onboarding/v1/payment-providers';
export const paymentProviderEndpoint = '/payment-settings-web/onboarding/v1/payment-providers/{{id}}';
export const paymentProviderConnectEndpoint = '/payment-settings-web/onboarding/v1/payment-providers/{{id}}/connect';
export const paymentProviderAccountEndpoint = '/payment-settings-web/onboarding/v1/payment-providers/{{id}}/account';
export const paymentProviderUpdateInstallmentsEndpoint =
  '/payment-settings-web/onboarding/v1/payment-providers/{{id}}/update-installments';
export const squareLocationEndpoint = '/_api/payment-services-web/merchant/square/connect/locations';

export const transactionsListEndpoint = '/_api/payment-services-web/merchant/v2/transactions';

export const dealerBaseUrl = isTest
  ? 'http://local.com/_api/dealer-offers-serving-service/'
  : '/_api/dealer-offers-serving-service/';

export const dealerEventsBaseUrl = isTest
  ? 'http://local.com/_api/dealer-offer-events-service/'
  : '/_api/dealer-offer-events-service/';

export const metaSiteBaseUrl = isTest ? 'http://local.com/_api/msm-server/' : '/_api/msm-server/';

export const upgradeToPremiumUrl =
  '/store/plans?siteGuid={{metaSiteId}}&referralAdditionalInfo={{refferalInfo}}&businessTab=true';

export const editorUrl = '/editor/{{metaSiteId}}?referralInfo={{refferalInfo}}';
