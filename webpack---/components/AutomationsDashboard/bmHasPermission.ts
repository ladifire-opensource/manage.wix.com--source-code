import { ModuleRegistry } from 'react-module-container';
import { TModuleParams } from '@wix/business-manager-api';

export const hasPermission = () => {
  const moduleParams = ModuleRegistry.getModule('TRIGGERS').moduleParams as TModuleParams;
  return moduleParams.userPermissions.map(p => p.toLowerCase()).includes('smart_actions.manage_action');
};
