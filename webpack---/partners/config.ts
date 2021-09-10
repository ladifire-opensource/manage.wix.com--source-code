import {
  ModuleId,
  PageComponentId,
  TModuleParams,
} from '@wix/business-manager-api';

// Note: after submitting PR to BM you can replace the constant strings below
// Note: should be in sync with the config inside your BM module ERB
export const MODULE_ID = /* ModuleId.BizmgrTemp*/ 'PARTNERS_TEAM' as ModuleId;
export const COMPONENT_NAME =
  /* PageComponentId.BizmgrTemp*/ 'partners-team' as PageComponentId;
export const ROUTE = 'team';

export interface IERBConfig {
  topology: {
    staticsUrl: string;
    transferSiteDialogTranslationsStaticsUrl: string;
    transferSiteDialogClientStaticsUrl: string;
  };
}

export interface IBMModuleParams extends TModuleParams {
  locale: string;
  config: IERBConfig;
}

declare global {
  interface Window {
    __BASEURL__: string;
  }
}
