import {joinPath} from '@wix/wix-axios-config/dist/src/url-utils';

// example URLs returned by UrlBuiler:
// * What the SERVER listens to:
//     getSubscriptionsData -> /api/v1/subscriptions
// * Where the CLIENT sends to:
//     getSubscriptionsData -> /_api/premium-manage-subscriptions/v1/subscriptions

export const UrlBuiler = () => ({
  api: (apiBaseUrl: string) => {
    const url = (relativeUrl: string) =>
      joinPath(apiBaseUrl, '/v1', relativeUrl);

    return {
      getSubscriptionsData: url('/subscriptions'),
      assignPlanToSite: url('/assignPlanToSite'),
      unassignPlanFromSite: url('/unassignPlanFromSite'),
      hasManualPaymentMethod: url('/hasManualPaymentMethod'),
      recollectAndFetchSubscriptions: url('/recollectedSubscriptions'),
      getNextPayment: url('/nextPayment'),
      fetchAngularExperiments: url('/fetchAngularExperiments'),
      turnAutoRenewOn: url('/turnAutoRenewOn'),
      cancelChangeCycle: url('/cancelPendingBillingCycleChange'),
      dynamicOfferingTurnAutoRenewOn: (subscriptionId: string) =>
        url(`/subscriptions/${subscriptionId}/turnAutoRenewOn`),
      recollectUserData: url('/recollectUserData'),
      getSubscriptionsCsv: url('/getSubscriptionsCsv'),
      getActiveGoogleMailboxCount: url('/getActiveGoogleMailboxCount'),
      requestPlanPackageFeatures: url('/getPackageFeatures'),
      getCurrencySettings: url('/currencySettings'),
      fetchInitialSiteLevelData: url('/fetchInitialSiteLevelData'),
      fetchInitialAccountLevelData: url('/fetchInitialAccountLevelData'),
      getInvoice: url('/invoice'),
      coronaExtendPlan: '/_serverless/premium-manage-corona-extension/extend',
      canCancel: '/_serverless/premium-manage-subscription-actions/can-cancel',
      canCancelPremiumAuthorization:
        '/_serverless/premium-authorization/can_cancel',
      recollectAssets: url('/recollect-assets')
    };
  },
  view: () => {
    return {
      root: '/',
      subscriptions: '/subscriptions',
      billingHistory: '/billing-history'
    };
  }
});
