import {
  INavigateToPageConfig,
  IPageComponentsInfo,
  PageComponentId,
  ToastPriority,
  ToastTimeout,
  TPageLinkBuilder,
  ON_NAVIGATION
} from '@wix/business-manager-api';
import { TNavigate } from '../../modules/moduleRegistryIntegrator/navigate';
import { PayloadManager } from '../../utils/payloadManager/PayloadManager';
import { ModuleRegistry } from 'react-module-container';
import { RemoveToastActionCreator, ShowToastActionCreator } from '../../actions/toastActions';
import { createShowToast } from '../show-toast/createShowToast';

function enrichState(state: string): string {
  const payloadFlag = 'withPayload=true';

  if (state) {
    const hasQuery = state.indexOf('?') > -1;
    return hasQuery ? `${state}&${payloadFlag}` : `${state}/?${payloadFlag}`;
  }
  return `?${payloadFlag}`;
}

export interface INavigateToPageFactoryConfig {
  navigate: TNavigate;
  payloadManager: PayloadManager;
  pageComponentLinkBuilder: TPageLinkBuilder;
  pageComponentsInfo: IPageComponentsInfo;
}

type TBuildNavigateToPageConfig = (any) => INavigateToPageConfig;
type TNavigateToPageConfig = INavigateToPageConfig & INavigateToPageFactoryConfig;

const doNavigation = (navigateToConfig: TNavigateToPageConfig) => {
  const { navigate, payloadManager, pageComponentLinkBuilder, pageComponentId, payload, openInNewTab, viewId } = navigateToConfig;
  let { contextData } = navigateToConfig;
  if (payload) {
    const dataCapsuleId: string = Date.now().toString();
    payloadManager.savePayload(dataCapsuleId, payload); //tslint:disable-line:no-floating-promises
    contextData.appState = enrichState(contextData.appState);
    contextData = Object.assign({}, contextData, { dataCapsuleId });
  }
  const link: string = pageComponentLinkBuilder(pageComponentId, contextData);
  const preventOpenInNewTab: boolean = (pageComponentId === PageComponentId.Shoutout);
  if (viewId) {
    ModuleRegistry.notifyListeners('businessManager.onNavigateToPage', pageComponentId, viewId);
  }

  navigate(link, openInNewTab && !preventOpenInNewTab);
};

const buildNavigateToPageConfig: TBuildNavigateToPageConfig = args => {
  // if first parameter(rest[0]) is an object, we use the new api, otherwise, we assume the parameters are separated:
  const { moduleId } = args[0];
  let { pageComponentId, contextData, payload, openInNewTab, viewId } = args[0];

  if (moduleId && !pageComponentId) {
    pageComponentId = moduleId;
  }

  if (!pageComponentId) {
    [pageComponentId, contextData, payload, openInNewTab, viewId] = args;
  }

  return { pageComponentId, contextData, payload, openInNewTab, viewId };
};

const pauseResumeHandler = (navigate) => {
  let paused = false;

  const resume = () => {
    if (paused) {
      navigate();
    }
    paused = false;
  };

  return {
    pause: () => {
      paused = true;
      return { resume };
    },
    deprecatedResumeFunctionDoNotUse: resume,
    navigateIfNotPaused: () => {
      if (!paused) {
        navigate();
      }
    }
  };
};

export const navigateToPageFactory = (factoryConfig: INavigateToPageFactoryConfig) => {
  return (...rest) => {
    const navigateToConfig: TNavigateToPageConfig = { ...factoryConfig, ...buildNavigateToPageConfig(rest) };
    const navigate = () => doNavigation(navigateToConfig);
    const pauseResume = pauseResumeHandler(navigate);

    if (!navigateToConfig.openInNewTab) {
      ModuleRegistry.notifyListeners(ON_NAVIGATION, pauseResume.pause, pauseResume.deprecatedResumeFunctionDoNotUse);
    }

    pauseResume.navigateIfNotPaused();
  };
};

export interface IBackToastConfig {
  text: string;
  buttonText: string;
}

export const navigateToPageAndShowBackToastFactory = (navigateTo: Function, showToastActionCreator: ShowToastActionCreator, removeToastActionCreator: RemoveToastActionCreator) =>
  (to: INavigateToPageConfig, back: INavigateToPageConfig, toastConfig: IBackToastConfig) => {
    const moduleLoadedEvent = ModuleRegistry.addListener('businessManager.pageComponentDidMount', () => {
      const showToast = createShowToast(showToastActionCreator, removeToastActionCreator);
      showToast({
        message: toastConfig.text,
        biName: 'business-manager.navigate-to-back-toast',
        timeout: ToastTimeout.NONE,
        priority: ToastPriority.HIGH,
        action: {
          text: toastConfig.buttonText,
          navigationTarget: {
            navigateToConfig: back
          }
        }
      });
      moduleLoadedEvent.remove();
    });

    try {
      navigateTo(to);
    } catch (e) {
      moduleLoadedEvent.remove();
    }
  };
