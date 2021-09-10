import {
  BusinessManagerModule,
  registerModule,
  ModuleId,
} from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { getBanner } from '@wix/paywall-universal';

class PaywallModule extends BusinessManagerModule {
  init() {
    ModuleRegistry.registerMethod('paywall.getBanner', () => getBanner);
  }
}

registerModule(ModuleId.Paywall, PaywallModule);
