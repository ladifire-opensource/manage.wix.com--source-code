import { connect } from 'react-redux';
import * as React from 'react';
import { ModuleRegistry } from 'react-module-container';
import { buildMapStateToPageComponentProps } from './buildMapStateToPageComponentProps/buildMapStateToPageComponentProps';
import { withPerfLogger } from './withPerfLogger/withPerfLogger';
import withHybridAppToast from './withHybridAppToast/HybridAppToast.container';
import { IPageComponentsInfo, IPageComponentInfo } from '@wix/business-manager-api';
import { withPageComponentLifecycleEvents } from './pageComponentLifecycle/withPageComponentLifecycleEvents';
import { IPageComponent } from './IPageComponent';
import { withLoadingIndicator } from './withLoadingIndicator/withLoadingIndicator';
import { ModulesInfo, ModuleInfo } from '../../server/config/configuration-types';
import { withAppMonitor } from './withAppMonitor/withAppMonitor';
import { withErrorBoundary } from '@wix/business-manager-common-utils';
import { IState } from '../types/store';
import { hasLiveSite } from '../selectors/liveSiteSelectors';
import { getPageComponentsInfo } from '../selectors/pageComponentsSelectors';
import { getModulesInfo } from '../selectors/modulesSelectors';
import { BrokenComponentErrorPage, UndefinedComponentErrorPage } from '../components/ErrorPages/ErrorPages';
import { experimentsSelectors } from '../services/essentials';
import { SuperLazy } from './deferredModuleScriptsPoc/SuperLazy';

export const buildPageComponents = (
  state: IState,
  pageComponentsInfo: IPageComponentsInfo = getPageComponentsInfo(state),
  modulesInfo: ModulesInfo = getModulesInfo(state)
): IPageComponent[] => {
  return Object.keys(pageComponentsInfo)
    .map(pageComponentId => pageComponentsInfo[pageComponentId])
    .filter((pageComponentInfo: IPageComponentInfo) => pageComponentInfo.isEnabled)
    .sort(sortByRouteDescending)
    .map((pageComponentInfo: IPageComponentInfo) => ({
      route: pageComponentInfo.route,
      component: buildPageComponent(state, pageComponentInfo, modulesInfo[pageComponentInfo.moduleId])
    }));
};

const sortByRouteDescending = (comp1: IPageComponentInfo, comp2: IPageComponentInfo) => comp2.route.length - comp1.route.length;

function buildPageComponent(state: IState, pageComponentInfo: IPageComponentInfo, moduleInfo: ModuleInfo) {
  let component;

  if (experimentsSelectors(state).enabled('specs.wosbm.DeferredModuleScriptsPoc')) {
    component = (props) => <SuperLazy {...props} componentName={pageComponentInfo.pageComponentName}/>;
  } else {
    try {
      component = ModuleRegistry.component(pageComponentInfo.pageComponentName);
    } catch (e) {
      // "Eat" the exception to avoid breaking the business manager
    }
  }

  return component ?
    (
      wrapWithErrorBoundary(
        wrapWithLoadingIndicator(
          wrapWithAppMonitor(
            wrapWithPageComponentLifecycleEvents(
              wrapWithHybridAppToast(
                wrapWithPerfLogger(
                  wrapWithProps(component)
                )
              )
            )
          )
        )
      )
    ) : UndefinedComponentErrorPage;

  function wrapWithLoadingIndicator(componentToWrap) {
    return withLoadingIndicator(componentToWrap);
  }

  function wrapWithErrorBoundary(componentToWrap) {
    const ErrorComponent = () => <BrokenComponentErrorPage location="business-manager-app"/>;
    return withErrorBoundary(ErrorComponent)(componentToWrap);
  }

  function wrapWithProps(componentToWrap) {
    const mapStateToModuleProps = buildMapStateToPageComponentProps(pageComponentInfo.appDefId, moduleInfo && moduleInfo.config);
    const mergeProps = (stateProps, dispatchProps, ownProps) => {
      return { ...stateProps, router: ownProps.router };
    };

    return connect(mapStateToModuleProps, null, mergeProps)(componentToWrap);
  }

  function wrapWithPageComponentLifecycleEvents(componentToWrap) {
    return withPageComponentLifecycleEvents(componentToWrap, pageComponentInfo.pageComponentId, pageComponentInfo.appDefId);
  }

  function wrapWithPerfLogger(componentToWrap) {
    return withPerfLogger(componentToWrap, pageComponentInfo.pageComponentId);
  }

  function wrapWithAppMonitor(componentToWrap) {
    return withAppMonitor({
      WrappedComponent: componentToWrap,
      pageComponentName: pageComponentInfo.pageComponentName,
      pageComponentId: pageComponentInfo.pageComponentId
    });
  }

  function wrapWithHybridAppToast(componentToWrap) {
    const requiresToastCheck = pageComponentInfo.appDefId && hasLiveSite(state);
    return requiresToastCheck ?
      withHybridAppToast(componentToWrap, pageComponentInfo.appDefId) :
      componentToWrap;
  }
}
