import React, { FC, memo, useEffect } from 'react';
import { ActiveDashboardSectionContainer } from '@components/active-dashboard-section/active-dashboard-section.container';
import { ActiveDashboardSectionProvider } from '@components/active-dashboard-section/active-dashboard-section.context';
import { useServices } from '@hooks/services';

interface ActiveDashboardRootProps {
  onLoaded: () => void;
}

export const ActiveDashboardRoot: FC<ActiveDashboardRootProps> = memo(({ onLoaded }) => {
  const { initialLayout, availableWidgets: availableWidgetsService } = useServices();
  const { activeDashboard } = initialLayout.getInitialLayout();
  const availableWidgets = availableWidgetsService.getAvailableWidgets();

  useEffect(() => {
    onLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoaded]);

  return (
    <ActiveDashboardSectionProvider
      widgets={activeDashboard}
      availableWidgets={availableWidgets}
      removed={activeDashboard.removed}
    >
      <ActiveDashboardSectionContainer />
    </ActiveDashboardSectionProvider>
  );
});
