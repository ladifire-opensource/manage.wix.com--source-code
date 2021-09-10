import React, { memo, useCallback, useState } from 'react';
import { ModuleRegistry } from 'react-module-container';
import { ModuleRegistryEvents } from '@components/widget/widget-loader/constants';
import { DashboardWidget, WidgetComponentClass } from '@types';
import { isComponentLoadingError } from './widget-loader-failure-check';
import { WidgetLoaderComponent } from './widget-loader.component';
import { OnVisibleParams } from '@wix/os-dashboard-shared-components';

export interface Props {
  componentName: string;
  Component: WidgetComponentClass;
  onLoaded: () => void;
  config: DashboardWidget;
  showSkeleton: boolean;
  dataHook: string;
  onComponentVisible: (params: OnVisibleParams) => void;
}

interface State {
  loading: boolean;
  failedToLoad?: boolean;
}

interface Listener {
  remove: () => void;
}
export const WidgetLoader: React.FC<Props> = memo(
  ({ Component, componentName, config, showSkeleton, dataHook, onLoaded, onComponentVisible }) => {
    const [state, setState] = useState<State>({ loading: true });
    const [componentStartedLoadingListener, setComponentStartedLoadingListener] =
      useState<Listener>();

    const removeComponentStartedLoadingListener: (() => void) | undefined =
      componentStartedLoadingListener?.remove;
    let removeComponentFailedToLoadListener: () => void;

    const onComponentStartedLoading = (name: string) => {
      if (name !== componentName) {
        return;
      }

      // eslint-disable-next-line no-unused-expressions
      removeComponentStartedLoadingListener?.();
      const componentFailedToLoadListener = ModuleRegistry.addListener(
        ModuleRegistryEvents.FailedToLoad,
        onComponentFailedLoading,
      );
      removeComponentFailedToLoadListener = componentFailedToLoadListener.remove;
    };

    if (!componentStartedLoadingListener) {
      setComponentStartedLoadingListener(
        ModuleRegistry.addListener(ModuleRegistryEvents.StartLoading, onComponentStartedLoading),
      );
    }

    const onComponentLoaded = useCallback(() => {
      if (!state.loading) {
        return;
      }

      setState({ loading: false });
      removeComponentFailedToLoadListener && removeComponentFailedToLoadListener();
      onLoaded();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onComponentFailedLoading = useCallback(
      (error: Error) => {
        if (!isComponentLoadingError(error, componentName)) {
          return;
        }

        setState({ loading: false, failedToLoad: true });
        removeComponentFailedToLoadListener && removeComponentFailedToLoadListener();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [componentName],
    );

    return (
      <WidgetLoaderComponent
        onComponentLoaded={onComponentLoaded}
        componentName={componentName}
        Component={Component}
        loading={state.loading}
        failedToLoad={state.failedToLoad}
        showSkeleton={showSkeleton}
        dataHook={dataHook}
        config={config}
        onComponentVisible={onComponentVisible}
      />
    );
  },
);
