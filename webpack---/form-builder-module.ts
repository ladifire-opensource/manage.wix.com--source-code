import {
  BusinessManagerModule,
  registerModule,
  ModuleId,
  registerPageComponentMonitors,
  PageComponentId,
  TModuleParams,
} from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { WixFormsLazyComponent } from './form-builder-page-component';
import { FormBuilderWizardLazyComponent } from './form-builder-wizard-lazy-component';
import { FormBuilderAddFieldLazyComponent } from './form-builder-add-field-lazy-component';
import {
  LAZY_COMPONENT_ID,
  LAZY_FORM_BUILDER_ADD_FIELD_COMP_ID,
  LAZY_FORM_BUILDER_WIZARD_COMP_ID,
} from './config';
import { sentryClient } from './services/sentryClient';
import events from './constants/events';
import { showPaymentToast } from './utils/payment';
import { IHttpClient } from '@wix/fe-essentials-business-manager/http-client';
import { Logger } from '@wix/fe-essentials-business-manager/bi';
import { BaseLogger } from '@wix/fe-essentials-business-manager/fedops';
import { Experiments } from '@wix/fe-essentials-business-manager';
import { getFormLink } from './components/EditFormPage/utils/form-link-utils';

const getTranslations = async (locale: string) =>
  import(
    `./assets/locale/form-builder-business-manager/messages_${locale}.json`
  );

interface TranslationKV {
  [key: string]: string;
}

export class WixFormBmModule extends BusinessManagerModule {
  moduleParams: TModuleParams;
  biLogger: Logger;
  httpClient: IHttpClient;
  fedopsLogger: BaseLogger<string>;
  experiments: Experiments;

  translationsPromise: Promise<TranslationKV>;
  externalTemplates: { [key: string]: ExternalTemplate };

  constructor(moduleId) {
    super(moduleId);

    this.externalTemplates = {};

    ModuleRegistry.registerComponent(
      LAZY_COMPONENT_ID,
      () => WixFormsLazyComponent,
    );

    this.registerComponentWithModuleParams(
      LAZY_FORM_BUILDER_WIZARD_COMP_ID,
      FormBuilderWizardLazyComponent,
    );

    this.registerComponentWithModuleParams(
      LAZY_FORM_BUILDER_ADD_FIELD_COMP_ID,
      FormBuilderAddFieldLazyComponent,
    );

    ModuleRegistry.addListener(
      'cashier.events.paymentMethods.connected',
      async () => {
        this.showPaymentToast();
      },
    );
  }

  async showPaymentToast() {
    if (this.isOwnEditorReferral) {
      const translations = await this.translationsPromise;
      showPaymentToast(
        translations['cashier.paymentMethodConnected'],
        translations['cashier.paymentMethodConnected.buttonText'],
        () => {
          this.biLogger.log({
            evid: events.CONTINUE_PAYMENTS_SETUP,
          });
        },
      );
    }
  }

  get isOwnEditorReferral() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const initialReferralInfo = url.searchParams.get('referralInfo');

    return (
      initialReferralInfo === 'wix-forms' &&
      this.moduleParams.viewMode === 'editor'
    );
  }

  init(moduleParams: TModuleParams) {
    this.moduleParams = moduleParams;

    const {
      liveSite: { editorType },
      accountLanguage,
      instanceId,
    } = moduleParams;

    const {
      httpClient,
      createFedopsLogger,
      biLoggerFactory,
      createExperiments,
    } = this.appEssentials;

    this.experiments = createExperiments({ scopes: ['my-account'] });

    this.biLogger = biLoggerFactory({ endpoint: 'form-builder' })
      .updateDefaults({
        src: events.SRC,
        builderOrigin: editorType,
      })
      .logger();

    this.translationsPromise = getTranslations(accountLanguage);

    this.fedopsLogger = createFedopsLogger(PageComponentId.WixForms);

    this.httpClient = httpClient;

    ModuleRegistry.registerMethod(
      'wixForms.buildStandaloneLink',
      () =>
        ({ id }: { id: string }) => {
          return getFormLink({ id, instanceId });
        },
    );

    registerPageComponentMonitors(PageComponentId.WixForms, {
      sentryClient,
    });
  }

  config(_sourceModule: string, config: WixFormsModuleConfig) {
    if (config.type === 'CONFIG_TEMPLATE') {
      this.externalTemplates[config.payload.id] = config.payload;
    }
  }
}

registerModule(ModuleId.WixForms, WixFormBmModule);
