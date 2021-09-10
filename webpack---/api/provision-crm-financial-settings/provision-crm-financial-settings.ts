import {
  getCurrentInstance,
  isAppInstalled,
  provisionApp,
  refreshInstance,
  appDefIds
} from '@wix/business-manager-api';

export const provisionCrmFinancialSettingsIfNeeded = async () => {
  if (!isAppInstalled(appDefIds.crmFinancialSettings)) {
    return provisionApp(appDefIds.crmFinancialSettings);
  }
};

export const getCrmFinancialSettingsInstance = async () => {
  if (isAppInstalled(appDefIds.crmFinancialSettings)) {
    return getCurrentInstance(appDefIds.crmFinancialSettings);
  }
  return refreshInstance(appDefIds.crmFinancialSettings);
};
