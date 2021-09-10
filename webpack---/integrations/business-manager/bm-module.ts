import {ReactLazyComponent, ModuleRegistry, ReactLazyComponentOptions} from 'react-module-container';
import {
  TModuleParams,
  registerPageComponentMonitors,
  ModuleId,
  registerModule,
  BusinessManagerModule,
} from '@wix/business-manager-api';
import * as BmIntegration from '@wix/business-manager-api';
import {
  bmPayoutsComponentId,
  bmPayoutBundleName,
  bmPayablesComponentId,
  moduleId as bmBalanceModuleId,
  bmPayablesBundleName,
  wixPaymentsTitleBmSidebarItem,
  balancePayoutsBmSidebarItem,
  balancePayablesBmSidebarItem,
  baseApiUrl,
  TPageComponentProps,
} from './bm-config';
import {BmUserRoles} from './bm-config';
import {PageComponentId} from '@wix/business-manager-api/dist/src/PageComponentId';
import {getFilesList} from '../@common/getFilesList';
import {bmInitSentryHub} from './bm-init-sentry-hub';
import {ENTRY_POINT} from '../../utils/config';

interface CashierPaymentProvider {
  id: string;
  country?: string;
  enabledMethodIds: string[];
  accountStatus: string;
}

const WP_PAYMENT_PROVIDER_ID = 'com.wix.wixpay.us';

const getModuleInitialData = ({locale}: TPageComponentProps) => async () => {
  const [country, accountId, {data: initialData}] = await Promise.all([
    ModuleRegistry.invoke('cashier.getWixPaymentsCountry'),
    ModuleRegistry.invoke('cashier.getWixPaymentsAccountId'),
    window['axios'].get(`${baseApiUrl}api/meta/balance-initial-data`, {params: {locale}}),
  ]);

  return {
    ...initialData,
    country,
    baseApiUrl,
    accountId,
    bmIntegration: BmIntegration,
    entryPoint: ENTRY_POINT.BM,
  };
};

class BmModulePayouts extends ReactLazyComponent<TPageComponentProps> {
  constructor(props: TPageComponentProps) {
    const options: ReactLazyComponentOptions = {
      files: getFilesList({
        debug: props.debug,
        staticsUrl: props.config.topology.staticsUrl,
        bundleName: bmPayoutBundleName,
      }),
      resolve: getModuleInitialData(props),
      component: bmPayoutsComponentId,
    };

    super(props, options);
  }
}

class BmModulePayables extends ReactLazyComponent<TPageComponentProps> {
  constructor(props: TPageComponentProps) {
    const options: ReactLazyComponentOptions = {
      files: getFilesList({
        debug: props.debug,
        staticsUrl: props.config.topology.staticsUrl,
        bundleName: bmPayablesBundleName,
      }),
      resolve: getModuleInitialData(props),
      component: bmPayablesComponentId,
    };

    super(props, options);
  }
}

class BalanceModule extends BusinessManagerModule {
  private getCashierPaymentProvidersPromise: Promise<CashierPaymentProvider[]>;
  private siteId: string;
  private userRole: string;

  private getWpPaymentProvider = (providers: CashierPaymentProvider[]) => {
    return providers && providers.find(({id}) => id === WP_PAYMENT_PROVIDER_ID);
  };

  private checkForFirstTransaction = async (wpProvider: CashierPaymentProvider) => {
    const url = `${baseApiUrl}${wpProvider.country}/api/transactions/has-first`;
    const firstTransactionRes = await window['axios'].get(url, {params: {siteId: this.siteId}});

    return firstTransactionRes.data;
  };

  private sidebarConfig = {
    slotItems: {
      'wix-payments-balance-slot': [
        wixPaymentsTitleBmSidebarItem,
        balancePayoutsBmSidebarItem,
        balancePayablesBmSidebarItem,
      ],
    },
  };

  constructor(moduleId: ModuleId) {
    super(moduleId);

    ModuleRegistry.registerComponent(bmPayoutsComponentId, () => BmModulePayouts);
    ModuleRegistry.registerComponent(bmPayablesComponentId, () => BmModulePayables);
  }

  init(moduleParams: TModuleParams) {
    this.siteId = moduleParams.metaSiteId;
    this.userRole = moduleParams.userRole;
    const sentryHub = bmInitSentryHub(moduleParams);

    registerPageComponentMonitors(bmPayoutsComponentId as PageComponentId, {
      sentryClient: sentryHub.getClient(),
    });

    registerPageComponentMonitors(bmPayablesComponentId as PageComponentId, {
      sentryClient: sentryHub.getClient(),
    });

    if (this.userRole === BmUserRoles.owner) {
      this.getCashierPaymentProvidersPromise = ModuleRegistry.invoke('cashier.getPaymentProviders');
    }
  }

  async getSidebarConfig() {
    if (this.userRole !== BmUserRoles.owner) {
      return undefined;
    }

    const providers = await this.getCashierPaymentProvidersPromise;
    const wpProvider = this.getWpPaymentProvider(providers);

    if (wpProvider && wpProvider.enabledMethodIds && wpProvider.enabledMethodIds.length > 0) {
      return this.sidebarConfig;
    } else if (wpProvider) {
      const hasFirstTransaction = await this.checkForFirstTransaction(wpProvider);

      if (hasFirstTransaction) {
        return this.sidebarConfig;
      }
    }

    return undefined;
  }
}

registerModule(bmBalanceModuleId, BalanceModule);
