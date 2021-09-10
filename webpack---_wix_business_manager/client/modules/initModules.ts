import { getAllModules, BusinessManagerModule, ModuleId, TModuleParams } from '@wix/business-manager-api';
import { buildModuleParams } from './buildMapStateToPageComponentProps/buildModuleParams';
import { IState } from '../types/store';
import { getModuleConfig, getModuleInfo, getModuleAppDefId } from '../selectors/modulesSelectors';
import { getIsDebug } from '../selectors/isDebugSelectors';
import { experimentsSelectors, getSentry, createAppEssentials } from '../services/essentials';

export function initModules(state: IState, modules = getAllModules()): void {
  const isDebug = getIsDebug(state);

  const buildModuleMethodCaller = (
    method: string,
    {
      allowMissing = false,
      argumentFactory = getModuleParams
    }: {
      allowMissing?: boolean;
      argumentFactory?: (module: BusinessManagerModule, state: IState) => any;
    } = {}
  ) => (module: BusinessManagerModule) => {
    try {
      if (allowMissing && !module[method]) {
        return;
      }
      module[method](argumentFactory(module, state));
    } catch (error) {
      handleModuleInitError(module.moduleId, isDebug, error);
    }
  };

  const callSetModuleParams = buildModuleMethodCaller('setModuleParams', { allowMissing: true });
  const callSetAppEssentials = buildModuleMethodCaller('setAppEssentials', { allowMissing: true, argumentFactory: createAppEssentials });
  const callRegisterModule = buildModuleMethodCaller('register', { allowMissing: true });
  const callInitModule = buildModuleMethodCaller('init', { allowMissing: false });

  const allModules: BusinessManagerModule[] = modules;
  if (isDebug) {
    const warnAboutMissingConfig = module => console.warn(`ModuleInfo of ${module.moduleId} is not available.
      this probably means that you used a different 'ModuleId' in your module configuration template file than the one used to register your module`);
    allModules.filter(module => !getModuleInfo(state, module.moduleId)).forEach(warnAboutMissingConfig);
  }

  allModules.forEach(callSetModuleParams);

  const experiments = experimentsSelectors(state);

  if (experiments.enabled('specs.infra.BusinessManagerEssentials')) {
    allModules.forEach(callSetAppEssentials);
  }

  allModules.forEach(callRegisterModule);

  allModules.forEach(callInitModule);
}

const getModuleParams = (module: BusinessManagerModule, state: IState): TModuleParams => {
  const moduleConfigurationId = module.moduleConfigurationId || module.moduleId;
  return buildModuleParams(state, getModuleAppDefId(state, moduleConfigurationId), getModuleConfig(state, moduleConfigurationId));
};

const handleModuleInitError = (moduleId: ModuleId, isDebug: boolean, error: Error) => {
  if (isDebug) {
    console.error(`unable to init module ${moduleId}`); // tslint:disable-line:no-console
  }

  getSentry().captureException(error);
};
