import { ModuleRegistry } from 'react-module-container';
import { IState } from '../types/store';
import { Store } from 'redux';
import { getEmbeddedServiceById } from '../selectors/embeddedServicesSelectors';
import { fetchEmbeddedService, fetchEmbeddedServicesSuccess } from '../actions/embeddedServicesActions';
import { IEmbeddedServicesMap } from '../../common/types/embedded-services';
import {
  GET_CURRENT_INSTANCE_METHOD_NAME,
  REGISTER_TO_INTANCE_CHANGE_METHOD_NAME,
  REFRESH_INSTANCE_METHOD_NAME,
  appDefIds
} from '@wix/business-manager-api';
import { getIsDebug } from '../selectors/isDebugSelectors';
import { getSentry } from './essentials';
import {
  FALLBACK_INSTANCES_EXPIRATION_MARGIN_MS,
  MINIMUM_REFRESH_TIMEOUT
} from '../../common/consts/instancesExpiration';
import { getModuleByAppDefId } from '../selectors/modulesSelectors';
import * as Sentry from '@sentry/browser';
import { fetchEmbeddedServicesWithExpiration } from './fetchEmbeddedServicesWithExpiration';

export const SET_TIMEOUT_MAX_LIMIT = Math.pow(2, 31) - 1;

type AppDefToInstance = {
  [appDef: string]: string
};

let timer;
export const initInstancesHandler = (store: Store<IState>, instancesExpirationTimeout) => {
  registerGetCurrentInstance(store);
  registerListenToInstanceChanges();
  registerRefreshInstance(store);
  startInstancesRefreshTimer(instancesExpirationTimeout, store);
};

const registerGetCurrentInstance = (store: Store<IState>) => {
  ModuleRegistry.registerMethod(GET_CURRENT_INSTANCE_METHOD_NAME, () =>
    (appDefId: string) => {
      const state = store.getState();
      const appInstance = getEmbeddedServiceById(state, appDefId).instance;
      if (appInstance) {
        return appInstance;
      } else {
        const module = getModuleByAppDefId(state, appDefId);
        if ( module && module.isCoreService) {
          return getEmbeddedServiceById(state, appDefIds.metaSite).instance;
        }
      }
    });
};

const registerRefreshInstance = (store: Store<IState>) => {
  ModuleRegistry.registerMethod(REFRESH_INSTANCE_METHOD_NAME, () => async (appDefId: string): Promise<string> => {
    const res = await store.dispatch(fetchEmbeddedService(appDefId));
    return res.instance;
  });
};

export const startInstancesRefreshTimer = (responseInstancesExpirationTimeout: number = 0, store) => {

  const timeout = getValidatedTimeout(responseInstancesExpirationTimeout);

  if (getIsDebug(store.getState())) {
    console.log(`Setting timeout for refreshing instances in ${new Date(Date.now() + responseInstancesExpirationTimeout)}`); //tslint:disable-line:no-console
  }

  timer = setTimeout(async () => {
    let newTimeout = responseInstancesExpirationTimeout;
    try {
      const {
        instancesExpirationTimeout,
        embeddedServices
      } = await fetchEmbeddedServicesWithExpiration(store.getState());
      newTimeout = instancesExpirationTimeout;
      store.dispatch(fetchEmbeddedServicesSuccess(embeddedServices));
      notifyAboutInstanceRefresh(embeddedServices);
    } catch (error) {
      if (window['Sentry']) {
        Sentry.captureException(error);
      }
    }
    startInstancesRefreshTimer(newTimeout, store);
  }, timeout);
};

const notifyAboutInstanceRefresh = (embeddedServices: IEmbeddedServicesMap) => {
  const instances: AppDefToInstance = Object.keys(embeddedServices).reduce((acc, appDefId) => (
    { ...acc, [appDefId]: embeddedServices[appDefId].instance }), {});
  ModuleRegistry.notifyListeners('businessManager.onInstancesRefresh', instances);
};

const registerListenToInstanceChanges = () => {
  const listenToInstanceChanges = (appDefId, handler): { remove: Function } => {
    const listener = ModuleRegistry.addListener('businessManager.onInstancesRefresh', (instances: AppDefToInstance) => {
      if (instances[appDefId]) {
        handler(instances[appDefId]);
      }
    });
    return listener;
  };
  ModuleRegistry.registerMethod(REGISTER_TO_INTANCE_CHANGE_METHOD_NAME, () => listenToInstanceChanges);
};

export const clearInstancesRefreshTimer = () => clearTimeout(timer);

const getValidatedTimeout = (timeout: number): number => {
  if (isTimeoutInvalid(timeout)) {
    getSentry().captureMessage(`Invalid instances expiration timeout: ${timeout}`);
    return FALLBACK_INSTANCES_EXPIRATION_MARGIN_MS;
  }
  return timeout;
};

export const isTimeoutInvalid = (timeout: number) => (
  isNaN(timeout) ||
  timeout < MINIMUM_REFRESH_TIMEOUT ||
  timeout > SET_TIMEOUT_MAX_LIMIT
);
