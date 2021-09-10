import { IState } from '../types/store';
import { getModulesInfo } from './modulesSelectors';

export function getComponents(state: IState) {
  return Object.values(getModulesInfo(state)).flatMap(moduleInfo => moduleInfo.components || []);
}

export function getComponentsByHostContainerId(state: IState, hostContainerId: string) {
  return getComponents(state).filter(component => component.hostContainerId === hostContainerId);
}

export function getComponentAppDefId(state: IState, componentId: string) {
  return Object.values(getModulesInfo(state)).find(module => module.components.some(comp => comp.componentId === componentId))?.appDefId;
}
