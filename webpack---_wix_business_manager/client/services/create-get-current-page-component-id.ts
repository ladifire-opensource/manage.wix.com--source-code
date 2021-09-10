import { ModuleRegistry } from 'react-module-container';

export const createGetCurrentPageComponentId = () => {
  let currentPageComponentId: string = null;

  ModuleRegistry.addListener('businessManager.pageComponentDidMount', pageComponentId => currentPageComponentId = pageComponentId);

  return () => currentPageComponentId;
};
