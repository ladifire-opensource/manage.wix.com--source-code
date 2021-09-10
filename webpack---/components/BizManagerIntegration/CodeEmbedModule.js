import {ModuleRegistry} from 'react-module-container';
import {BusinessManagerModule, registerModule} from '@wix/business-manager-api';
import {CodeEmbedLazyPageComponent} from './CodeEmbedLazyPageComponent';
import {LAZY_PAGE_COMPONENT, MODULE_ID} from './config';

class CodeEmbedModule extends BusinessManagerModule {
  constructor(moduleId) {
    super(moduleId);

    ModuleRegistry.registerComponent(LAZY_PAGE_COMPONENT, () => CodeEmbedLazyPageComponent);
  }
}

registerModule(MODULE_ID, CodeEmbedModule);
