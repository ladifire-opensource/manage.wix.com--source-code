import { getHostTags } from './API/hostsApi';
import { error } from './utils/logger';
import { HOST_NAMES } from './consts/consts';
import {
  getLoadErrorTags,
  getLoadedTags,
  getLoadingTags,
  calculateNewCategories,
  getConfig,
  setConfig,
} from './modules/stateCache';
import { eventNames, publishEvent } from './modules/events';
import { Category } from './types';

let initFunc = (hostName: string, language: string) => {
  if (HOST_NAMES.hasOwnProperty(hostName)) {
    getHostTags(hostName);
    setConfig({ language });
    document.addEventListener('consentPolicyChanged', (event) =>
      onHostConsentPolicyChanged(hostName, language, event),
    );
  } else {
    const errMsg = `${hostName} is not listed as a valid host`;
    error(errMsg);
    return new Error(errMsg);
  }
};

function init(hostName: string, language: string) {
  const retVal = initFunc(hostName, language);
  // Noop-ified to prevent duplicate callbacks
  initFunc = () => {
    return new Error('wixTagManager already initialised');
  };
  return retVal;
}

export function onHostConsentPolicyChanged(
  hostName: string,
  language: string,
  event: any,
) {
  if (event && event.detail && event.detail.policy) {
    const categories: Category[] = calculateNewCategories(event.detail.policy);
    if (categories.length) {
      getHostTags(hostName, categories);
    }
  }
}

const api = {
  init,
  getLoadedTags,
  getLoadingTags,
  getLoadErrorTags,
  getConfig,
  HOST_NAMES,
};

publishEvent(eventNames.TAG_MANAGER_LOADED, window as any, api);
window.wixTagManager = api;
