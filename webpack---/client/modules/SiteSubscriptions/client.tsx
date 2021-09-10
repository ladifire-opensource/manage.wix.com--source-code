import {
  BusinessManagerModule,
  registerModule,
  ModuleId,
  TPrefetchParams as BusinessManagerFetchParams,
  TModuleParams as BusinessManagerModuleParams,
  PageComponentId,
  registerPageComponentMonitors,
  TModuleParams
} from '@wix/business-manager-api';

import {
  ReactLazyComponent,
  ModuleRegistry,
  ReactLazyComponentManifest
} from 'react-module-container';
import Experiments from '@wix/wix-experiments';
import {InitServerApi} from '../../services/InitialDataApi';
import * as Sentry from '@sentry/browser';
import {SiteSubscriptionsLazyComponentOwnProps} from './components/Module/Module.providers';

export interface SiteSubscriptionsConfig {
  topology: Topology;
}

export interface Topology {
  staticsUrl: string;
  staticsVersion: string;
  premiumUiLibStaticsBaseUrl: string;
  psLangsJsonStaticsBaseUrl: string;
  premiumWidgetConfigStaticsBaseUrl: string;
  paymentUpdateStaticsBaseUrl: string;
  cancelPlanStaticsBaseUrl: string;
  dealerTranslationsStaticsBaseUrl: string;
  dealerViewerStaticsBaseUrl: string;
  ngDealerViewerStaticsBaseUrl: string;
  dealerLightboxStaticsBaseUrl: string;
  premiumErrorPagesStaticsBaseUrl: string;
  paynowWithUpdatePaymentMathodBaseUrl: string;
  assignSubscriptionStaticsBaseUrl: string;
  virtualNumbersCancelModalBaseUrl: string;
  changeCycleStaticsBaseUrl: string;
  ascendCancelModalBaseUrl: string;
}

interface SiteSubscriptionsPrefetchParams extends BusinessManagerFetchParams {
  config: SiteSubscriptionsConfig;
}

const files = ({config, debug}: SiteSubscriptionsPrefetchParams) => {
  const {
    staticsUrl,
    dealerViewerStaticsBaseUrl: dealerViewerStaticsUrl
  } = config.topology;
  const minify = (shouldMinify: boolean) => (shouldMinify ? '.min' : '');

  return [
    `${staticsUrl}site-level-module.bundle${minify(!debug)}.js`,
    `${staticsUrl}site-level-module${minify(!debug)}.css`,
    `${dealerViewerStaticsUrl}dealer-react-viewer.bundle${minify(!debug)}.js`,
    `${dealerViewerStaticsUrl}dealer-react-viewer${minify(!debug)}.css`
  ];
};

class SiteSubscriptionsLazyComponent extends ReactLazyComponent<
  BusinessManagerModuleParams
> {
  static prefetch(props: SiteSubscriptionsPrefetchParams) {
    return files(props);
  }

  constructor(props: BusinessManagerModuleParams) {
    const options: ReactLazyComponentManifest = {
      files: files(props),
      component: 'SiteSubscriptionsModule',
      crossorigin: true,
      resolve: async () => {
        try {
          const experiments = new Experiments();

          await experiments.load('premium-manage-subscriptions');
          // business manager provides an axios instance as a global property
          const serverApi = new InitServerApi((window as any).axios, 'site');

          const {
            hasManualPaymentMethod,
            currencySettings,
            userName,
            hasSubscriptions,
            userSitesCount,
            accountId
          } = await serverApi.fetchInitialSiteLevelData({
            metaSiteId: this.props.metaSiteId
          });

          const additionalProps: Omit<
            SiteSubscriptionsLazyComponentOwnProps,
            'config'
          > = {
            accountId,
            experiments,
            hasManualPaymentMethod,
            currencySettings,
            userName,
            hasSubscriptions,
            sentryClient: SiteSubscriptionsModule.sentryClient,
            didLazyComponentResolveFail: false,
            userSitesCount
          };

          return additionalProps;
        } catch (e) {
          SiteSubscriptionsModule.sentryClient &&
            SiteSubscriptionsModule.sentryClient.captureException(e);
          return {didLazyComponentResolveFail: true};
        }
      }
    };
    super(props, options);
  }
}

class SiteSubscriptionsModule extends BusinessManagerModule {
  static sentryClient: Sentry.BrowserClient;

  /*
      We use window.Sentry directly because on manage-subscription standalone we consume sentry from CDN and it's version 4, please do not remove
      window from the code
     */
  init(moduleParams: TModuleParams) {
    const {
      accountLanguage,
      userId: username,
      metaSiteId: metasite
    } = moduleParams;
    SiteSubscriptionsModule.sentryClient =
      SiteSubscriptionsModule.sentryClient ||
      new window.Sentry.BrowserClient({
        dsn: 'https://484aa4b7fcbf4234937d87fc0f1ca520@sentry.wixpress.com/56',
        beforeSend(event) {
          event.user = {
            ...event.user,
            username
          };
          event.tags = {
            ...event.tags,
            origin: 'client-site-level',
            locale: accountLanguage || '',
            metasite
          };
          return event;
        }
      });

    registerPageComponentMonitors(PageComponentId.SiteSubscriptions, {
      sentryClient: SiteSubscriptionsModule.sentryClient as any
    });
  }

  constructor(moduleId: ModuleId) {
    super(moduleId);
    (window.ModuleRegistry as typeof ModuleRegistry).registerComponent(
      PageComponentId.SiteSubscriptions,
      () => SiteSubscriptionsLazyComponent
    );
  }
}

registerModule(ModuleId.SiteSubscriptions, SiteSubscriptionsModule);
