import React, { FC, useMemo } from 'react';
import { Sidebar } from './sidebar/sidebar.component';
import { I18nextProvider } from '@wix/wix-i18n-config';
import { createI18n } from '@src/i18n';
import { getLogger } from './utilities/getBiLogger';
import { initializeApiService, initializeBiLogger, toDataSet } from './common';
import axios from 'axios';
import { wixAxiosInstanceConfig } from '@wix/wix-axios-config';
import { IViewMode } from '@wix/business-manager-api';
import { useModuleParams, useExperiments } from 'yoshi-flow-bm-runtime';
import { ResolvedProps } from '@src/exported-components/sidebar-setup-progress.module';
import { ThemeProvider } from 'wix-style-react';
import { theme } from 'wix-style-react/themes/businessDashboard';
import {
  BOOKING_ADDED_SERVICE_EVENT,
  FIRST_OPEN_SEO_WIZ_DASHBOARD_EVENT,
  OMNI_SETUP_RESTAURANT_SETUP_ONLINE_ORDERING_EVENT,
} from '@src/consts';

export interface SidebarSetupProgressProps extends ResolvedProps {
  isSidebarHidden: boolean;
}

export const SidebarSetupProgress: FC<SidebarSetupProgressProps> = ({
  widgetData: { realEstates, items },
  messages,
  isSidebarHidden,
}: SidebarSetupProgressProps) => {
  const { metaSiteId, viewMode, userId, userRole } = useModuleParams();
  const experiments = useExperiments().experiments;
  const axiosInstance = wixAxiosInstanceConfig(axios, { baseURL: '/' });
  initializeApiService(axiosInstance);
  initializeBiLogger(getLogger({ metaSiteId, viewMode }));

  const dataSet = toDataSet(items);

  const i18n = useMemo(
    () => createI18n({ messages, experiments: experiments.all() }),
    [experiments, messages],
  );

  const excludeBookingsFromAutoOpenPopover = experiments.enabled(
    'specs.wos1.SupressSetupPopoverBookingsService',
  );
  const enlargedProgressBarPopup = experiments.enabled(
    'specs.wos1.enlargedProgressBarPopup',
  );

  const excludedEventsFromAutoOpenPopover = [
    OMNI_SETUP_RESTAURANT_SETUP_ONLINE_ORDERING_EVENT,
    FIRST_OPEN_SEO_WIZ_DASHBOARD_EVENT,
  ];

  if (excludeBookingsFromAutoOpenPopover) {
    excludedEventsFromAutoOpenPopover.push(BOOKING_ADDED_SERVICE_EVENT);
  }

  return (
    <ThemeProvider theme={theme()}>
      <I18nextProvider i18n={i18n}>
        <Sidebar
          metaSiteId={metaSiteId}
          realEstates={realEstates}
          userId={userId}
          viewMode={viewMode as IViewMode}
          userRole={userRole}
          isSidebarHidden={isSidebarHidden}
          excludedEventsFromAutoOpenPopover={excludedEventsFromAutoOpenPopover}
          enlargedProgressBarPopup={enlargedProgressBarPopup}
          {...dataSet}
        />
      </I18nextProvider>
    </ThemeProvider>
  );
};
