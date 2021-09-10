import { useServices } from '@hooks/services';
import { WidgetComponentClass, WidgetDefinition, WidgetStatus } from '@types';
import { OnVisibleParams } from '@wix/os-dashboard-shared-components';
import React, { FC, useCallback, useEffect } from 'react';
import { useModuleParams, useExperiments, useTranslation } from 'yoshi-flow-bm-runtime';
import { WidgetComponent } from './widget.component';
import { DASHBOARD_NON_PERMITTED_WIDGET } from '../../experiments';
import { NoPermissionWidgetComponent } from '@components/widget/no-permission-widget/no-permission-widget.component';

export interface WidgetProps {
  config: WidgetDefinition;
  bmComponentName: string;
  showSkeleton?: boolean;
  Component: WidgetComponentClass;
}

export const Widget: FC<WidgetProps> = ({
  config,
  bmComponentName,
  Component,
  showSkeleton = true,
}) => {
  const { widgetId } = config;
  const { biReporter, initialLayout } = useServices();
  const {
    sentry,
    widgetStatus: { setWidgetStatus },
  } = useServices();
  const { getWidgetOrder } = initialLayout;
  const widgetOrder = getWidgetOrder(widgetId)?.toString();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { userId, metaSiteId, userPermissions } = useModuleParams();

  const updateErrorState = useCallback(() => {
    setWidgetStatus(widgetId, WidgetStatus.LOADING_ERROR);
  }, [widgetId, setWidgetStatus]);

  const onComponentVisible = useCallback(
    (_params: OnVisibleParams) => {
      biReporter.sendDashboardWidgetVisibleBi(widgetId, widgetOrder);
    },
    [widgetId, biReporter, widgetOrder],
  );

  const isPermitted =
    !config.permissions || config.permissions.every(perm => userPermissions.includes(perm));

  const { experiments } = useExperiments();
  const isNonPermittedExperimentOn = experiments.enabled(DASHBOARD_NON_PERMITTED_WIDGET);
  const { t } = useTranslation();
  const widgetTitle = config.widgetTitleKey ? t(config.widgetTitleKey) : undefined;
  const shouldShowWidget = isPermitted || !isNonPermittedExperimentOn;

  useEffect(() => {
    const widgetStatus = shouldShowWidget ? WidgetStatus.LOADING : WidgetStatus.NOT_PERMITTED;
    setWidgetStatus(widgetId, widgetStatus);
  }, [widgetId, shouldShowWidget, setWidgetStatus]);

  return shouldShowWidget ? (
    <WidgetComponent
      sentry={sentry}
      updateErrorState={updateErrorState}
      userId={userId}
      metaSiteId={metaSiteId}
      bmComponentName={bmComponentName}
      Component={Component}
      setWidgetStatus={setWidgetStatus}
      onComponentVisible={onComponentVisible}
      config={config}
      showSkeleton={showSkeleton}
    />
  ) : (
    <NoPermissionWidgetComponent widgetTitle={widgetTitle || ''} widgetId={widgetId} />
  );
};
