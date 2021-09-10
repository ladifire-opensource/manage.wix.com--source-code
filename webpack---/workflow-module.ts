import {
  BusinessManagerModule,
  registerModule,
  ModuleId,
  PageComponentId,
  TModuleParams,
  configModule,
  registerPageComponentMonitors,
} from '@wix/business-manager-api';
import * as React from 'react';
import {ModuleRegistry} from 'react-module-container';
import {WorkflowBusinessManagerLazyComponent} from './workflow-business-manager-lazy-component';
import {AxiosHttpClient, createAxiosInstance} from './axios-http-client';
import {WorkflowApiClient} from './workflow-api';
import {
  WORKFLOW_SERVER,
  WORKFLOWS_MOVE_CARD_AUTOMATIONS_ACTION_LAZY,
  WORKFLOWS_WIDGET_LAZY,
  WORKFLOWS_OPEN_MODAL,
  WORKFLOWS_ON_CARD_WILL_MOVE_VALIDATION,
  WORKFLOWS_MODAL,
  WORKFLOWS_WIDGET_MODAL
} from './consts';
import {Phase, Workflow} from './types/domain-types';
import {IRegistrationConfig} from '@wix/smart-actions-types';
import {AutomationsMoveCardActionLazyComponent} from './automations-move-card-action-lazy';

import {sentryClient} from './services/sentry-client';
import {memoize} from './utils/memoize';
import {isProduction} from './utils/env';
import Experiments from '@wix/wix-experiments';
import {WorkflowsWidgetLazyComponent} from './workflows-widget-lazy';

const getTranslations = (axiosHttpClient, baseUrl, locale) =>
  axiosHttpClient.get(`${baseUrl}assets/locale/workflow/messages_${locale}.json`).then(res => res.data);

export class WorkflowModule extends BusinessManagerModule {
  moduleParams: TModuleParams;
  showModalCallbacks: { [container: string]: (component) => void } = {};
  cardWillMoveHandlers = [];

  constructor(moduleId) {
    super(moduleId);
    ModuleRegistry.registerComponent(
      PageComponentId.Workflow,
      () => WorkflowBusinessManagerLazyComponent
    );
    const wrapWidgetProps = props => {
      const axiosHttpClient = this.getAxiosClient();
      const clientApi = this.getClientApi(axiosHttpClient);
      return {
        ...props,
        clientApi,
        staticsUrl: this.moduleParams.config.topology.workflowStaticsUrl,
        locale: this.moduleParams.accountLanguage,
        metaSiteId: this.moduleParams.metaSiteId,
      };
    };
    ModuleRegistry.registerComponent(WORKFLOWS_MOVE_CARD_AUTOMATIONS_ACTION_LAZY, () => props => {
      return React.createElement(
        <any>AutomationsMoveCardActionLazyComponent,
        wrapWidgetProps(props)
      );
    });
    ModuleRegistry.registerComponent(WORKFLOWS_WIDGET_LAZY, () => props => {
      return React.createElement(
        <any>WorkflowsWidgetLazyComponent,
        wrapWidgetProps(props)
      );
    });

    ModuleRegistry.registerMethod(WORKFLOWS_OPEN_MODAL, () => (
      {componentName, componentProps} = {componentName: '', componentProps: {}}
    ) => {
      const Component = ModuleRegistry.component(componentName);
      if (typeof this.showModal === 'function' && Component) {
        const props = componentProps ? componentProps : {};
        const modalComponent = ({
          onReady = () => null, onClose = () => null
        } = {}) => React.createElement(Component, {
          ...props,
          onReady,
          onClose,
        });
        this.showModal(modalComponent);
      }
    });
    ModuleRegistry.registerMethod(WORKFLOWS_ON_CARD_WILL_MOVE_VALIDATION, () => (
      cb: () => Promise<boolean>
    ) => {
      this.cardWillMoveHandlers.push(cb);
    });
  }

