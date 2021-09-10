import type {
  AppEnvironment,
  BusinessManagerEnvironment,
  CreateMonitorsOptions,
} from './types';
import Experiments, { ReadOnlyExperiments } from './exports/experiments';
import { factory as biLoggerFactory, FactoryOptions } from './exports/bi';
import * as fedopsLogger from './exports/fedops';
import type { BrowserClient, BrowserOptions, Hub } from './exports/sentry';
import {
  createHub,
  calculateAppEnvironment,
  ErrorMonitorOptions,
} from './exports/error-monitor';
import { i18n, initI18n, initOptions } from './exports/i18n';
import { HttpClient, IHttpClient } from '@wix/fe-essentials/http-client';

export * from './types';
export * from './instance';
export * from './experiments-redux';

/**
 * Essentials for the Business-Manager platform
 */
export class BusinessManagerEssentials {
  /**
   * Experiments instance for the Host
   */
  experiments: Experiments;

  /**
   * Sentry Instance
   */
  sentry: typeof import('@wix/fe-essentials/sentry');

  /**
   * A BI Logger factory
   */
  biLoggerFactory = biLoggerFactory;

  /**
   * A Fedops Logger factory
   */
  createFedopsLogger = fedopsLogger.create;

  /**
   * i18n instance factory
   */
  createI18n = initI18n;

  constructor(private readonly env: BusinessManagerEnvironment) {
    this.experiments = new Experiments({
      experiments: env.conductedExperiments,
    });

    this.sentry = env.Sentry;
  }

  /**
   * Method for creating Essentials for an App
   * @param env
   */
  createAppEssentials(env: Omit<AppEnvironment, 'platformEnv'>): AppEssentials {
    return new _AppEssentials({
      env: {
        ...env,
        platformEnv: this.env,
      },
      essentials: this,
    });
  }
}

export type CreateI18nParams = Pick<
  initOptions,
  'asyncMessagesLoader' | 'useSuspense' | 'disableAutoInit' | 'messages'
>;

type PublicMembers<T> = {
  [K in keyof T]: T[K];
};

export type AppEssentials = PublicMembers<_AppEssentials>;
export interface AppEssentialsParams {
  env: AppEnvironment;
  essentials: BusinessManagerEssentials;
}

/**
 * Essentials for Apps within the Business-Manager platform
 */
export class _AppEssentials {
  private readonly env: AppEssentialsParams['env'];
  private readonly essentials: AppEssentialsParams['essentials'];

  constructor({ env, essentials }: AppEssentialsParams) {
    this.env = env;
    this.essentials = essentials;

    this.httpClient = new HttpClient({
      getAppToken: () => env.platformEnv.getters.getAppToken(this.env.appDefId),
    });

    this.experiments = new ReadOnlyExperiments({
      experiments:
        env.platformEnv.appsConductedExperiments?.[env.appDefId] ?? {},
    });
  }

  /**
   * Http client
   */
  httpClient: IHttpClient;

  /**
   * An Experiments object factory
   */
  createExperiments({ scopes }: { scopes: string[] }): Experiments {
    return new Experiments({ scopes });
  }

  /**
   * A read-only Experiments instance with the app's pre-conducted experiments
   */
  experiments: ReadOnlyExperiments;

  /**
   * A Sentry & Sentry Hub factory
   */
  createSentryHub(
    options: BrowserOptions,
  ): { client: BrowserClient; hub: Hub } {
    const client = this.createSentryLogger(options);
    const hub = new this.essentials.sentry.Hub(client);
    return { client, hub };
  }

  /**
   * A Sentry factory
   */
  createSentryLogger(options: BrowserOptions): BrowserClient {
    return new this.essentials.sentry.BrowserClient(options);
  }

  /**
   * An ErrorMonitor factory (@wix/error-monitor)
   */
  createErrorMonitor(options: ErrorMonitorOptions) {
    const { moduleParams, platformEnv, appDefId, instanceId } = this.env;

    if (platformEnv?.userData?.id || options.user) {
      options.user = {
        id: platformEnv?.userData?.id,
        ...options.user,
      };
    }
    return createHub({
      Sentry: this.essentials.sentry,
      environment: calculateAppEnvironment(),
      ...options,
      tags: {
        appDefinitionId: appDefId,
        instanceId,
        metaSiteId: platformEnv?.metaSiteId,
        accountLanguage: moduleParams?.accountLanguage,
        ...options.tags,
      },
    });
  }

  /**
   * A combined method to create all monitoring related instances, in the mean time includes:
   * An ErrorMonitor factory (@wix/error-monitor)
   * A Fedops Logger factory
   * A BiLogger factory
   */
  createMonitors(monitorOptions: CreateMonitorsOptions) {
    const { fedopsLoggerOptions, errorMonitorOptions } = monitorOptions;

    const initializedFedopsLogger = fedopsLogger.create(
      fedopsLoggerOptions.appName,
      fedopsLoggerOptions.options ?? {},
    );

    const userBeforeSend = errorMonitorOptions.beforeSend;
    errorMonitorOptions.beforeSend = (event, hint) => {
      initializedFedopsLogger.reportErrorThrownOncePerFlow();

      return userBeforeSend ? userBeforeSend(event, hint) : event;
    };

    const errorMonitor = this.createErrorMonitor(errorMonitorOptions);

    return {
      errorMonitor,
      fedopsLogger: initializedFedopsLogger,
    };
  }

  /**
   * A Fedops Logger factory
   */
  createFedopsLogger = fedopsLogger.create;

  /**
   * A BI Logger factory
   */
  biLoggerFactory = (options?: FactoryOptions) => {
    const { metaSiteId: _msid, getDefaultBIFields } = this.env.platformEnv;
    const biLogger = biLoggerFactory(options);
    biLogger.updateDefaults({
      ...getDefaultBIFields?.(),
      _msid,
    });
    return biLogger;
  };

  /**
   * i18n factory
   * @param params i18n initialization parameters
   */
  createI18n({
    asyncMessagesLoader,
    useSuspense,
    disableAutoInit,
    messages,
  }: CreateI18nParams): i18n {
    return this.essentials.createI18n({
      locale: this.env.moduleParams.accountLanguage,
      asyncMessagesLoader,
      useSuspense,
      bindI18n: 'languageChanged reloadResources',
      disableAutoInit,
      messages,
    });
  }
}

try {
  // @ts-expect-error
  window.fedopsLogger = fedopsLogger;
} catch (e) {
  console.error('Failed putting fedops on the window!');
  console.error(e);
}
