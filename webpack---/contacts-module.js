import {
  BusinessManagerModule,
  closeSidePanel,
  reportSidePanelLoaded,
  ModuleId,
  onSidePanelClose,
  openSidePanel,
  PageComponentId,
  registerModule,
  registerPageComponentMonitors,
  configModule,
  getCurrentInstance,
  appDefIds,
} from '@wix/business-manager-api';
import { notesLazyComponentConfig as BusinessManagerNotes } from '@wix/notes-client/dist/src/wrappers/business-manager';
import Experiments from '@wix/wix-experiments';
import { ModuleRegistry, ReactLoadableComponent } from 'react-module-container';
import { ContactPanelLazyComponent } from './components/ContactPanel/contact-panel-lazy';
import { ContactsLazyComponent } from './contacts-main-page-component';
import {
  contactPanelMethods,
  contactsGlobalMethods,
} from './moduleRegistryMethods';
import { sentryClient } from './sentry-client';
import { names, notesWidgetModuleId } from './constants/components';
import { Tabs } from './tab-repo';
import { withModuleParams } from './withModuleParams';
import { DashboardAPI } from '@wix/business-manager-dashboard-api';

import { mountDeleteContactsModal } from './contacts-module-utils';
import {
  initRegisteredComponents,
  isContactsViewsRegisteredComponent,
  registerContactsViewsComponent,
  registerNotesTab,
} from './contacts-module-widgets';
import { ContactsWidgetLazyComponent } from './contacts-widget-lazy';
import { fedopsLogger } from './common/fedops';
import { CustomFieldsTranslator } from './reservedColumns';
import { ContactsLabelsApp } from '@wix/ambassador-contacts-labels-app/http';
import { CONTACTS_SERVER_URL } from './apis/constants';
import { isPermitted } from './apis/UserPermissionsApi';
import { createLabel } from './apis/LabelsApi';

export class ContactsModule extends BusinessManagerModule {
  static CONTACT_CARD = 'contact-card';
  static EDIT_CONTACT = 'edit-contact';
  static CONTACT_PANEL_WIDGET = 'panel-widget';
  static DELETE_MODAL_SUFFIX = 'DELETE_MODAL_SUFFIX';
  static MANAGE_LABELS = 'manage-labels';
  static CONTACTS_DASHBOARD_WIDGET = 'contacts-dashboard-widget';
  static CONTACTS_WIDGET = 'contacts-widget';
  static DELETE_CONTACTS_MODAL = 'delete-contacts-modal';

  constructor(moduleId) {
    // prepopulate tasks and notes widgets since no one registers them currently
    const tasksWidget = {
      componentName: names.tasksComponentName,
      hasFooter: false,
      moduleId: ModuleId.TasksWeb,
    };
    const notesWidget = {
      componentName: BusinessManagerNotes.componentId,
      hasFooter: false,
      moduleId: notesWidgetModuleId,
    };
    super(moduleId);
    this.panelWidgets = [tasksWidget, notesWidget];
    this.registeredComponents = initRegisteredComponents();
    registerNotesTab(
      notesWidgetModuleId,
      notesWidget,
      this.registeredComponents,
    );
    this.tabs = new Tabs();
    this.experiments = {};
    this.customFields = [];
    this.deleteModalSuffix = '';
    this.permissions = [];

    ModuleRegistry.registerComponent(PageComponentId.Contacts, () =>
      withModuleParams(ContactsLazyComponent),
    );

    this.registerComponentWithModuleParams(
      ContactsModule.DELETE_CONTACTS_MODAL,
      ReactLoadableComponent(ContactsModule.DELETE_CONTACTS_MODAL, () => {
        return import(
          /* webpackPrefetch: true */ './components/DeleteContact/DeleteContactContainerExternal'
        );
      }),
    );

    ModuleRegistry.registerComponent(ContactsModule.CONTACT_CARD, () =>
      withModuleParams(ContactPanelLazyComponent),
    );

    ModuleRegistry.registerComponent(ContactsModule.CONTACTS_WIDGET, () =>
      withModuleParams(ContactsWidgetLazyComponent),
    );

    ModuleRegistry.registerComponent(BusinessManagerNotes.componentId, () =>
      withModuleParams(BusinessManagerNotes.componentClass),
    );

    this.registerContactPanel();
  }

  registerDashboardWidget(staticUrl, msid) {
    DashboardAPI.registerWidgets({
      id: ContactsModule.CONTACTS_DASHBOARD_WIDGET,
      staticUrl,
      initialDataEndpoint: `/_serverless/contacts-dashboard-widget/contacts`,
    });
  }

  registerCreateContactModal() {
    ModuleRegistry.registerMethod(
      contactsGlobalMethods.openEditContactModal,
      () => {
        return (props) =>
          ModuleRegistry.invoke('contacts.openEditContactV4', props);
      },
    );
  }

  registerDeleteContactsMethod() {
    ModuleRegistry.registerMethod(
      contactsGlobalMethods.openDeleteContacts,
      () => mountDeleteContactsModal,
    );
  }

  registerContactPanel() {
    ModuleRegistry.registerMethod(
      contactPanelMethods.showContact,
      () => (componentProps) => {
        openSidePanel({
          componentName: ContactsModule.CONTACT_CARD,
          componentProps: {
            ...componentProps,
            onLoaded: () => {
              reportSidePanelLoaded();
              fedopsLogger.interactionEnded('contact-panel-load');
            },
          },
        });
      },
    );

    ModuleRegistry.registerMethod(contactPanelMethods.hideContact, () => () => {
      closeSidePanel();
    });

    ModuleRegistry.registerMethod(
      contactPanelMethods.onHideContact,
      () =>
        ({ listener }) => {
          return onSidePanelClose(listener);
        },
    );
    ModuleRegistry.registerComponent(BusinessManagerNotes.componentId, () =>
      withModuleParams(BusinessManagerNotes.componentClass),
    );
  }

