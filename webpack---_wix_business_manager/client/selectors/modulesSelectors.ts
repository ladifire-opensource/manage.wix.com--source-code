import { ModuleId } from '@wix/business-manager-api';
import { IState } from '../types/store';
import { ModulesInfo, ModuleInfo } from '../../server/config/configuration-types';

export function getModulesInfo(state: IState): ModulesInfo {
  return state.modulesInfo;
}

export function getModuleInfo(state: IState, moduleId: ModuleId): ModuleInfo {
  const modulesInfo = getModulesInfo(state);
  return modulesInfo[moduleId];
}

export function shouldUseHomeAsLandingPage(state: IState, appDefId: string): boolean {
  const modulesInfo = getModulesInfo(state);
  const moduleInfo = Object.values(modulesInfo).find(m => m.appDefId === appDefId);

  return !!(moduleInfo && moduleInfo.useHomeAsLandingPage);
}

export const getModuleByAppDefId = (state: IState, appDefId: string): ModuleInfo =>
  Object.values(getModulesInfo(state)).find(module => module.appDefId === appDefId);

export function getModuleConfig(state: IState, moduleId: ModuleId): any {
  const moduleInfo: ModuleInfo = getModuleInfo(state, moduleId);
  return moduleInfo && moduleInfo.config;
}

export function getModuleAppDefId(state: IState, moduleId: ModuleId): string {
  const moduleInfo: ModuleInfo = getModuleInfo(state, moduleId);
  return moduleInfo && moduleInfo.appDefId;
}
