import { ErrorBoundary } from '@components/error-boundary';
import { DashboardWidget, WidgetComponentClass, WidgetStatus } from '@types';
import React, { FC } from 'react';
import { WidgetLoader } from './widget-loader/widget-loader.container';
import { WIDGET_COMPONENT_DATA_HOOK } from '@consts';
import { OnVisibleParams } from '@wix/os-dashboard-shared-components';

interface Props {
  sentry: any;
  updateErrorState: () => void;
  userId: string;
  metaSiteId: string;
  bmComponentName: string;
  Component: WidgetComponentClass;
  setWidgetStatus: (widgetId: string, status: WidgetStatus) => void;
  config: DashboardWidget;
  showSkeleton: boolean;
  onComponentVisible: (params: OnVisibleParams) => void;
}

export const WidgetComponent: FC<Props> = ({
  sentry,
  updateErrorState,
  userId,
  metaSiteId,
  bmComponentName,
  Component,
  setWidgetStatus,
  config,
  showSkeleton,
  onComponentVisible,
}) => {
  const { widgetId } = config;
  const dataHook = `${WIDGET_COMPONENT_DATA_HOOK}-${widgetId}`;

  return (
    <ErrorBoundary
      componentId={widgetId}
      errorLogger={sentry}
      onError={updateErrorState}
      loggerMetaData={{
        userId,
        metaSiteId,
      }}
    >
      <WidgetLoader
        componentName={bmComponentName}
        Component={Component}
        onLoaded={() => setWidgetStatus(widgetId, WidgetStatus.LOADED)}
        config={config}
        showSkeleton={showSkeleton}
        dataHook={dataHook}
        onComponentVisible={onComponentVisible}
      />
    </ErrorBoundary>
  );
};
