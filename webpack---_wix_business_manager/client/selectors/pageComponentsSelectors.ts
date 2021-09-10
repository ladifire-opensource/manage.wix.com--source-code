import { IState } from '../types/store';
import { first } from 'lodash';
import { IPageComponentInfo, IPageComponentsInfo, PageComponentId } from '@wix/business-manager-api';

export function getPageComponentsInfo(state: IState): IPageComponentsInfo {
  return state.pageComponentsInfo;
}

export function getPageComponentInfoByAppDefId(state: IState, appDefId: string): IPageComponentInfo {
  const appComponents = Object
    .keys(state.pageComponentsInfo)
    .map(pageComponentId => state.pageComponentsInfo[pageComponentId])
    .filter(pageComponent => pageComponent.appDefId === appDefId);
  return appComponents.find((pageComponentInfo) => pageComponentInfo.isMain) || first(appComponents);
}

export function getPageComponentInfo(state: IState, pageComponentId: PageComponentId): IPageComponentInfo {
  return getPageComponentsInfo(state)[pageComponentId];
}
