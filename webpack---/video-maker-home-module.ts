import {
  BusinessManagerModule,
  ModuleId,
  registerModule,
  registerPageComponentMonitors,
} from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { COMPONENT_NAME, MODULE_ID } from './config';
import VideoMakerHomeLazyComponent from './manifest';
import { sentryClient } from './services/sentryClient';

class VideoMakerHomeModule extends BusinessManagerModule {
  constructor(moduleId: ModuleId) {
    super(moduleId);
    ModuleRegistry.registerComponent(
      COMPONENT_NAME,
      () => VideoMakerHomeLazyComponent,
    );
  }

  init() {
    registerPageComponentMonitors(COMPONENT_NAME, {
      sentryClient,
    });
  }
}

registerModule(MODULE_ID, VideoMakerHomeModule);
