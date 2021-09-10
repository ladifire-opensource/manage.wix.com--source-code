import { appDefIds, configModule, ModuleId, TModuleParams } from '@wix/business-manager-api';
import axios from 'axios';
import { WEBHOOKS_ACTION_LAZY_COMPONENT } from './config';
import { WebhooksActionLazyComponent } from './webhooks-action-lazy-component';
import { BMModule } from './module';
import { ModuleRegistry } from 'react-module-container';


export const registerActionComponents = (module: BMModule) => {
  module.registerComponentWithModuleParams(
    WEBHOOKS_ACTION_LAZY_COMPONENT,
    WebhooksActionLazyComponent
  );
};

export const registerAutomationActions = async (moduleParams: TModuleParams, experiments = {}) => {
  const wixCodeEnabled = ModuleRegistry.invoke('businessManager.isAppInstalled', appDefIds.wixCode);
  const isPartnerSite = ModuleRegistry.invoke(
    'businessManager.isAppInstalled',
    appDefIds.wixExpertsDashboard
  );
  const {
    accountLanguage,
    config: {
      topology: {
        webhooksActionStaticsUrl: webhookBaseUrl,
      },
    },
  } = moduleParams;

  const privateAxios = axios.create();
  const isSpecificErrorsEnabled = experiments['specs.crm.AutomationsSpecificActionErrors'] === 'true';

  if (wixCodeEnabled || isPartnerSite) {
    const { data: webhookTranslations } = await privateAxios.get(
      `${webhookBaseUrl}assets/locales/messages_${accountLanguage}.json`
    );

    configModule(ModuleId.Automations, ModuleId.Triggers, {
      appDefId: appDefIds.triggers,
      actions: {
        'webhooks-action': {
          displayName: webhookTranslations['webhooks_action.display_name'],
          displayInfo: webhookTranslations['webhooks_action.display_info'],
          componentName: WEBHOOKS_ACTION_LAZY_COMPONENT,
          verifyConfig: async ({ actionConfig }) => {
            const { url } = JSON.parse(actionConfig);

            return !validURL(url)
              ? isSpecificErrorsEnabled
                ? Promise.reject(webhookTranslations['target_url_error'])
                : false
              : true;
          },
        },
      },
    });
  }
};

const validURL = (str) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return pattern.test(str);
};