  init = async (moduleParams: TModuleParams) => {
    if (isProduction()) {
      registerPageComponentMonitors(PageComponentId.Workflow, {sentryClient} as any);
    }
    this.moduleParams = moduleParams;
    const isPermittedViewWorkflow: Promise<boolean> = ModuleRegistry.invoke('contacts.isPermitted', {
      action: 'view-workflows',
      metaSiteId: moduleParams.metaSiteId,
    });

    configModule(ModuleId.Workflow, ModuleId.Contacts, {
      componentName: WORKFLOWS_WIDGET_LAZY,
      type: 'contact-page-overview-side-widget',
      shouldRender: () => isPermittedViewWorkflow,
    });

    const workflowStaticsUrl = moduleParams.config.topology.workflowStaticsUrl;
    const axiosHttpClientNoHeaders = createAxiosInstance(false);
    const axiosHttpClient = this.getAxiosClient();
    const clientApi = this.getClientApi(axiosHttpClient);
    try {
      const experiments = new Experiments({scope: 'my-account'});
      const [translations] = await Promise.all([
        getTranslations(axiosHttpClientNoHeaders, workflowStaticsUrl, this.moduleParams.accountLanguage),
        experiments.ready()
      ]);

      configModule(ModuleId.Workflow, ModuleId.Triggers, this.triggersConfig(clientApi, translations, experiments));
      if (await isPermittedViewWorkflow) {
        configModule(ModuleId.Workflow, ModuleId.Contacts, {
          type: 'quick_actions',
          actions: async () => {
            return [
              {
                priority: 3,
                label: translations['contactPanel.quickActions.manageWorkflows'],
                type: 'navigateTo',
                action: contactId => ({
                  pageComponentId: PageComponentId.Workflow,
                  viewId: 'workflow',
                  contextData: {
                    referrer: 'contactPanel'
                  }
                })
              }
            ];
          }
        });
        configModule(ModuleId.Workflow, ModuleId.Contacts, {
          componentName: WORKFLOWS_WIDGET_LAZY,
          type: 'panel-widget',
          hasFooter: false,
        });
      }
    } catch (ex) {
      // tslint:disable-next-line
      console.log('Failed to configure modules', ex);
    }
  }

  private showModal(modalContent) {
    const workflowsModalContainerCB = this.showModalCallbacks[WORKFLOWS_MODAL];
    const workflowsWidgetModalContainerCB = this.showModalCallbacks[WORKFLOWS_WIDGET_MODAL];
    if (typeof workflowsModalContainerCB === 'function') {
      workflowsModalContainerCB(modalContent);
    } else if (typeof workflowsWidgetModalContainerCB === 'function') {
      workflowsWidgetModalContainerCB(modalContent);
    }
  }

  addModalCB(modalContainer: string, cb) {
    this.showModalCallbacks[modalContainer] = cb;
  }

  removeModalCB(modalContainer: string) {
    this.showModalCallbacks[modalContainer] = null;
  }

  private getAxiosClient() {
    return new AxiosHttpClient(createAxiosInstance());
  }

  private getClientApi(axiosClient) {
    return new WorkflowApiClient(axiosClient, WORKFLOW_SERVER);
  }

