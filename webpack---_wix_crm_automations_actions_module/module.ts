import {
  BusinessManagerModule,
  ModuleId,
  registerModule,
  TModuleParams,
} from '@wix/business-manager-api';
import Experiments from '@wix/wix-experiments';
import { registerCouponAction } from './actions/coupon/coupon-action';
import {
  CouponActionLazyComponent,
  COUPON_ACTION_LAZY_COMPONENT,
} from './actions/coupon/coupon-lazy-component';
import {
  SendCouponOnHoldLazyComponent,
  SEND_COUPON_ON_HOLD_LAZY_COMPONENT,
} from './actions/coupon/coupon-onhold-tooltip-lazy-component';
import { registerSpreadsheetsAction } from './actions/spreadsheets/spreadsheets-action';
import {
  SpreadsheetsActionLazyComponent,
  SPREADSHEETS_ACTION_LAZY_COMPONENT,
} from './actions/spreadsheets/spreadsheets-lazy-component';

class AutomationsActionsModule extends BusinessManagerModule {
  moduleParams: TModuleParams;
  experiments: Experiments;

  init(moduleParams: TModuleParams) {
    this.moduleParams = moduleParams;
    this.experiments = new Experiments({
      scope: 'my-account',
      useNewApi: true,
    });
    this.experiments.ready().then(() => {
      this.registerActions();
    });
  }

  registerActionsLazyComponents() {
    this.registerComponentWithModuleParams(
      SPREADSHEETS_ACTION_LAZY_COMPONENT,
      SpreadsheetsActionLazyComponent,
    );

    this.registerComponentWithModuleParams(
      COUPON_ACTION_LAZY_COMPONENT,
      CouponActionLazyComponent,
    );

    this.registerComponentWithModuleParams(
      SEND_COUPON_ON_HOLD_LAZY_COMPONENT,
      SendCouponOnHoldLazyComponent,
    );
  }

  async registerActions() {
    this.registerActionsLazyComponents();
    registerSpreadsheetsAction(this.moduleParams, this.experiments).catch(
      (e) => {
        console.warn('Could not register spreadsheets action:', e);
      },
    );
    registerCouponAction(this.moduleParams, this.experiments).catch((e) => {
      console.warn('Could not register coupon action:', e);
    });
  }
}

registerModule(ModuleId.AutomationsActions, AutomationsActionsModule);
