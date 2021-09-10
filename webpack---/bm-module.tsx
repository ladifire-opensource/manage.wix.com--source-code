import { BusinessManagerModule, registerModule, ModuleId } from '@wix/business-manager-api';
import { LAZY_COMPONENT_ID } from './config';
import { LaterModalLazyComponent} from './bm-component';

class PromoteSchedulerUiModule extends BusinessManagerModule {
  constructor(moduleId: ModuleId) {
    super(moduleId);

    // this component will use the same params as promote-home
    this.setModuleConfigurationId(ModuleId.PromoteHome);
    this.registerComponentWithModuleParams(
      LAZY_COMPONENT_ID,
      LaterModalLazyComponent,
    );
  }
}

// not a real BM module, just used to register the component
registerModule('promote-scheduler-ui' as ModuleId, PromoteSchedulerUiModule);