import { ToastId } from '../../types/toasts';
import {
  ToastType,
  ToastPriority,
  ToastScope,
  ToastActionUiType,
  ToastConfig,
  ShowToast,
  isExternalNavigationTarget,
  isInternalNavigationTarget,
  ToastTimeout
} from '@wix/business-manager-api';

export const DEFAULT_TOAST_TIMEOUT = ToastTimeout.NORMAL;

let currentId = 0;
const generateToastId = (): ToastId => {
  const id = currentId;
  currentId += 1;
  return id.toString();
};

const toastDefaults = {
  timeout: DEFAULT_TOAST_TIMEOUT,
  type: ToastType.STANDARD,
  priority: ToastPriority.NORMAL,
  scope: ToastScope.APP,
};

const actionDefaults = {
  uiType: ToastActionUiType.BUTTON,
  removeToastOnClick: true,
  onClick: null,
  navigationTarget: null
};

const externalNavigationTargetDefaults = {
  openInNewTab: true
};

const applyDefaults = (toastConfig: ToastConfig): ToastConfig => {
  const toastConfigWithDefaults = { ...toastDefaults, ...toastConfig };
  const { action } = toastConfig;

  if (action) {
    toastConfigWithDefaults.action = { ...actionDefaults, ...action };

    const { navigationTarget } = action;
    if (navigationTarget && isExternalNavigationTarget(navigationTarget)) {
      toastConfigWithDefaults.action.navigationTarget = {
        ...externalNavigationTargetDefaults,
        ...navigationTarget
      };
    }
  }

  return toastConfigWithDefaults;
};
const validateToastConfig = (config: ToastConfig) => {
  const { action, biName } = config;
  if (!biName) {
    throw new Error('Missing mandatory field: `biName');
  }
  if (action) {
    const { text, navigationTarget } = action;
    if (!text) {
      throw new Error('Missing mandatory action property: `action.text` while `action` is not null');
    }
    if (navigationTarget && !(isExternalNavigationTarget(navigationTarget) || isInternalNavigationTarget(navigationTarget))) {
      throw new Error(`Invalid action.navigationTarget`);
    }
  }
};

export const createShowToast = (showToast, removeToast): ShowToast => {
  return (toastConfig: ToastConfig) => {
    validateToastConfig(toastConfig);
    const id = generateToastId();
    showToast(id, applyDefaults(toastConfig));
    return {
      remove: () => removeToast(id)
    };
  };
};
