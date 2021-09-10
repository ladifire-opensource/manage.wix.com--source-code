// NB: all new experiments should be added with the following scopes:
// business-manager, wix-payments
// Email: payments-by-wix@wix.com
export enum Experiment {
  FastSupportAccessPhase1 = 'specs.payments.FastSupportAccessPhase1',
  UseOverview3MonthsOption = 'specs.payments.WPPV3UseOverview3MonthsOption',
  UseFiltersV2Search = 'specs.payments.WPPV3UseFiltersV2Search',
  CommBarEnabled = 'specs.payments.WPPV3CommBarEnabled',
  LowerDisputeMinImageSize = 'specs.payments.LowerDisputeMinImageSize',
  ArnInPaymentDetails = 'specs.payments.WPPV3ArnInPaymentDetails',
  BrChargebacks = 'specs.payments.WPPV3BrChargebacks',
  MultipleProviderFacelift = 'specs.payments.EnableMultipleProviderUplift',
  NewEmptyStateImages = 'specs.payments.WPPV3NewEmptyStateImages', // Delete NoTransactions & NoTransactionsNoPremium icons when merging
  ExplicitUuidInBi = 'specs.payments.WPPV3ExplicitUuidInBi',
  PosDealerBanner = 'specs.payments.WPPV3PosDealerBanner',
  CaseBuilderPhase1 = 'specs.payments.WPPV3CaseBuilderPhase1',
  CaseBuilderPhase2 = 'specs.payments.WPPV3CaseBuilderPhase2',

  UseMerchantServiceForPremium = 'specs.payments.WPPV3UseMerchantServiceForPremium',
  NewHeaderAndBreadcrumbs = 'specs.payments.WPPV3NewHeaderAndBreadcrumbs',
}
