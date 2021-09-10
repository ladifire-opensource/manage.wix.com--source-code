import { Store } from 'redux';
import { IState } from '../../types/store';
import { IPageComponentInfo, PageComponentId } from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { getPageComponentsInfo } from '../../selectors/pageComponentsSelectors';

export const REFRESH_APP_TYPE = 'refreshAppsOnDashboardClose';
export const BIZ_MGR_NAMESPACE = 'BusinessManager';

const getAllAppDefIds = (state: IState): Array<string> => {
  const pageComponentsInfo = getPageComponentsInfo(state);
  const appDefIds = Object.keys(pageComponentsInfo)
    .map(pageId => pageComponentsInfo[pageId])
    .filter((pageComponentInfo: IPageComponentInfo) => pageComponentInfo.isEnabled && pageComponentInfo.appDefId)
    .map((pageComponentInfo: IPageComponentInfo) => pageComponentInfo.appDefId);
  appDefIds.push('business-manager-general-info');
  return Array.from(new Set(appDefIds));
};

const sendRefreshAppMsg = (appIds: Array<string>) => {
  const message = buildMessage(REFRESH_APP_TYPE, {
    appsToRefresh: appIds
  });
  parent.postMessage(message, '*');
};

const buildMessage = (type: string, data: any): string => {
  return JSON.stringify({
    intent: 'TPA2',
    type,
    namespace: BIZ_MGR_NAMESPACE,
    data
  });
};

export const registerRefreshAppMessage  = (store: Store<IState>) => {
  ModuleRegistry.addListener('businessManager.pageComponentDidMount', (pageComponentId, appDefId) => {
    const state = store.getState();
    const appDefIds = pageComponentId === PageComponentId.Settings ? getAllAppDefIds(state) : [appDefId];
    sendRefreshAppMsg(appDefIds);
  });
};