  private triggersConfig(clientApi: WorkflowApiClient, translations, experiments: Experiments): IRegistrationConfig {
    const memoizedGetWorkflow = memoize(clientApi.getWorkflow.bind(clientApi), 1000);
    const memoizedListPhases = memoize(clientApi.listPhases.bind(clientApi), 1000);
    const memoizedListWorkflows = memoize(clientApi.listWorkflows.bind(clientApi), 1000);

    const getWorkflowPhases = async (workflow: Workflow): Promise<Phase[]> => {
      let workflowPhases: Phase[] = [];

      if (!workflow || !workflow.phasesList) {
        return [];
      }

      const hasToLoadMorePhases = workflow.phasesList.total > workflow.phasesList.phases.length;

      if (hasToLoadMorePhases) {
        const {phases} = await memoizedListPhases({
          workflowId: workflow.info.id,
          offset: workflow.phasesList.phases.length,
          limit: workflow.phasesList.total - workflow.phasesList.phases.length
        });
        workflowPhases = workflow.phasesList.phases.concat(phases, workflow.winPhase);
      } else {
        workflowPhases = workflow.phasesList.phases.concat(workflow.winPhase);
      }

      return workflowPhases;
    };

    return {
      appDefId: 'ea2821fc-7d97-40a9-9f75-772f29178430', // TODO: use BM_API.appDefIds later
      appTitle: translations['automations.events.cardMoved.appName'],
      events: {
        cardCreatedOrMoved: {
          eventType: 'LEGACY',
          displayName: translations['automations.events.cardMoved.name'],
          displayDescription: translations['automations.events.cardMoved.description'],
          displayColor: '#125b8f',
          providesContactInfo: true,
          supportsImmediateChat: false,
          supportsPingNotification: true,
          conditions: {
            workflowId: {
              displayName: translations['automations.events.cardMoved.workflowDropdown.label'],
              displayInfo: translations['automations.events.cardMoved.workflowDropdown.info'],
              multiChoice: false,
              options: async () => {
                const {workflows} = await memoizedListWorkflows();
                return workflows ? workflows.reduce((acc, workflow) => {
                  acc[workflow.id] = workflow.name;
                  return acc;
                }, <any>{}) : [];
              }
            },
            phaseId: {
              displayName: translations['automations.events.cardMoved.phaseDropdown.label'],
              displayInfo: translations['automations.events.cardMoved.phaseDropdown.placeholder'],
              multiChoice: false,
              options: async ({selectedOptions}) => {
                if (selectedOptions['workflowId'] && selectedOptions['workflowId'].length === 1) {
                  const workflowId = selectedOptions['workflowId'][0];
                  const {workflow} = await memoizedGetWorkflow(workflowId, 0);
                  let workflowPhases: Phase[] = await getWorkflowPhases(workflow);

                  return workflowPhases ? workflowPhases.reduce((acc, phase) => {
                    acc[phase.info.id] = phase.info.name;
                    return acc;
                  }, <any>{}) : [];

                } else {
                  return [];
                }
              }
            }
          }
        }
      },
      actions: {
        moveCard: {
          displayName: translations['automations.actions.moveCard.name'],
          displayInfo: translations['automations.actions.moveCard.description'],
          componentName: WORKFLOWS_MOVE_CARD_AUTOMATIONS_ACTION_LAZY,
          requiresContactInfo: true,
          verifyConfig: async ({actionConfig}) => {
            const specificErrorsEnabled = experiments.enabled('specs.crm.AutomationsSpecificActionErrors');

            const {workflowId, phaseId} = JSON.parse(actionConfig as any);
            if (!workflowId) {
              if (specificErrorsEnabled) {
                return Promise.reject(translations['automations.actions.moveCard.workflowId.errorMessage']);
              } else {
                return false;
              }
            } if (!phaseId) {
              if (specificErrorsEnabled) {
                return Promise.reject(translations['automations.actions.moveCard.phaseId.errorMessage']);
              } else {
                return false;
              }
            } else {
              let workflow;
              try {
                const workflowResponse = await memoizedGetWorkflow(workflowId, 0);
                workflow = workflowResponse.workflow;
              } catch (e) {
                workflow = null;
              }

              if (!workflow) {
                if (specificErrorsEnabled) {
                  return Promise.reject(translations['automations.actions.moveCard.workflowId.invalidSelection.errorMessage']);
                } else {
                  return false;
                }
              } else {
                let workflowPhases: Phase[];
                try {
                  workflowPhases = await getWorkflowPhases(workflow);
                } catch (e) {
                  workflowPhases = [];
                }

                const workflowPhaseIds = workflowPhases.map(w => w.info.id);
                if (!workflowPhaseIds.includes(phaseId)) {
                  if (specificErrorsEnabled) {
                    return Promise.reject(translations['automations.actions.moveCard.phaseId.invalidSelection.errorMessage']);
                  } else {
                    return false;
                  }
                }
              }
            }

            return true;
          }
        }
      },
      generateEventSchema: async () => ({
        'contact.Name.First': {
          displayName: translations['automations.schema.contactFirstName'],
          type: 'string'
        },
        'contact.Name.Last': {
          displayName: translations['automations.schema.contactLastName'],
          type: 'string'
        },
        'contact.Email[0]': {
          displayName: translations['automations.schema.contactEmail'],
          type: 'string'
        },
        workflowName: {
          displayName: translations['automations.schema.workflowName'],
          type: 'string'
        },
        phaseName: {
          displayName: translations['automations.schema.stepName'],
          type: 'string'
        },
      })
    };
  }
}

registerModule(ModuleId.Workflow, WorkflowModule);
