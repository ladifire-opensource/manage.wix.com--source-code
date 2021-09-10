import {
  BusinessManagerModule,
  registerModule,
  registerPageComponentMonitors,
  PageComponentId,
} from '@wix/business-manager-api';
import { MODULE_ID, COMPONENT_NAME, MULTILINE_COMPONENT_NAME } from './config';

const { sentryClient } = require('./sentryClient');

class BMModule extends BusinessManagerModule {
  register() {
    const baseUrl = 'https://www.wix.com/secrets-manager/key-manager';

    this.registerVeloComponent(COMPONENT_NAME, {
      url: `${baseUrl}/key-manager`,
    });

    this.registerVeloComponent(MULTILINE_COMPONENT_NAME, {
      url: `${baseUrl}/key-manager-multiline`,
    });
  }

  init() {
    registerPageComponentMonitors(PageComponentId.WixCodeSecretsManagerHome, {
      sentryClient,
    });
  }
}

registerModule(MODULE_ID, BMModule);
