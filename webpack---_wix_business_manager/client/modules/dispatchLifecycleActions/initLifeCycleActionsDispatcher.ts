import { Store } from 'redux';
import { IState } from '../../types/store';
import { moduleChanged } from '../../actions/lifecycleActions';
import { ModuleRegistry } from 'react-module-container';
import { getPageComponentInfo } from '../../selectors/pageComponentsSelectors';
import { ModuleId, PageComponentId } from '@wix/business-manager-api';

const createHasModuleChanged = () => {
  let previousModuleId = null;

  return (newModuleId: ModuleId) => {
    const moduleIdChanged = previousModuleId !== newModuleId;
    const firstTime = previousModuleId === null;

    previousModuleId = newModuleId;

    return !firstTime && moduleIdChanged;
  };
};

export const initLifeCycleActionsDispatcher = (store: Store<IState>) => {
  const hasModuleChanged = createHasModuleChanged();

  ModuleRegistry.addListener('businessManager.pageComponentDidMount', (pageComponentId: PageComponentId) => {
    const { moduleId } = getPageComponentInfo(store.getState(), pageComponentId);
    if (hasModuleChanged(moduleId)) {
      store.dispatch(moduleChanged());
    }
  });
};
