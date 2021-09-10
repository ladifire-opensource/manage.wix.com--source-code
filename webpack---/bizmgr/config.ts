import {
  ModuleId,
  PageComponentId,
  TModuleParams,
} from '@wix/business-manager-api';

export const MODULE_ID = /* ModuleId.BizmgrTemp*/ ModuleId.RolesAndPermissions;
export const COMPONENT_NAME =
  /* PageComponentId.BizmgrTemp*/ PageComponentId.RolesAndPermissions;
export const ROUTE = 'roles-and-permissions';

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
