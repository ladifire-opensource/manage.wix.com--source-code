import React, { FC } from 'react';
import { CategorizedStepsComponent } from './categorized-steps.component';
import { BILogger, useBILogger, useInstance } from 'yoshi-flow-bm-runtime';
import { useDashboardWidgetData } from '../dashboard-widget.context';
import { Step } from '@wix/dashboard-setup-common';
import {
  AssetVisibilityTrigger,
  mapToAssetViewEvent,
} from '@src/utils/bi-mappers';
import { sendDealerViewEvent } from '@src/services/dealer-events/dealer-events.service';

export const CategorizedSteps: FC = () => {
  const { categorizedSteps, skippedSteps } = useDashboardWidgetData();
  const biLogger: BILogger = useBILogger();
  const authorization = useInstance();

  const onStepView = (step: Step, trigger: AssetVisibilityTrigger): void => {
    biLogger.assetView(
      mapToAssetViewEvent(step, skippedSteps.has(step.id), trigger),
    );
    sendDealerViewEvent(authorization, step.id);
  };

  const displayCategories = categorizedSteps.filter((category) => {
    return category.steps.some(
      (s) => !s.isCompleted && !skippedSteps.has(s.id),
    );
  });

  return (
    <CategorizedStepsComponent
      categorizedSteps={displayCategories}
      skippedSteps={skippedSteps}
      onStepView={onStepView}
    />
  );
};
