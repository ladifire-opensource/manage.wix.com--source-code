import { BMLazyComponent } from './bm-lazy-component';
import { ModuleRegistry } from 'react-module-container';
import {
  appDefIds,
  BusinessManagerModule,
  INavigateToPageConfig,
  ModuleId,
  PageComponentId,
  registerModule,
  registerPageComponentMonitors,
  TModuleParams,
} from '@wix/business-manager-api';
import { WithSidebarConfig } from '@wix/business-manager-sidebar-data';
import {
  createModuleConfig,
  ExperimentsBag,
  HARDCODED_Hotels_ModuleId,
  ModuleConfig,
  OrderPageConfig,
  UnsupportedVerticalsConfig,
} from './bm-config';
import * as Sentry from '@sentry/browser';
import {
  fetchExperiments,
  fetchMerchantInfo,
  fetchMetadata,
  fetchPaymentMethods,
  fetchPaymentProviderAccount,
  fetchPaymentProviders,
  getActiveExperiments,
} from './utils';
import { MetadataMap } from '../data/modules/metaData.module';
import { initSentryHub } from '../utils/sentry-client';
import { AppDefId } from '../types/client/AppDefId';
import { Pathname } from '../enums/Pathname';
import { Experiment } from '../enums/Experiment';
import { MerchantV2PaymentMethod } from '../types/api/merchant-v2';
import { ProviderAccountStatus } from '../enums/ProviderAccountStatus';
import { OnboardingV1MerchantInfo, OnboardingV1PaymentProviderInstance } from '../types/api/onboarding-v1';
import { PaymentMethod } from '../enums/PaymentMethod';
import { PaymentProvider } from '../enums/PaymentProvider';
import { WixPaymentsProviders } from '../enums/WixPayments';
import './supported-languages-on-checkout';
import { ReferralInfo } from '../enums/ReferralInfo';

interface ConfigParams {
  initVerticalOrderPageNavigation?: {
    appDefId: AppDefId;
    buildNavigateToOrderConfig(verticalOrderId: string): INavigateToPageConfig;
  };

  markAsUnsupportedVertical?: {
    navigateToSettingsConfig: INavigateToPageConfig;
    fetchAppTitle(): Promise<string>;
  };
}

interface PromiseCache {
  promise: Promise<any>;
  lastRequestTimestamp: number;
}

const enum PromiseName {
  EXPERIMENTS = 'experiments',
  MODULE_CONFIG = 'moduleConfig',
  PAYMENT_METHODS = 'paymentMethods',
  PAYMENT_PROVIDERS = 'paymentProviders',
  MERCHANT_INFO = 'merchantInfo',
  METADATA = 'metadata',
}

const fallbackMetadata = {
  providers: {},
  methods: {},
};

const referralInfoRegex = /referralInfo=([^&]*)/;

const A_SECOND = 1000;
// We cache requests for some time to not call the same request several times during initialization
// Besided, Experiments and Module Config are not going to change during one session
const PromiseCacheTTL = {
  [PromiseName.EXPERIMENTS]: -1,
  [PromiseName.MODULE_CONFIG]: -1,
  [PromiseName.PAYMENT_METHODS]: 15 * A_SECOND,
  [PromiseName.MERCHANT_INFO]: 15 * A_SECOND,
  [PromiseName.METADATA]: 15 * A_SECOND,
  [PromiseName.PAYMENT_PROVIDERS]: 15 * A_SECOND,
};

export class BMModule extends BusinessManagerModule implements WithSidebarConfig {
  private readonly orderPageConfig: OrderPageConfig = {};
  private readonly unsupportedVerticalsConfig: UnsupportedVerticalsConfig = {};
  private readonly dataPromises: {
    [name: string]: PromiseCache;
  } = {};
  private moduleParams: TModuleParams;
  private sentryHub: Sentry.Hub;
  private readonly bmInitialReferralInfo: ReferralInfo;

  constructor(moduleId: ModuleId) {
    super(moduleId);
    const url_string = window.location.href;
    const url = new URL(url_string);
    this.bmInitialReferralInfo = url.searchParams.get('referralInfo') as ReferralInfo;

    ModuleRegistry.registerComponent(PageComponentId.Cashier, () => BMLazyComponent);
  }

