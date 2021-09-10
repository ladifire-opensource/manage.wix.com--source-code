import * as React from 'react';
import { ModuleId } from '@wix/business-manager-api';

export const withModuleParams = (Comp) => {
  const ModuleRegistry = window.ModuleRegistry;
  const moduleParams = ModuleRegistry.getModule(ModuleId.Contacts).moduleParams;
  return (props) => <Comp {...props} {...moduleParams} />;
};
