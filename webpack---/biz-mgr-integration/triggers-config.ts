import { appDefIds } from "@wix/business-manager-api";
import { IRegistrationConfig } from '@wix/smart-actions-types';
import { noop } from 'lodash';
import { INITIAL_ACTION_CONFIG } from '../components/automations/TasksAutomationWidget/default-config';
import { ModuleRegistry } from "react-module-container";
import { LAZY_AUTOMATION_WIDGET_COMPONENT_ID } from "./config";
import Experiments from "@wix/wix-experiments";

export const triggersConfig = (translations, experiments: Experiments): IRegistrationConfig => {
  return {
    appDefId: appDefIds.ascendTasks,
    appTitle: 'Tasks Automation Widget',
    generateEventSchema: noop as any,
    actions: {
      createTask: {
        displayName: translations['tasks.displayName'],
        displayInfo: translations['tasks.displayTooltip'],
        componentName: LAZY_AUTOMATION_WIDGET_COMPONENT_ID,
        verifyConfig: async ({ actionConfig }) => {
          const { title, assigneeId } = JSON.parse(actionConfig);
          await experiments.ready();

          const specificErrorsEnabled = experiments.enabled('specs.crm.AutomationsSpecificActionErrors');

          if (!title) {
            if (specificErrorsEnabled) {
              return Promise.reject(translations['tasks.addATask.emptyError']);
            }

            return false;
          }

          if (assigneeId) {
            const isAssigneeValid = await assigneeExists(assigneeId);
            if (!isAssigneeValid) {
              if (specificErrorsEnabled) {
                return Promise.reject(translations['tasks.addATask.assigneeDoesntExist']);
              }
              return false;
            }
          }

          return true;
        },
        generateConfig: async ({
          actionComponentInfo,
        }): Promise<string> => {
          return JSON.stringify({
            ...INITIAL_ACTION_CONFIG,
            ...actionComponentInfo,
          });
        },
      },
    },
  } as any;
};

const assigneeExists = async (assigneeId) => {
  let assignees: { userId: string }[];
  try {
    assignees = await ModuleRegistry.invoke('assignees.getAssignees');
  } catch (e) {
    assignees = [];
  }

  return !!assignees.find(assignee => assignee.userId === assigneeId);
}