  async init(moduleParams) {
    this.moduleParams = moduleParams;
    // the only ones who use this method is price quetes, after they will take the permissions from config
    // we could remove the method from server as well.
    ModuleRegistry.registerMethod(
      'contacts.isPermitted',
      () =>
        ({ action }) => {
          return isPermitted('my-account.' + action);
        },
    );
    this.registerDashboardWidget(
      moduleParams.config.topology.contactsDashboardWidgetStaticsUrl,
      moduleParams.metaSiteId,
    );

    this.customFieldsTranslator = new CustomFieldsTranslator();
    ModuleRegistry.registerMethod(
      'contacts.isReservedFieldName',
      () =>
        ({ name, locale }) => {
          return this.customFieldsTranslator.isReservedFieldName(name, locale);
        },
    );

    this.setPermissions(moduleParams.userPermissions);
    this.registerCreateContactModal();
    this.registerDeleteContactsMethod();
    await this.conductExperiments();

    this.registerContactsAutomations(moduleParams.accountLanguage);

    registerPageComponentMonitors(PageComponentId.Contacts, { sentryClient });
  }

  async registerContactsAutomations(locale) {
    const translations = await import(`./assets/locale/messages_${locale}`);

    const DEPEACATED_CONTACTS_APP_DEF_ID =
      '13e1bb7b-4988-1953-88b6-2812f8fed2e7';
    const contactsAutomationsProviderId = DEPEACATED_CONTACTS_APP_DEF_ID; // Don't change this

    const labelsMissing = async (labelKeys, labelLegacyIds) => {
      try {
        const instance = getCurrentInstance(appDefIds.metaSite);
        const labelsService = ContactsLabelsApp(
          CONTACTS_SERVER_URL,
        ).ContactLabelsServiceV4()({
          Authorization: instance,
        });
        if (!!labelKeys) {
          const response = await labelsService.queryLabels({
            query: {
              filter: {
                key: {
                  $in: labelKeys,
                },
              },
            },
          });
          return response.labels.length !== labelKeys.length;
        } else {
          const response = await labelsService.queryLabels({
            query: {
              filter: {
                legacyId: {
                  $in: labelLegacyIds,
                },
              },
            },
          });
          return response.labels.length !== labelLegacyIds.length;
        }
      } catch (ex) {
        return true;
      }
    };

    const shouldUseRequiredTypes =
      this.experiments['specs.crm.AutomationsMissingEmailsInForms'] === 'true';

    configModule(ModuleId.Contacts, ModuleId.Triggers, {
      appDefId: contactsAutomationsProviderId,
      actions: {
        addLabelsToContact: {
          displayName: translations['labelContactAction.displayName'],
          displayInfo: translations['labelContactAction.displayInfo'],
          componentName: 'contacts.label-contact-action',
          verifyConfig: async ({ actionConfig }) => {
            const { labelIds, labelKeys } = JSON.parse(actionConfig);
            const areLabelsEmpty =
              (!labelKeys || labelKeys.length === 0) &&
              (!labelIds || labelIds.length === 0);

            if (areLabelsEmpty) {
              return Promise.reject(
                translations['labelContactAction.errors.empty_labels'],
              );
            }

            const areLabelsMissing = await labelsMissing(labelKeys, labelIds);

            if (areLabelsMissing) {
              return Promise.reject(
                translations['labelContactAction.errors.missing_labels'],
              );
            }

            return true;
          },
          onBeforeSave: async (actionConfig = {}) => {
            const { preAddedLabel } = actionConfig;

            if (!preAddedLabel) {
              return actionConfig;
            }
            try {
              const createdLabel = await createLabel(preAddedLabel);

              return {
                labelKeys: [createdLabel.label.key],
              };
            } catch (ex) {
              return Promise.reject(
                `failed to create label - ${preAddedLabel}. ${ex}`,
              );
            }
          },
          generateConfig: async ({ actionComponentInfo } = {}) => {
            const { preAddedLabel } = actionComponentInfo || {};
            return JSON.stringify({
              labelIds: [],
              ...(preAddedLabel ? { preAddedLabel } : {}),
            });
          },
          requiredTypes: shouldUseRequiredTypes ? ['CONTACT_ID'] : null,
        },
      },
    });
  }

  async setPermissions(permissions) {
    this.permissions = permissions;
  }

  async conductExperiments() {
    const conductedExperiments = new Experiments({
      scopes: ['my-account', 'crm-contacts', 'business-settings'],
    });
    await conductedExperiments.ready();
    this.setExperiments(conductedExperiments.experiments);
  }

  getExperiments() {
    return this.experiments;
  }

  setExperiments(experiments) {
    this.experiments = experiments;
  }

  config(sourceModule, config) {
    if (config.type === ContactsModule.DELETE_MODAL_SUFFIX) {
      this.deleteModalSuffix = config.text;
    } else if (isContactsViewsRegisteredComponent(config)) {
      registerContactsViewsComponent(
        sourceModule,
        config,
        this.registeredComponents,
      );
    } else if (config.type === ContactsModule.CONTACT_PANEL_WIDGET) {
      if (config.componentName) {
        this.panelWidgets.push({
          componentName: config.componentName,
          hasFooter: config.hasFooter,
          moduleId: sourceModule,
          shouldRender: config.shouldRender,
          category: config.category,
        });
      }
    } else {
      this.tabs.config(sourceModule, config);
    }
  }

  getTabConfiguration() {
    return this.tabs.getTabConfiguration();
  }

  getPermissions() {
    return this.permissions;
  }
}

registerModule(ModuleId.Contacts, ContactsModule);
