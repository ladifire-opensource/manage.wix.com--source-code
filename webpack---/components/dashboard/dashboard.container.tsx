import { DASHBOARD_MAIN_PAGE, DASHBOARD_SALES_BANNER_WIDGET_ID, fedopsPhases } from '@consts';
import { useRenderWidgets } from '@hooks/render-widgets';
import { useServices } from '@hooks/services';
import React, { FC, memo, useEffect, useState } from 'react';
import { ModuleRegistry } from 'react-module-container';
import { Dashboard } from './dashboard.component';

export const DashboardContainer: FC = memo(() => {
  const {
    widgetConfiguration,
    widgetMetrics,
    fedops,
    fedopsReporter,
    biReporter,
    sessionRecorder,
    initialLayout,
  } = useServices();
  const { activeDashboard, column1, column2 } = initialLayout.getInitialLayout();
  const [renderedImportantWidgets, setRendered] = useState(false);
  const { left: activeWidgetsLeft, right: activeWidgetsRight } = activeDashboard;

  useEffect(() => {
    const basicWidgets = [...column1, ...column2, DASHBOARD_SALES_BANNER_WIDGET_ID];
    const activeDashboardSectionWidgets = [...activeWidgetsLeft, ...activeWidgetsRight];
    widgetConfiguration.registerWidgets(basicWidgets, activeDashboardSectionWidgets);
    widgetMetrics.startMeasuring();
    fedops.appLoadingPhaseFinish(fedopsPhases.LOAD_DASHBOARD_PAGE);
    fedopsReporter.start();
    biReporter.start();
    sessionRecorder.startRecording();
    ModuleRegistry.notifyListeners('businessManager.hideLoadingSignal', DASHBOARD_MAIN_PAGE);
    setRendered(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderWidgets = useRenderWidgets();

  const fullMainColumn = renderWidgets(column1).map(({ component }) => component);
  const fullSecondaryColumn = renderWidgets(column2).map(({ component }) => component);

  // The following is an ugly workaround.
  // If we decide that we need widgets rendering prioritization then we should implement it properly.
  const renderedMainColumn = renderedImportantWidgets ? fullMainColumn : fullMainColumn.slice(0, 1);
  const renderedSecondaryColumn = renderedImportantWidgets
    ? fullSecondaryColumn
    : fullSecondaryColumn.slice(0, 1);

  return <Dashboard mainColumn={renderedMainColumn} secondaryColumn={renderedSecondaryColumn} />;
});
