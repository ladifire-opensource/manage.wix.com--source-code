import { INavigateToPageConfig, ModuleId, PageComponentId, TModuleParams } from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { AppDefId } from '../types/client/AppDefId';

export const COMPONENT_ID = 'cashier-merchant-settings-component-id' as PageComponentId;
export const BI_VIEW_ID = 'cashier-main-view';
// ATM of writing Hotels has not its own BM module and ModuleId as result
export const HARDCODED_Hotels_ModuleId = 'HOTELS' as ModuleId;

// Note: should be in sync with the /templates/module_CASHIER.json.erb "config" prop
export interface ERBConfig {
  topology: {
    cashierStaticsUrl: string;
    paymentsDashboardStaticsUrl: string;
    reactDealerViewerStaticsUrl: string;
    dealerCmsTranslationsStaticsUrl: string;
    wixPaymentsOnboardingStaticsUrl: string;
    wixPaymentsDashboardStaticsUrl: string;
  };
}

export interface BMModuleParams extends TModuleParams {
  config: ERBConfig;
}

export interface ExperimentsBag {
  [experimentName: string]: 'true' | 'false';
}

export interface OrderPageNavigation {
  isNavigationAllowed(appId: AppDefId): boolean;
  navigate(transaction): void;
}

export interface UnsupportedVerticals {
  getAppTitle(sourceModule: ModuleId): Promise<string>;
  getModuleIds(): ModuleId[];
  exist(): boolean;
  getPageLink(sourceModule: ModuleId): string;
  navigateToSettings(sourceModule: ModuleId): void;
}

export interface ModuleConfig {
  cashierInstanceId: string;
  orderPageNavigation: OrderPageNavigation;
  unsupportedVerticals: UnsupportedVerticals;
}

export interface UnsupportedVerticalsConfig {
  [moduleId: string]: {
    appTitle?: string;
    fetchAppTitle?(): Promise<string>;
    navigateToSettingsConfig: INavigateToPageConfig;
  };
}

export interface OrderPageConfig {
  [appDefId: string]: {
    buildNavigateToOrderConfig(verticalOrderId: string): INavigateToPageConfig;
  };
}

export interface CreateModuleConfigParams {
  cashierInstanceId: string;
  orderPageConfig: OrderPageConfig;
  unsupportedVerticalsConfig: UnsupportedVerticalsConfig;
}

export const createModuleConfig = (initialData: CreateModuleConfigParams): ModuleConfig => {
  const { cashierInstanceId, orderPageConfig, unsupportedVerticalsConfig } = initialData;

  const moduleConfig: ModuleConfig = {
    cashierInstanceId,
    orderPageNavigation: {
      isNavigationAllowed: (appId: AppDefId) => orderPageConfig.hasOwnProperty(appId),

      navigate: transaction => {
        if (moduleConfig.orderPageNavigation.isNavigationAllowed(transaction.appId)) {
          const { buildNavigateToOrderConfig } = orderPageConfig[transaction.appId];
          const navigateConfig = buildNavigateToOrderConfig(transaction.verticalOrderId);

          ModuleRegistry.invoke('businessManager.navigateTo', navigateConfig);
        }
      },
    },

    unsupportedVerticals: {
      getModuleIds: () => Object.keys(unsupportedVerticalsConfig) as ModuleId[],
      exist: () => moduleConfig.unsupportedVerticals.getModuleIds().length > 0,
      getAppTitle: (moduleId: ModuleId) => unsupportedVerticalsConfig[moduleId].fetchAppTitle(),
      getPageLink: (sourceModule: ModuleId) => {
        const { navigateToSettingsConfig } = unsupportedVerticalsConfig[sourceModule];

        return ModuleRegistry.invoke(
          'businessManager.buildPageComponentLink',
          navigateToSettingsConfig.pageComponentId,
          navigateToSettingsConfig.contextData,
        );
      },
      navigateToSettings: (sourceModule: ModuleId) => {
        const { navigateToSettingsConfig } = unsupportedVerticalsConfig[sourceModule];

        ModuleRegistry.invoke('businessManager.navigateTo', navigateToSettingsConfig);
      },
    },
  };

  return moduleConfig;
};