  public async init(moduleParams: TModuleParams) {
    this.moduleParams = moduleParams;

    ModuleRegistry.registerMethod(
      'cashier.shouldAskForPayPalAdvancedOptions',
      () => this.shouldAskForPayPalAdvancedOptions,
    );

    ModuleRegistry.registerMethod('cashier.getActiveExperiments', () => this.getActiveExperiments);
    ModuleRegistry.registerMethod('cashier.getModuleConfig', () => this.getModuleConfig);
    ModuleRegistry.registerMethod('cashier.getSentryHub', () => this.getSentryHub);
    ModuleRegistry.registerMethod('cashier.getPaymentMethods', () => this.getPaymentMethods);
    ModuleRegistry.registerMethod('cashier.getPaymentProviders', () => this.getPaymentProviders);
    ModuleRegistry.registerMethod('cashier.getWixPaymentsCountry', () => this.getWixPaymentsCountry);
    ModuleRegistry.registerMethod('cashier.getWixPaymentsAccountId', () => this.getWixPaymentsAccountId);
    ModuleRegistry.registerMethod('cashier.getMerchantInfo', () => this.getMerchantInfo);
    ModuleRegistry.registerMethod('cashier.getMetadata', () => this.getMetadata);
    ModuleRegistry.registerMethod('cashier.getBMInitialReferralInfo', () => () => this.bmInitialReferralInfo);

    // Redirecting to new payment dashboard location if user has came to the old one
    if (location.pathname.includes(Pathname.AcceptPaymentsPaymentsDashboard)) {
      const matches = location.search.match(referralInfoRegex);
      const referralInfo = matches && matches[1] ? matches[1] : undefined;
      ModuleRegistry.invoke('businessManager.navigateTo', {
        pageComponentId: PageComponentId.CashierPaymentsDashboard,
        contextData: { referrer: referralInfo },
      });
    }

    // should be async, it's not necessary for module init
    await this.getActiveExperiments();

    this.sentryHub = initSentryHub(this.moduleParams);
    registerPageComponentMonitors(PageComponentId.Cashier, {
      sentryClient: this.sentryHub.getClient(),
    });
  }

  private readonly addPromiseCache = (promiseName: PromiseName, promise: Promise<any>) => {
    const lastRequestTimestamp = Date.now();
    this.dataPromises[promiseName] = {
      promise,
      lastRequestTimestamp,
    };
  };

  private readonly getPromiseFromCache = (promiseName: PromiseName): Promise<any> | null => {
    const cache = this.dataPromises[promiseName] as PromiseCache;
    const ttl = PromiseCacheTTL[promiseName] as number;
    const cacheIsValid = cache && (ttl === -1 || cache.lastRequestTimestamp + ttl > Date.now());
    return cacheIsValid ? this.dataPromises[promiseName].promise : null;
  };

  private readonly getPromiseFromCacheOrCreateNew = (
    promiseName: PromiseName,
    promiseCreator: () => Promise<any>,
  ): Promise<any> => {
    let promise = this.getPromiseFromCache(promiseName);
    if (!promise) {
      promise = promiseCreator();
      this.addPromiseCache(promiseName, promise);
    }
    return promise;
  };

  public getModuleConfig = async (): Promise<ModuleConfig> => {
    await this.getPromiseFromCacheOrCreateNew(PromiseName.MODULE_CONFIG, () => this.prepareModuleConfig());
    return createModuleConfig({
      cashierInstanceId: this.moduleParams.instanceId,
      orderPageConfig: this.orderPageConfig,
      unsupportedVerticalsConfig: this.unsupportedVerticalsConfig,
    });
  };

  private readonly fetchExperiments = (): Promise<ExperimentsBag> =>
    this.getPromiseFromCacheOrCreateNew(PromiseName.EXPERIMENTS, () => fetchExperiments());

  public getActiveExperiments = async (): Promise<Experiment[]> => {
    const experiments = await this.fetchExperiments();
    return getActiveExperiments(experiments);
  };

  private readonly getPaymentMethods = async (): Promise<MerchantV2PaymentMethod[]> =>
    this.getPromiseFromCacheOrCreateNew(PromiseName.PAYMENT_METHODS, () => fetchPaymentMethods());

