import {
  experimentsSelectors as _experimentsSelectors,
  experimentsReducer as _experimentsReducer
} from '@wix/wix-experiments-redux';
import { IState } from '../types/store';
import Experiments from '@wix/wix-experiments';
import { create as _createFedopsLogger } from '@wix/fedops-logger';
import * as Sentry from '@sentry/browser';
import biLogger from '@wix/web-bi-logger';
import { AppEssentials } from '@wix/fe-essentials-business-manager';
import { BusinessManagerModule } from '@wix/business-manager-api';
import { getModuleAppDefId, getModuleConfig } from '../selectors/modulesSelectors';
import { buildModuleParams } from '../modules/buildMapStateToPageComponentProps/buildModuleParams';

export const shouldUseEssentials = () => !!window['BMEssentials'];

type EssentialsModule = typeof import('@wix/fe-essentials-business-manager');

function importEssentials() {
  return (require('@wix/fe-essentials-business-manager') as EssentialsModule);
}

export const createAppEssentials = (module: BusinessManagerModule, state: IState): AppEssentials | undefined => {
  const moduleConfigurationId = module.moduleConfigurationId || module.moduleId;

  const appDefId = getModuleAppDefId(state, moduleConfigurationId);

  if (!appDefId) {
    return;
  }

  const moduleParams = buildModuleParams(state, appDefId, getModuleConfig(state, moduleConfigurationId));

  return importEssentials().essentials.createAppEssentials({
    appDefId,
    instanceId: moduleParams.instanceId,
    moduleParams
  });
};

export const experimentsSelectors = (state: IState) => {
  if (shouldUseEssentials()) {
    return importEssentials().experimentsSelectors(state);
  } else {
     return _experimentsSelectors(state);
  }
};

export const experimentsReducer = (state: IState['experiments'], action) => {
  if (shouldUseEssentials()) {
    return importEssentials().experimentsReducer(state);
  } else {
     return _experimentsReducer(state, action);
  }
};

export const getExperiments = () => {
  if (shouldUseEssentials()) {
    return importEssentials().essentials.experiments;
  } else {
    const _experiments = new Experiments({ experiments: window['__INITIAL_STATE__'].experiments });
    delete window['__INITIAL_STATE__'].experiments;
    return _experiments;
  }
};

export const createFedopsLogger: typeof _createFedopsLogger = (...args) => {
  const factory =  shouldUseEssentials() ? importEssentials().essentials.createFedopsLogger : _createFedopsLogger;

  return factory(...args);
};

export const getSentry = () => shouldUseEssentials() ? importEssentials().essentials.sentry : Sentry;

export const biLoggerFactory = (options) => {
  if (shouldUseEssentials()) {
    return importEssentials().essentials.biLoggerFactory(options);
  } else {
    return biLogger.factory(options);
  }
};
