import Experiments from '@wix/wix-experiments';
import { MerchantV2PaymentMethod } from '../types/api/merchant-v2';
import {
  authorizationHeaderKey,
  merchantInfoEndpoint,
  paymentMethodsEndpoint,
  paymentProviderAccountEndpoint,
  providersListEndpoint,
} from '../utils/api-constants';
import { ExperimentsBag } from './bm-config';
import { doFetchMetadata } from '../utils/metadata-fetcher';
import { MetadataMap } from '../data/modules/metaData.module';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import { Experiment } from '../enums/Experiment';
import { OnboardingV1MerchantInfo, OnboardingV1PaymentProviderInstance } from '../types/api/onboarding-v1';
import { formatString } from '../utils/format';
import { withRetries } from '../utils/common';

// Experiments
export const fetchExperiments = () => {
  const experiments = new Experiments({ scope: 'cashier' });
  return experiments.ready().then(() => experiments.all());
};

export const getActiveExperiments = (experiments: ExperimentsBag): Experiment[] => {
  const activeExperiments = [];

  for (const experimentName of Object.keys(experiments)) {
    const experimentValue = experiments[experimentName];

    if (experimentValue === 'true') {
      activeExperiments.push(experimentName);
    }
  }

  // Hack for biz mgr
  // This is a dummy spec (no real spec/FT/Experiment was created)
  // This dummy Active experiment will be passed to the metadata
  // And in the metadata there will be special configuration for this spec
  activeExperiments.push('specs.cashier.RemoveFormCurrencyForBizMgr');

  return activeExperiments;
};

// Fetches from onboarding API
const fetchFromPayments = async url => {
  const signedInstance = getCurrentInstance(appDefIds.cashier);
  const response = await window.axios.get(url, {
    headers: {
      [authorizationHeaderKey]: signedInstance,
    },
  });
  return response.data;
};

export const fetchPaymentMethods = (): Promise<MerchantV2PaymentMethod[]> =>
  fetchFromPayments(paymentMethodsEndpoint).then(data => data.methods);

export const fetchPaymentProviders = (): Promise<OnboardingV1PaymentProviderInstance[]> =>
  fetchFromPayments(providersListEndpoint).then(data => data.providers);

export const fetchPaymentProviderAccount = (providerId): Promise<any> => {
  const url = formatString(paymentProviderAccountEndpoint, { id: providerId });
  return fetchFromPayments(url).then(data => JSON.parse(data?.account?.credentials));
};

export const fetchMerchantInfo = (): Promise<OnboardingV1MerchantInfo> =>
  withRetries(() => fetchFromPayments(merchantInfoEndpoint), 2).then(data => data.info);

export const fetchMetadata = ({ country, locale }): Promise<MetadataMap> =>
  withRetries(() => doFetchMetadata({ country, locale, axios: window.axios }), 2).then(response => response.data);

// Location query params
const parseQueryParams = <Params extends {}>(source: string): {} | Params => {
  const resultParams = {};

  if (source.length > 0) {
    const editedSource = source.slice(1);
    const arrOfParams = editedSource.split('&');

    arrOfParams.forEach((paramPair: string) => {
      const pair = paramPair.split('=');
      resultParams[pair[0]] = pair[1];
    });
  }

  return resultParams;
};

export interface ExpectedQueryParams {
  referralInfo?: string;
  viewMode?: string;
}

export const queryParams = parseQueryParams<ExpectedQueryParams>(location.search);
