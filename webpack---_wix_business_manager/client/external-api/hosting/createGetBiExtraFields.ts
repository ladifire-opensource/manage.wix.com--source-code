import { getMetaSiteId } from '../../selectors/siteMetaDataSelectors';
import { getViewMode } from '../../selectors/viewModeSelector';
import { getComponentAppDefId } from '../../selectors/componentsSelectors';
import { VIEW_FINISHED_LOADING, VIEW_START_LOADING } from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';

export const createGetBiExtraFields = () => {
  let appId: string;
  let subView: string;
  let hostStartLoadingTime: number;

  ModuleRegistry.addListener('businessManager.pageComponentWillMount', (pageComponentId: string, appDefId: string) => {
    appId = appDefId;
  });

  ModuleRegistry.addListener(VIEW_START_LOADING, (subViewId: string) => {
    subView = subViewId;
  });

  ModuleRegistry.addListener(VIEW_FINISHED_LOADING, (subViewId: string) => {
    subView = subViewId;
  });

  ModuleRegistry.addListener('businessManager.pageComponentStartLoading', () => {
    hostStartLoadingTime = Date.now();
  });

  return (component, state, isFinishEvent = false) => ({
    component_name: component.componentName,
    msid: getMetaSiteId(state),
    component_app_id: getComponentAppDefId(state, component.componentId),
    hosting: getViewMode(state),
    view: appId,
    sub_view: subView,
    app_id: appId,
    ...(isFinishEvent && { loading_time_from_host_load: Math.round(Date.now() - hostStartLoadingTime) })
  });
};
