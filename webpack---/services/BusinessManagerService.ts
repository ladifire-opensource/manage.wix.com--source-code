import { ModuleRegistry } from 'react-module-container';
import {
  ModuleId,
  getModule,
  TModuleParams,
  PageComponentId,
  getCurrentInstance,
} from '@wix/business-manager-api';
import _get from 'lodash/get';
import { defaultReferralInfo } from './biLogger/biConstants';

let currentViewId = '';
let currentSubViewId = '';
const defaultInboxAppDef = '141fbfae-511e-6817-c9f0-48993a7547d1';

ModuleRegistry.addListener(
  'businessManager.viewFinishedLoading',
  (subViewId) => (currentSubViewId = subViewId),
);
ModuleRegistry.addListener(
  'businessManager.pageComponentWillMount',
  (pageComponentId: string, appDefId: string) =>
    (currentViewId = appDefId || pageComponentId),
);

export const getCurrentView = () => currentViewId;

export const getCurrentSubView = () => currentSubViewId;

const getModuleParams = (): TModuleParams =>
  _get(getModule(ModuleId.Engage), 'moduleParams');

export const getMetasiteId = () => _get(getModuleParams(), 'metaSiteId');

export const getInstance = () => {
  // in site-less mode (dashboard site-list for example - there is no BM instance)
  if (ModuleRegistry.registeredMethods['businessManager.getCurrentInstance']) {
    return getCurrentInstance(getAppDefId());
  }
};

export const getInstanceId = () => _get(getModuleParams(), 'instanceId');

export const getAppDefId = () =>
  _get(ModuleRegistry, 'modules.ENGAGE.appDefId') ?? defaultInboxAppDef;

export const navigateToChatroom = (
  chatRoomId: string,
  referralInfo: string = defaultReferralInfo,
) => {
  const appId = 'Engage';
  const appDefId = PageComponentId[appId] || appId;
  return ModuleRegistry.invoke('businessManager.navigateTo', {
    pageComponentId: appDefId,
    contextData: { referrer: referralInfo, appState: chatRoomId },
  });
};

export const navigateToInbox = () => navigateToChatroom(undefined);

export const navigateToInboxSettings = () => {
  const appId = 'InboxSettings';
  const appDefId = PageComponentId[appId] || appId;
  return ModuleRegistry.invoke('businessManager.navigateTo', {
    pageComponentId: appDefId,
  });
};
export const redirectToChatroomOnDifferentSite = (
  instanceId: string,
  chatRoomId: string,
): void => {
  const appDefId = getAppDefId();
  const redirectionUrl = `/dashboard/external?appDefId=${appDefId}&instanceId=${instanceId}&referralInfo=${defaultReferralInfo}#/${chatRoomId}`;
  window.location.href = redirectionUrl;
};
