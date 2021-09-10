import { getModule, ModuleId } from '@wix/business-manager-api';

export const getModuleParams = () =>
  (getModule(ModuleId.InboxKeyboards) as any).moduleParams;
