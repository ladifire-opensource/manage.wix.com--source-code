import { Services } from '@contexts/services';
import { useServicesContainer } from '@hooks/services-provider';
import React, { FC, memo, useEffect } from 'react';
import { DashboardContainer } from './dashboard.container';
import { DashboardRootProps } from './dashboard.types';
import { registerActiveDashboardSection } from '@components/active-dashboard-section/active-dashboard-section.register';
import { registerLoaderComponents } from '@components/loaders/widget-loader-components';

registerLoaderComponents();

export const DashboardRoot: FC<DashboardRootProps> = memo(
  ({ servicesOverrides, dashboardData }) => {
    const { layout, widgetsDefinitions, availableWidgets } = dashboardData;

    const services = useServicesContainer({
      widgetsDefinitions,
      layout,
      availableWidgets,
      overrides: servicesOverrides,
    });

    useEffect(() => {
      registerActiveDashboardSection();
    }, []);

    return (
      <Services.Provider value={services}>
        <DashboardContainer />
      </Services.Provider>
    );
  },
);
