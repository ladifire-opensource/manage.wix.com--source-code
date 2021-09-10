import * as React from 'react';

export const withModuleParams = (Comp) => {
  const ModuleRegistry = window.ModuleRegistry;
  const moduleParams = ModuleRegistry.getModule('ENGAGE').moduleParams;
  return (props) => <Comp {...props} {...moduleParams} />;
};