  private readonly getPaymentProviders = async (): Promise<OnboardingV1PaymentProviderInstance[]> =>
    this.getPromiseFromCacheOrCreateNew(PromiseName.PAYMENT_PROVIDERS, () => fetchPaymentProviders());

  private readonly getWixPaymentsCountry = async (): Promise<string[2] | null> => {
    const providers = await this.getPaymentProviders();
    const wixPaymentsData = providers.find(provider => WixPaymentsProviders.includes(provider.id as PaymentProvider));
    if (!wixPaymentsData) {
      return null;
    }
    if (wixPaymentsData.id === PaymentProvider.WixPayBR) {
      return 'BR';
    }
    return wixPaymentsData.country;
  };

  private readonly getWixPaymentsAccountId = async (): Promise<string | null> => {
    const providers = await this.getPaymentProviders();
    const wixPaymentsData = providers.find(provider => WixPaymentsProviders.includes(provider.id as PaymentProvider));
    if (!wixPaymentsData) {
      return null;
    }
    try {
      const accountData = await fetchPaymentProviderAccount(wixPaymentsData.id);
      return accountData.accountId;
    } catch {
      console.error('cashier.getWixPaymentsAccountId: Error when fetch account data');
    }
  };

  private readonly getMerchantInfo = async (): Promise<OnboardingV1MerchantInfo> =>
    this.getPromiseFromCacheOrCreateNew(PromiseName.MERCHANT_INFO, () => fetchMerchantInfo().catch(() => ({})));

  private readonly getMetadata = async (): Promise<MetadataMap> =>
    this.getPromiseFromCacheOrCreateNew(PromiseName.METADATA, () =>
      Promise.all([this.getMerchantInfo()])
        .then(([info]) =>
          info.country
            ? fetchMetadata({
              locale: this.moduleParams.accountLanguage,
              country: info.country,
            })
            : fallbackMetadata,
        )
        .catch(() => fallbackMetadata),
    );

  public shouldAskForPayPalAdvancedOptions = async (): Promise<boolean> => {
    try {
      const methods = await this.getPaymentMethods();
      const payPalMethod = methods.find(method => method.id === PaymentMethod.PayPal);
      if (!payPalMethod) {
        return false;
      }
      const providerData = payPalMethod.connectedProviderAccountData;
      return (
        [ProviderAccountStatus.UNKNOWN, ProviderAccountStatus.CLAIMED].includes(providerData.status) &&
        providerData.additionalData.permissionsGranted === 'false'
      );
    } catch (err) {
      console.error('Error while fetching or processing payment methods.');
      return false;
    }
  };

  private async prepareModuleConfig(): Promise<void> {
    const experiments = await this.getActiveExperiments();
    const hotelsSupportCashier = experiments.includes(Experiment.HotelsRedirectToCashierInBO);
    if (ModuleRegistry.invoke('businessManager.isAppInstalled', appDefIds.hotels) && !hotelsSupportCashier) {
      // ATM of writing Hotels vertical is not integrated with BM, thus need to hard-code its Cashier configuration
      this.config(HARDCODED_Hotels_ModuleId, {
        markAsUnsupportedVertical: {
          navigateToSettingsConfig: {
            // ETPA stands for External Third-Party Application; Hotels app is integrated into BM through ETPA container
            pageComponentId: PageComponentId.Etpa_Container,
            contextData: {
              appState: appDefIds.hotels,
            },
          },
          fetchAppTitle: () =>
            Promise.resolve(
              // this particular string (for Hotels vertical) is replaced with translated version in the modal component
              // don't need to localize it here
              'Hotel',
            ),
        },
      });
    }
  }

  config(sourceModule: ModuleId, params: ConfigParams) {
    if (params.initVerticalOrderPageNavigation) {
      const { appDefId, buildNavigateToOrderConfig } = params.initVerticalOrderPageNavigation;

      this.orderPageConfig[appDefId] = {
        buildNavigateToOrderConfig,
      };
    }

    if (params.markAsUnsupportedVertical) {
      const { navigateToSettingsConfig, fetchAppTitle } = params.markAsUnsupportedVertical;

      this.unsupportedVerticalsConfig[sourceModule] = {
        fetchAppTitle,
        navigateToSettingsConfig,
      };
    }
  }

  public getSentryHub = () => this.sentryHub;
}

registerModule(ModuleId.Cashier, BMModule);
