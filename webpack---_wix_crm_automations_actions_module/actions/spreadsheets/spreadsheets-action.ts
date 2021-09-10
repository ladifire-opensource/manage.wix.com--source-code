import Experiments from '@wix/wix-experiments';
import {
  configModule,
  ModuleId,
  getCurrentInstance,
  appDefIds,
  TModuleParams,
} from '@wix/business-manager-api';
import axios from 'axios';
import { SPREADSHEETS_ACTION_LAZY_COMPONENT } from './spreadsheets-lazy-component';

export const AUTOMATION_SPREADSHEETS_PROVIDER_ID =
  '0fee5632-ecf4-4626-82de-bec991733419';
export const ACTION_NAME = 'spreadsheets-action';

export enum SpreadsheetConfigError {
  AUTH_ERROR = 'auth_error',
  MISSING_SPREADSHEET = 'missing_spreadsheet',
  MISSING_HEADERS = 'missing_headers',
  MISSING_SHEET = 'missing_sheet',
}

export const registerSpreadsheetsAction = async (
  moduleParams: TModuleParams,
  experiments: Experiments,
) => {
  const withSpreadsheetsAction = experiments.enabled(
    'specs.crm.AutomationsSpreadsheetsAction',
  );
  const isSpecificErrorsEnabled = experiments.enabled(
    'specs.crm.AutomationsSpecificActionErrors',
  );

  if (withSpreadsheetsAction) {
    const locale = moduleParams.accountLanguage || 'en';
    const baseUrl =
      moduleParams.config.topology.automationsSpreadsheetsStaticsUrl;
    const { data: translations } = await axios.get(
      `${baseUrl}assets/locales/messages_${locale}.json`,
    );

    configModule(ModuleId.Automations, ModuleId.Triggers, {
      appDefId: AUTOMATION_SPREADSHEETS_PROVIDER_ID,
      actions: {
        [ACTION_NAME]: {
          displayName: translations['spreadsheets_action.display_name'],
          displayInfo: translations['spreadsheets_action.display_info'],
          componentName: SPREADSHEETS_ACTION_LAZY_COMPONENT,
          verifyConfig: async ({ actionConfig }) => {
            try {
              await axios.post(
                '/automations-spreadsheets-app/api/config/verify',
                { actionConfig: JSON.parse(actionConfig || '{}') },
                {
                  headers: {
                    authorization: getCurrentInstance(appDefIds.metaSite),
                  },
                },
              );

              return true;
            } catch (error) {
              const errorName = error?.response?.data?.error;

              return isSpecificErrorsEnabled &&
                errorName &&
                Object.values(SpreadsheetConfigError).includes(errorName)
                ? Promise.reject(translations[`config.error.${errorName}`])
                : false;
            }
          },
        },
      },
    });
  }
};
