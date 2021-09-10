import * as Sentry from '@sentry/browser';
import * as BmIntegration from '@wix/business-manager-api';
import {getCurrentInstance, TModuleParams} from '@wix/business-manager-api';
import {
  ambassadorBaseUrls,
  ambassadorMappingFix,
  appDefId,
  baseApiUrl,
  bmRoute,
  dealerPremiumRealEstateId,
  isDevelopment,
  isProduction,
  sentryDsn,
} from './config';
import * as API_PAYMENTS from '@wix/wix-payments-server/dist/src/exports/API/payments';
import {SupportedCountries} from '@wix/wix-payments-server/dist/src/constants/countries';
import axios from 'axios';
import {InitializationData, PaymentMethodMeta, PaymentProviderMeta} from './services';

import {PaymentMethodStatus} from '@wix/cashier-common/dist/src/enums/payments/PaymentMethodStatus';
import {PaymentMethod} from '@wix/cashier-common/dist/src/enums/payments/PaymentMethod';
import {TPageComponentProps} from './types';
import {PaymentDashboardWeb} from '@wix/ambassador-payment-dashboard-web/http';
import {DealerOffersServingService} from '@wix/ambassador-dealer-offers-serving-service/http';
import {PaymentMetadataWeb} from '@wix/ambassador-payment-metadata-web/http';
import {PaymentServicesWeb} from '@wix/ambassador-payment-services-web/http';
import {PaymentSettingsWeb} from '@wix/ambassador-payment-settings-web/http';
import {Experiment} from './constants/experiments';

const nonEssentialPaymentMethods: string[] = [PaymentMethod.Cash, PaymentMethod.InPerson];

const isArtifactEvent = (event: Sentry.SentryEvent) => {
  try {
    const {frames} = event.exception.values[0].stacktrace;

    return Boolean(frames.find(({filename}) => filename.includes('bm-client')));
  } catch (error) {
    return false;
  }
};

export const initSentryHub = (moduleParams: TModuleParams) => {
  const sentryClient = new Sentry.BrowserClient({
    dsn: sentryDsn,
    beforeSend: (event) => {
      if (isDevelopment) {
        console.error('SentryEvent', event);
      } else if (isProduction && isArtifactEvent(event)) {
        return event;
      }

      return null;
    },
  });

  const hub = new Sentry.Hub(sentryClient);

  hub.configureScope((scope) => {
    scope.setUser({id: moduleParams.userId});
    scope.setExtra('msid', moduleParams.metaSiteId);
    scope.setTag('viewMode', moduleParams.viewMode);
    scope.setTag('locale', moduleParams.locale);
  });

  return hub;
};

export const getInitialDataFromServer = async (props: TModuleParams) => {
  const params: API_PAYMENTS.PaymentsV3GetInitialDataHttpRequest = {
    locale: props.locale,
    siteId: props.metaSiteId,
  };
  const {data} = await axios.get<API_PAYMENTS.PaymentsV3GetInitialDataHttpResponse>(
    // TODO remove country from URLs
    baseApiUrl + 'us/' + API_PAYMENTS.Endpoints.getInitialData,
    {params},
  );

  return data;
};

const getHeaders = () => ({
  Authorization: getCurrentInstance(appDefId),
});

const getDealerShouldUpgradeToPremium = async () => {
  try {
    const {offers} = await DealerOffersServingService(
      ambassadorBaseUrls.DealerOffersServingService,
      ambassadorMappingFix,
    )
      .DealerOffersServing()(getHeaders())
      .listOffers({
        realEstateId: dealerPremiumRealEstateId,
      });

    return !offers
      .map((offer) => {
        try {
          return JSON.parse(offer.asset.payloadJson);
        } catch (e) {
          return {};
        }
      })
      .some(({value}) => value === 'false');
  } catch (e) {
    return false;
  }
};

const toMap = (acc: any, {id, title}: any) => ({...acc, [id]: {id, name: title}});
const getCashierMetadata = async (
  {locale}: TModuleParams,
  country: string,
): Promise<{
  methods: Record<string, PaymentMethodMeta>;
  providers: Record<string, PaymentProviderMeta>;
}> => {
  const {methods, providers} = await PaymentMetadataWeb(ambassadorBaseUrls.PaymentMetadataWeb, ambassadorMappingFix)
    .PlatformMetadataService()(getHeaders())
    .getProvidersDataByCountry({
      locale,
      country: country.toUpperCase(),
    });

  return {
    methods: methods.reduce(toMap, {}),
    providers: providers.reduce(toMap, {}),
  };
};

const getApplicationNames = async (): Promise<InitializationData['applications']> => {
  try {
    const {metadatas} = await PaymentDashboardWeb(ambassadorBaseUrls.PaymentDashboardWeb)
      .PaymentDashboardService()(getHeaders())
      .getApplicationsMetadata({});

    return metadatas.reduce(
      (acc, {applicationId, applicationName}) => ({
        ...acc,
        [applicationId]: {
          id: applicationId,
          name: applicationName,
        },
      }),
      {},
    ) as InitializationData['applications'];
  } catch (e) {
    return {};
  }
};

const getCashierMerchantInfo = async () => {
  const {info} = await PaymentSettingsWeb(ambassadorBaseUrls.PaymentSettingsWeb, ambassadorMappingFix)
    .MerchantInfoService()(getHeaders())
    .getMerchantInfo({});

  return info;
};

const getCashierPaymentMethods = async () => {
  const {methods} = await PaymentServicesWeb(ambassadorBaseUrls.PaymentServicesWeb, ambassadorMappingFix)
    .PaymentMethodsService()(getHeaders())
    .list({});

  return methods;
};

export const getInitialData = async (
  props: TPageComponentProps,
): Promise<Omit<InitializationData, keyof TModuleParams | 'paymentStoreBackend'>> => {
  const [
    serverData,
    dealerShouldUpgradeToPremium,
    {country: countryIso3, hasBusinessPremium},
    methodsList,
    applications,
  ] = await Promise.all([
    getInitialDataFromServer(props),
    getDealerShouldUpgradeToPremium(),
    getCashierMerchantInfo(),
    getCashierPaymentMethods(),
    getApplicationNames(),
  ]);

  const {countriesData} = serverData;
  const foundCountry = countriesData.find(({iso3}) => countryIso3.toUpperCase() === iso3.toUpperCase());
  const country = foundCountry ? foundCountry.iso2.toLowerCase() : 'us';
  const isWpCountry = !!Object.values(SupportedCountries).includes((foundCountry as unknown) as SupportedCountries);

  const connectedMethods = methodsList.filter(
    (method) => !nonEssentialPaymentMethods.includes(method.id) && method.status === PaymentMethodStatus.CONNECTED,
  );

  const {methods, providers} = await getCashierMetadata(props, country);

  const shouldUpgradeToPremium =
    serverData.experiments[Experiment.UseMerchantServiceForPremium] &&
    serverData.experiments[Experiment.UseMerchantServiceForPremium].toLowerCase() === 'true'
      ? !hasBusinessPremium
      : dealerShouldUpgradeToPremium;

  return {
    ...serverData,
    baseApiUrl,
    country,
    connectedMethods,
    shouldUpgradeToPremium,
    isWpCountry,
    methods,
    providers,
    internalBaseRoute: `${props.metaSiteId}/${bmRoute}/`,
    baseRoute: props.routeBaseName,
    ambassadorBaseUrls,
    applications,
    bmIntegration: BmIntegration,
  };
};
