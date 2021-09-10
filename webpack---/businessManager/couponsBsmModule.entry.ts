import {
  appDefIds,
  BusinessManagerModule,
  ModuleId,
  registerModule,
  configModule,
  TModuleParams,
  registerPageComponentMonitors,
  PageComponentId,
} from '@wix/business-manager-api';
import {ICouponsModuleConfig} from '@wix/coupons-client-api';
import {CouponsAppLazyComponent} from './lazyComponents/CouponsAppLazyComponent';
import {CouponModalLazyComponent} from './lazyComponents/CouponModalLazyComponent';
import {ICouponsModuleConfigs} from '../types/internal-types';
import {ComponentName} from '../types/ComponentName';
import {getShoutOutConfig} from './shoutOutConfig';
import {PromotionModalLazyComponent} from './lazyComponents/PromotionModalLazyComponent';
import Sentry from '@sentry/browser';
import Experiments from '@wix/wix-experiments';
// https://github.com/wix-private/business-manager-api

/* istanbul ignore next: should be tested in e2e */
export class CouponsModule extends BusinessManagerModule {
  private readonly moduleConfigs: ICouponsModuleConfigs = {};
  private topology;
  private moduleParams;

  constructor() {
    super(ModuleId.Coupons);

    this.appDefId = appDefIds.coupons; // to get the instance & instanceId in init's moduleParams

    window.ModuleRegistry.registerComponent(ComponentName.CouponsAppLazy, () => CouponsAppLazyComponent);
    window.ModuleRegistry.registerComponent(ComponentName.CouponsModalLazy, () => CouponModalLazyComponent);
    window.ModuleRegistry.registerComponent(ComponentName.PromotionModalLazy, () => PromotionModalLazyComponent);
  }

  public async init(moduleParams: TModuleParams): Promise<void> {
    const sentryClient = new Sentry.BrowserClient({
      dsn: 'https://bcecd81fd9234ce19ffd9dbefd610c8b@sentry.io/1366124',
    });
    registerPageComponentMonitors(PageComponentId.Coupons, {sentryClient});

    this.topology = moduleParams.config.topology;
    this.moduleParams = moduleParams;
    try {
      configModule(this.moduleId, ModuleId.Settings, {appDefIds: [this.appDefId]});
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('SM configure Settings failed', e);
    }

    const experiments = new Experiments();
    await experiments.load('coupons');

    try {
      configModule(this.moduleId, ModuleId.Shoutout, getShoutOutConfig(experiments));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('failed on shoutOut config');
    }
  }

  public config(sourceModuleId: ModuleId, configPayload: ICouponsModuleConfig) {
    this.moduleConfigs[sourceModuleId] = configPayload;
  }

  public getConfigs(): ICouponsModuleConfigs {
    return this.moduleConfigs;
  }

  public getTopology(): string {
    return this.topology;
  }

  public getCouponsBasicUrl(): string {
    return this.topology.couponsStaticsUrl;
  }

  public getModuleParams(): any {
    return this.moduleParams;
  }
}

registerModule(ModuleId.Coupons, CouponsModule);
