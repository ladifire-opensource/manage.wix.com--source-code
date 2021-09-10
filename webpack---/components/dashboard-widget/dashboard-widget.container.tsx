import React, { FC } from 'react';

import { DashboardWidgetComponent } from './dashboard-widget.component';
import { useDashboardWidgetData } from './dashboard-widget.context';
import { DashboardWidgetDataHooks } from './dashboard-widget.data-hooks';
import {
  FeaturesWizardProvider,
  ModalComponents,
} from '@wix/features-wizard-modal';

export const DashboardWidgetContainer: FC = () => {
  const { setupCompleted, closedHappyMoment } = useDashboardWidgetData();

  if (setupCompleted && closedHappyMoment) {
    return null;
  }

  return (
    <div data-hook={DashboardWidgetDataHooks.Container}>
      <FeaturesWizardProvider componentName={ModalComponents.FeaturesWizard}>
        <DashboardWidgetComponent />
      </FeaturesWizardProvider>
    </div>
  );
};
