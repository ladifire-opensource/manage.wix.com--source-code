import { ModuleRegistry } from 'react-module-container';
import URI from 'urijs';

import Experiments from '@wix/wix-experiments';
import {
  BusinessManagerModule,
  TModuleParams,
  getModule,
  ModuleId,
  PageComponentId,
  appDefIds,
  getCurrentInstance,
} from '@wix/business-manager-api';

import { StatsLazyComponent } from './StatsLazyComponent';

import {
  StatsIntegrations,
  StatsIntegrationsWithModules,
} from './statsIntegrations';

import {
  IStatsIntegrationsInfo,
  IAnalyticsBMModule,
  IAnalyticsTopology,
  IStatsClientProps,
} from './types/types';

const PERMISSIONS = {
  UPGRADE_SITE: 'my-account.upgrade-site',
  OPEN_PROMOTE_HOME: 'SIDEBAR.ENABLE-PROMOTE-HOME',
};

class AnalyticsBMModule extends BusinessManagerModule
  implements IAnalyticsBMModule {
  private topology: IAnalyticsTopology;
  private moduleParams: TModuleParams;
  private readonly experiments: Experiments;
  private statsIntegrationsInfo: IStatsIntegrationsInfo;
  private bootstrapPromise: Promise<void>;

  constructor(moduleId: ModuleId) {
    super(moduleId);

    this.experiments = new Experiments();
    this.experiments.load('analytics');

    this.registerComponents();
  }

  private async registerComponents() {
    ModuleRegistry.registerComponent(
      PageComponentId.Analytics,
      () => StatsLazyComponent,
    );

    ModuleRegistry.registerComponent(
      PageComponentId.AnalyticsStats,
      () => StatsLazyComponent,
    );
  }

  init(moduleParams: TModuleParams) {
    this.topology = moduleParams.config.topology;
    this.moduleParams = moduleParams;

    this.bootstrap();
  }

  public getModuleParams(): TModuleParams {
    return this.moduleParams;
  }

  public getPageBasicUrl(): string {
    return this.topology.analyticsPageStaticUrl;
  }

  public getClientBasicUrl(): string {
    return this.topology.analyticsClientStaticUrl;
  }

  private readonly prepareStatsProps = (): IStatsClientProps => {
    const experiments = this.experiments.all();
    const integrations = this.statsIntegrationsInfo;
    const {
      metaSiteId: msID,
      siteName,
      liveSite,
      userPermissions,
    } = this.moduleParams;
    const { referralInfo, pageTab, timePeriod } = URI().search(true);
    const isSitePublished = liveSite ? liveSite.isSitePublished : false;
    const canUserUpgradeSite = userPermissions.includes(
      PERMISSIONS.UPGRADE_SITE,
    );
    const canUserOpenPromoteHome = userPermissions.includes(
      PERMISSIONS.OPEN_PROMOTE_HOME,
    );

    return {
      integrations,
      experiments,
      msID,
      siteName,
      referralInfo,
      pageTab,
      timePeriod,
      isSitePublished,
      canUserUpgradeSite,
      canUserOpenPromoteHome,
    };
  };

  public async getStatsProps() {
    return this.bootstrapPromise.then(this.prepareStatsProps);
  }

  private bootstrap() {
    this.bootstrapPromise = this.experiments.ready().then(async () => {
      this.statsIntegrationsInfo = await this.getStatsIntegrationsInfo();
    });
  }

  private async getStatsIntegrationsInfo(): Promise<IStatsIntegrationsInfo> {
    const collectedIntegrationInfo: IStatsIntegrationsInfo = {};
    for (const integrationInfo of StatsIntegrationsWithModules) {
      const {
        experiments,
        moduleID,
        checkPremium,
        id,
        appDefId,
      } = integrationInfo;

      const isDisabledByExperiments = experiments
        ? experiments.some(experiment => experiment.value !== this.experiments.enabled(experiment.key))
        : false;

      if (isDisabledByExperiments) {
        continue;
      }

      //TODO: any because i need to get data from private props until guys would present API method for getting it;
      const currentModule = getModule(moduleID);

      if (!currentModule) {
        continue;
      }

      const { instanceId } = (currentModule as any)._moduleParams;
      const instance = getCurrentInstance(appDefId);
      const isPremium = checkPremium ? await checkPremium(instance) : false;

      collectedIntegrationInfo[id] = {
        instance: getCurrentInstance(appDefId),
        instanceId,
        appId: appDefId,
        isPremium,
      };
    }

    for (const integrationInfo of StatsIntegrations) {
      const { id, experiments } = integrationInfo;

      const isDisabledByExperiments = experiments
        ? experiments.some(experiment => experiment.value !== this.experiments.enabled(experiment.key))
        : false;

      if (isDisabledByExperiments) {
        continue;
      }

      const { metaSiteId } = this.moduleParams;
      collectedIntegrationInfo[id] = {
        instance: getCurrentInstance(appDefIds.metaSite),
        instanceId: metaSiteId,
        appId: appDefIds.metaSite,
        isPremium: false,
      };
    }

    return collectedIntegrationInfo;
  }
}

export { AnalyticsBMModule };
