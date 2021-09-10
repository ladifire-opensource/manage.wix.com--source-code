import {BusinessManagerModule, registerModule, ModuleId} from '@wix/business-manager-api';
import {ModuleRegistry} from 'react-module-container';
import {RMC_LAZY_COMPONENT_ID, RMCLazyComponent} from '../rmc';

class BMModule extends BusinessManagerModule {
  constructor(moduleId: ModuleId) {
    super(moduleId);
    ModuleRegistry.registerComponent(RMC_LAZY_COMPONENT_ID, () => RMCLazyComponent);
  }
}

registerModule(ModuleId.WixPayments, BMModule);
