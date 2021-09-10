import { BusinessManagerModule, registerModule, configModule, ModuleId, TModuleParams, isAppInstalled } from '@wix/business-manager-api';
import { ReactLazyComponent } from 'react-module-container';
import { appDefId } from '@wix/ping-automations-server/dist/appDefId';
import { customerNotificationsComponent, customerNotificationsLazyComponent, notifyActionFormComponent, notifyActionFormLazyComponent, pingModuleId, pmFlowComponent, pmFlowLazyComponent } from '../componentNames';
import { createI18nInstance } from '../i18n';
import { isConfigValid } from '../utils/validations';
import Experiments from '@wix/wix-experiments';

export const PREINSTALL_AUTOMATIONS_APP_DEF_ID = '41d8c51c-55fb-4909-ab3d-8b8d6d513336';

class PingAutomationsNotifyLazyComponent extends ReactLazyComponent {
  constructor(props: TModuleParams) {
    const { config, debug } = props;
    const { pingAutomationsStaticsUrl } = config.topology;
    const options = {
      files: [
        `${pingAutomationsStaticsUrl}/automations-component.bundle${debug ? '' : '.min' }.js`,
        `${pingAutomationsStaticsUrl}/automations-component${debug ? '' : '.min' }.css`
      ],
      component: notifyActionFormComponent,
    };
    super(props, options);
  }
}

class PingAutomationsPMFlowLazyComponent extends ReactLazyComponent {
  constructor(props: TModuleParams) {
    const { config, debug } = props;
    const { pingAutomationsStaticsUrl } = config.topology;
    const options = {
      files: [
        `${pingAutomationsStaticsUrl}/apes-pm-flow.bundle${debug ? '' : '.min' }.js`,
        `${pingAutomationsStaticsUrl}/apes-pm-flow${debug ? '' : '.min' }.css`
      ],
      component: pmFlowComponent,
    };
    super(props, options);
  }
}

class CustomerNotificationsLazyComponent extends ReactLazyComponent {
  constructor(props: TModuleParams) {
    const { config, debug } = props;
    const { pingAutomationsStaticsUrl } = config.topology;
    const options = {
      files: [
        `${pingAutomationsStaticsUrl}/automations-component.bundle${debug ? '' : '.min' }.js`,
        `${pingAutomationsStaticsUrl}/automations-component${debug ? '' : '.min' }.css`
      ],
      component: customerNotificationsComponent,
    };
    super(props, options);
  }
}

class PingAutomationsModule extends BusinessManagerModule {
  constructor(moduleId) {
    super(moduleId);
    this.setModuleConfigurationId('PING' as any);
    this.registerComponentWithModuleParams(notifyActionFormLazyComponent, PingAutomationsNotifyLazyComponent);
    this.registerComponentWithModuleParams(pmFlowLazyComponent, PingAutomationsPMFlowLazyComponent);
    this.registerPageComponent(customerNotificationsLazyComponent, CustomerNotificationsLazyComponent);
  }

  async init({ accountLanguage = 'en' }: TModuleParams) {
    let automationsSpecificActionErrors = false;

    try {
      const experiments = new Experiments({ scope: 'my-account' });
      await experiments.ready();

      automationsSpecificActionErrors = experiments.enabled('specs.crm.AutomationsSpecificActionErrors');
    } catch (e) {
      // tslint:disable-next-line
      console.error('Failed to conduct specs.crm.AutomationsSpecificActionErrors');
    }

    const i18n = createI18nInstance(accountLanguage);
    i18n.on('initialized', () => {
      const isPreinstalledAutomationsInstalled = isAppInstalled(PREINSTALL_AUTOMATIONS_APP_DEF_ID);
      configModule(pingModuleId, ModuleId.Triggers, {
        appDefId,
        actions: {
          notify: {
            displayName: i18n.t(isPreinstalledAutomationsInstalled ? 'template-editor.notify-action.title' : 'notify.automations-list.title'),
            displayInfo: i18n.t('notify.automations-list.info'),
            componentName: notifyActionFormLazyComponent,
            editActionModalInfo: {
              title: i18n.t('notify.edit-action.title'),
            },
            verifyConfig: async ({ actionConfig }) => {
              const configIsValid = isConfigValid(JSON.parse(actionConfig));

              if (automationsSpecificActionErrors && !configIsValid) {
                return Promise.reject(i18n.t('notify.automations-list.invalidConfigError'));
              }

              return configIsValid;
            },
          },
        },
      });
    });
  }
}

registerModule(pingModuleId, PingAutomationsModule);
