import React, { FC, useMemo, useCallback } from 'react';
import { useDashboardWidgetData } from '@src/components/dashboard-widget/dashboard-widget.context';
import { HeaderComponent } from './header.component';
import { calculateStepsProgress } from '@src/utils';
import { BILogger, useBILogger } from 'yoshi-flow-bm-runtime';
import { BI_WIDGET_NAME } from '@src/utils/bi-mappers';
import { useFeaturesWizard } from '@wix/features-wizard-modal';

export const Header: FC = () => {
  const {
    siteCategory,
    categorizedSteps,
    skippedSteps,
    isFeaturesWizardEnabled,
    hasFeaturesWizardPermissions,
  } = useDashboardWidgetData();

  const { open: openFeaturesWizard } = useFeaturesWizard();

  const stepsProgress = useMemo(
    () => calculateStepsProgress(categorizedSteps, skippedSteps),
    [categorizedSteps, skippedSteps],
  );

  const biLogger: BILogger = useBILogger();

  const openFeaturesModal = useCallback(
    (buttonName: string) => {
      openFeaturesWizard();
      biLogger.clickInDashboard({
        name: buttonName,
        widget_name: BI_WIDGET_NAME,
      });
    },
    [biLogger, openFeaturesWizard],
  );

  return (
    <HeaderComponent
      openFeaturesModal={openFeaturesModal}
      category={siteCategory}
      stepsProgress={stepsProgress}
      isFeaturesWizardEnabled={!!isFeaturesWizardEnabled}
      hasFeaturesWizardPermissions={!!hasFeaturesWizardPermissions}
    />
  );
};
