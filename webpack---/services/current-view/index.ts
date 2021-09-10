import { ModuleRegistry } from 'react-module-container';

let currentViewId = '';
let currentSubViewId = '';

ModuleRegistry.addListener('businessManager.viewFinishedLoading', subViewId => currentSubViewId = subViewId);
ModuleRegistry.addListener('businessManager.pageComponentWillMount', (pageComponentId: string, appDefId: string) => currentViewId = appDefId || pageComponentId);

export function getCurrentView() {
  return currentViewId;
}

export function getCurrentSubView() {
  return currentSubViewId;
}
