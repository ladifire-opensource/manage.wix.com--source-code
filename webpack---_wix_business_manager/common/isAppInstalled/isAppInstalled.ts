import { IEmbeddedService, IEmbeddedServicesMap } from '../types/embedded-services';
import { nonTPAs } from '../consts/nonTpas';
import Experiments from '@wix/wix-experiments';
import { EmbeddedServicesState } from '../../server/types/rpc';

export type ModuleInstallationData = {
  appDefId?: string,
  isCoreService?: boolean
};

export const buildAppToCoreService = (experiments: Experiments, modules: Array<ModuleInstallationData>): AppToCoreService => {
  return modules.reduce((acc: AppToCoreService, module) => {
    return module.appDefId ? { ...acc, [module.appDefId]: module.isCoreService } : acc;
  }, {});
};

export type AppToCoreService = {
  [appDefId: string]: boolean
};

export function isAppInstalled(appDefId: string, embeddedServices: IEmbeddedServicesMap, appToCoreService: AppToCoreService): boolean {
  if (nonTPAs.includes(appDefId)) {
    return !!embeddedServices[appDefId];
  }
  if (appToCoreService[appDefId]) {
    return true;
  }

  const embeddedService = embeddedServices && embeddedServices[appDefId];
  return !!(embeddedService && embeddedService.installedAtDashboard && !isStub(embeddedService));
}

const isStub = (embeddedService: IEmbeddedService) => embeddedService.state === EmbeddedServicesState.Stub;
