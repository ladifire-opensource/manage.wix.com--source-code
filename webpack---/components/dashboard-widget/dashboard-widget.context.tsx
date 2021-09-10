import React, { useContext, FC, useState, useEffect, useMemo } from 'react';
import {
  DashboardWidgetData,
  CategorizedSteps,
  Step,
} from '@wix/dashboard-setup-common';
import {
  BILogger,
  useBILogger,
  useExperiments,
  useModuleParams,
} from 'yoshi-flow-bm-runtime';
import { mapToFinishSetupEvent } from '@src/utils/bi-mappers';
import { clearWidgetDataCache } from '@src/services/initial-data';
import { isFeaturesWizardPermitted } from '@src/utils/features-wizard-permissions';
import { RemoveToast } from '@wix/business-manager-api';

interface DashboardWidgetState {
  skippedSteps: Set<string>;
  setupCompleted: boolean;
}

interface DashboardWidgetActions {
  closeHappyMoment: () => void;
  toggleSkipStep: (stepId: string, isSkipped: boolean) => void;
  isStepSkipped: (step: Step) => boolean;
  setCurrentDismissToast: (removeToast: { remove: RemoveToast }) => void;
  removeCurrentToast: () => void | undefined;
  incompleteStepsLeft: () => number;
}
type DashboardWidgetStore = DashboardWidgetState &
  DashboardWidgetActions &
  DashboardWidgetProps;

const DashboardWidgetDataContext = React.createContext(
  {} as DashboardWidgetStore,
);

const allStepsCompleted = (
  categorizedSteps: CategorizedSteps,
  skippedSteps: Set<string>,
) => {
  const incompleteSteps = categorizedSteps
    .map((category) => {
      return category.steps.filter(
        (step) => !(skippedSteps.has(step.id) || step.isCompleted),
      );
    })
    .flat();

  return incompleteSteps.length === 0;
};

export interface DashboardWidgetProps extends DashboardWidgetData {
  nextStepId?: string;
  isFeaturesWizardEnabled?: boolean;
  hasFeaturesWizardPermissions?: boolean;
  dismissFeatureEnabled?: boolean;
  widgetTitle?: string;
}

export const useDashboardWidgetData = () =>
  useContext(DashboardWidgetDataContext);

export const DashboardWidgetDataProvider: FC<DashboardWidgetProps> = (
  props,
) => {
  const {
    siteCategory,
    categorizedSteps,
    children,
    skippedSteps: providedSkippedSteps,
    setupCompleted: providedSetupCompleted,
    closedHappyMoment: providedClosedHappyMoment,
    isPartner,
    isFinishFeaturesWizard,
    widgetTitle,
  } = props;

  const { experiments } = useExperiments();
  const isFeaturesWizardEnabled = experiments.enabled(
    'specs.wos1.enableSetupFeaturesModal',
  );
  const dismissFeatureEnabled = experiments.enabled(
    'specs.wos1.enableSetupDismiss',
  );

  const [currentToastRemove, setCurrentToastRemove] =
    useState<{ remove: RemoveToast }>();

  const setCurrentDismissToast = (removeToast: { remove: RemoveToast }): void =>
    setCurrentToastRemove(removeToast);

  const removeCurrentToast = () => currentToastRemove?.remove();
  const [skippedSteps, setSkippedSteps] = useState(
    new Set(providedSkippedSteps),
  );

  const incompleteStepsLeft = () => {
    const incompleteSteps = categorizedSteps
      .map((category) => {
        return category.steps.filter(
          (step) => !(skippedSteps.has(step.id) || step.isCompleted),
        );
      })
      .flat();

    return incompleteSteps.length;
  };

  const [setupCompleted, setSetupCompleted] = useState(providedSetupCompleted);
  const [closedHappyMoment, setClosedHappyMoment] = useState(
    providedClosedHappyMoment,
  );

  const { viewMode, metaSiteId, userPermissions } = useModuleParams();
  const biLogger: BILogger = useBILogger();

  const hasFeaturesWizardPermissions = useMemo(
    () => isFeaturesWizardPermitted(userPermissions),
    [userPermissions],
  );

  useEffect(() => {
    if (!setupCompleted && allStepsCompleted(categorizedSteps, skippedSteps)) {
      biLogger.finishSetupWidget(
        mapToFinishSetupEvent({
          categorizedSteps,
          skippedSteps: [...skippedSteps],
        }),
      );
      setSetupCompleted(true);
    }
  }, [
    setupCompleted,
    closedHappyMoment,
    categorizedSteps,
    skippedSteps,
    metaSiteId,
    biLogger,
    viewMode,
  ]);

  const closeHappyMoment: DashboardWidgetActions['closeHappyMoment'] = () =>
    setClosedHappyMoment(true);

  const isStepSkipped: DashboardWidgetActions['isStepSkipped'] = (step: Step) =>
    skippedSteps.has(step.id) && !step.isCompleted;

  const toggleSkipStep: DashboardWidgetActions['toggleSkipStep'] = (
    stepId,
    isSkipped,
  ) => {
    clearWidgetDataCache();

    setSkippedSteps((prevSkippedSteps) => {
      const updatedSkippedSteps = new Set(prevSkippedSteps);
      if (isSkipped) {
        updatedSkippedSteps.add(stepId);
      } else {
        updatedSkippedSteps.delete(stepId);
      }
      return updatedSkippedSteps;
    });
  };

  const getNextStep = () => {
    const steps = categorizedSteps.map((category) => category.steps).flat();

    const nextStep = steps.find(
      (step) => !step.isCompleted && !isStepSkipped(step) && step.isPermitted,
    );

    return nextStep;
  };

  return (
    <DashboardWidgetDataContext.Provider
      value={
        {
          categorizedSteps,
          siteCategory,
          toggleSkipStep,
          isStepSkipped,
          setCurrentDismissToast,
          removeCurrentToast,
          incompleteStepsLeft,
          skippedSteps,
          setupCompleted,
          isPartner,
          isFeaturesWizardEnabled,
          dismissFeatureEnabled,
          isFinishFeaturesWizard,
          hasFeaturesWizardPermissions,
          closedHappyMoment,
          closeHappyMoment,
          nextStepId: getNextStep()?.id,
          widgetTitle,
        } as DashboardWidgetStore
      }
    >
      {children}
    </DashboardWidgetDataContext.Provider>
  );
};
