import { IPageComponentsInfo, IPageComponentInfo } from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { IState } from '../../types/store';
import { getPageComponentsInfo } from '../../selectors/pageComponentsSelectors';
import { getPrefetchParams } from './getPrefetchParams';

type getMainPageComponentFilesParams = { state: IState; componentPath: string };
type ComponentFiles = Array<string>[] | string[];

const sortByRouteDescending = (comp1: IPageComponentInfo, comp2: IPageComponentInfo) =>
  comp2.route.length - comp1.route.length;

const getPageComponentsSortedByRouteLength = (pageComponentsInfo: IPageComponentsInfo): IPageComponentInfo[] =>
  Object.values(pageComponentsInfo).sort(sortByRouteDescending);

const getPageComponentInfoFromPath = (state: IState, componentPath: string): IPageComponentInfo => {
  const pageComponentsInfo = getPageComponentsInfo(state);

  return getPageComponentsSortedByRouteLength(pageComponentsInfo)
    .find(pageComponentInfo => componentPath.startsWith(pageComponentInfo.route));
};

const getLazyPageComponentFiles = (pageComponentInfo: IPageComponentInfo, state: IState): any[] => {
  const LazyComponent = ModuleRegistry.component(pageComponentInfo.pageComponentName);
  if (LazyComponent && LazyComponent.prefetch) {
    return LazyComponent.prefetch(getPrefetchParams(state, pageComponentInfo));
  }
  return [];
};

export const getMainPageComponentFiles = ({ state, componentPath }: getMainPageComponentFilesParams): ComponentFiles => {
  const pageComponentInfo = getPageComponentInfoFromPath(state, componentPath);
  return pageComponentInfo ? getLazyPageComponentFiles(pageComponentInfo, state) : [];
};
