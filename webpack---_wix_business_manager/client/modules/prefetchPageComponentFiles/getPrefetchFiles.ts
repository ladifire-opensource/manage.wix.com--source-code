import { IState } from '../../types/store';
import { IPageComponentInfo } from '@wix/business-manager-api';
import { getPrefetchParams } from './getPrefetchParams';
import { ModuleRegistry } from 'react-module-container';
import { modulePriorities } from './prefetchPriorities';

export function getPrefetchFiles(state: IState, priorities = modulePriorities): string[] {
  const getPriority = (pageInfo: IPageComponentInfo): number => {
    const priority = priorities.indexOf(pageInfo.moduleId);
    const hasPriority = priority !== -1;
    return hasPriority ? priority : priorities.length;
  };
  const byPriorities = (infoA: IPageComponentInfo, infoB: IPageComponentInfo): number => {
    const AFirst = -1;
    const BFirst = 1;
    if (infoA.isMain === infoB.isMain) {
      return getPriority(infoA) < getPriority(infoB) ? AFirst : BFirst;
    }
    return infoA.isMain ? AFirst : BFirst;
  };

  function appendComponentFiles(info: IPageComponentInfo) {
    const prefetchParams = getPrefetchParams(state, info);
    const component = ModuleRegistry.component(info.pageComponentName);
    if (component && component.prefetch) {
      return (component.prefetch as Function)(prefetchParams);
    }
    return null;
  }

  return Object.values(state.pageComponentsInfo)
    .sort(byPriorities)
    .map(appendComponentFiles)
    .filter(item => !!item);
}
