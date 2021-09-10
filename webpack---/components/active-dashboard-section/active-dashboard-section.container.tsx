import React, { FC, useEffect, memo } from 'react';
import { CUSTOMIZE_DASHBOARD_PERMISSION, DH_ACTIVE_DASHBOARD_CONTAINER } from '@consts';
import { ActiveDashboardSection } from './active-dashboard-section.component';
import { useActiveDashboardSection } from './active-dashboard-section.context';
import { useBILogger, useExperiments, useModuleParams } from 'yoshi-flow-bm-runtime';
import {
  listenToAddWidgetNotification,
  listenToRemoveWidgetNotification,
} from '@services/active-dashboard-widget-listeners/active-dashboard-widget-listeners.service';
import { theme } from 'wix-style-react/themes/businessDashboard';
import { ThemeProvider } from 'wix-style-react';
import { onSidePanelClose } from '@wix/business-manager-api';

export const ActiveDashboardSectionContainer: FC = memo(() => {
  const {
    selectors: { getWidgets, hasWidgets: hasWidgetsSelector },
    actions: { addWidget, removeWidget, setIsCustomizing },
  } = useActiveDashboardSection();
  const { left, right } = getWidgets();
  const { metaSiteId: msid, viewMode: hosting } = useModuleParams();
  const hasWidgets = hasWidgetsSelector();

  useBILogger().util.updateDefaults({
    msid,
    hosting,
  });

  useEffect(() => {
    const listener = listenToAddWidgetNotification({
      callback: params => addWidget(params),
    });

    return () => listener.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, right]);

  useEffect(() => {
    const listener = listenToRemoveWidgetNotification({
      callback: params => removeWidget(params),
    });

    return () => listener.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, right]);

  onSidePanelClose(() => setIsCustomizing(false));

  return (
    <div data-hook={DH_ACTIVE_DASHBOARD_CONTAINER}>
      <ThemeProvider theme={theme()}>
        <ActiveDashboardSection showBottomDivider={hasWidgets} />
      </ThemeProvider>
    </div>
  );
});
