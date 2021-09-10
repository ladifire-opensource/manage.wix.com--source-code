import React, { FC } from 'react';
import {
  BILogger,
  useBILogger,
  useModuleParams,
  useInstance,
  useExperiments,
} from 'yoshi-flow-bm-runtime';
import {
  AssetClickType,
  AssetVisibilityTrigger,
  mapToAssetClickEvent,
  mapToAssetViewEvent,
} from '@src/utils/bi-mappers';
import { Step as StepInterface } from '@wix/dashboard-setup-common';
import { Step as StepComponent } from './step.component';
import { navigateToCTA, ReferralInfo } from '@src/services/navigation';
import {
  skip as skipStep,
  unskip as unskipStep,
} from '@src/services/step-actions';
import { useDashboardWidgetData } from '@src/components/dashboard-widget/dashboard-widget.context';
import { ITEM_SKIPPED_TOGGLED } from '@src/consts';
import { ModuleRegistry } from 'react-module-container';
import {
  IViewMode,
  showToast,
  ToastType,
  ToastTimeout,
  ToastScope,
  ToastActionUiType,
  RemoveToast,
} from '@wix/business-manager-api';
import { useTranslation } from '@wix/wix-i18n-config';
import { useSessionRecorder } from '@src/hooks/use-session-recorder';
import { sendDealerClickEvent } from '@src/services/dealer-events/dealer-events.service';

export interface StepProps {
  step: StepInterface;
}

export const Step: FC<StepProps> = ({ step }) => {
  const [t] = useTranslation();
  const {
    toggleSkipStep,
    isStepSkipped,
    setCurrentDismissToast,
    removeCurrentToast,
    incompleteStepsLeft,
    nextStepId,
    isFinishFeaturesWizard,
    isFeaturesWizardEnabled,
    dismissFeatureEnabled,
  } = useDashboardWidgetData();

  const { metaSiteId, viewMode } = useModuleParams();
  const sessionRecorder = useSessionRecorder();
  const authorization = useInstance();
  const shouldDisplayTime =
    useExperiments().experiments.get('specs.wos1.dashboardSetupRemoveTime') !==
    'true';
  const stepId = step.id;
  const isSkipped = isStepSkipped(step);

  const isNextStep = nextStepId === step.id;
  const showSkip =
    (!step.isCompleted && !step.isMandatory && step.isPermitted) ||
    (!step.isPermitted && isSkipped);
  const showCta = !!step.cta && !isSkipped && !step.isCompleted;
  const biLogger: BILogger = useBILogger();
  const shouldMarkNextStep = !isFeaturesWizardEnabled || isFinishFeaturesWizard;

  const onHover = (): void => {
    biLogger.assetView(
      mapToAssetViewEvent(step, isSkipped, AssetVisibilityTrigger.hover),
    );
  };

  const onToggle = () =>
    dismissFeatureEnabled ? onDismiss() : onToggleSkip(isSkipped);

  const onDismiss = () => {
    removeCurrentToast();

    if (incompleteStepsLeft() > 1) {
      const removeToast = showToast({
        message: t('step.dismiss.toast.message'),
        biName: 'setupDismiss',
        timeout: ToastTimeout.NORMAL,
        action: {
          uiType: ToastActionUiType.LINK,
          text: t('step.dismiss.toast.undo'),
          onClick: () => onToggleSkip(true),
        },
        scope: ToastScope.DASHBOARD,
      });
      setCurrentDismissToast(removeToast);
    }

    onToggleSkip(isSkipped);
  };

  const onToggleSkip = async (
    skipped: boolean,
    removeToast?: { remove: RemoveToast },
    visibilityTrigger: AssetVisibilityTrigger = AssetVisibilityTrigger.normal,
  ) => {
    toggleSkipStep(stepId, !skipped);

    biLogger.assetClick(
      mapToAssetClickEvent(
        step,
        skipped ? AssetClickType.unskip : AssetClickType.skip,
        visibilityTrigger,
      ),
    );

    try {
      skipped
        ? await unskipStep(stepId, viewMode as IViewMode)
        : await skipStep(stepId, viewMode as IViewMode);

      ModuleRegistry.notifyListeners(ITEM_SKIPPED_TOGGLED, {
        itemId: stepId,
        isSkipped: !skipped,
      });
    } catch {
      dismissFeatureEnabled && removeToast && removeToast.remove();

      // restore the original isSkipped value
      toggleSkipStep(stepId, skipped);

      showToast({
        biName: skipped
          ? 'dashboard-setup.unskip-item-failed'
          : 'dashboard-setup.skip-item-failed',
        message: skipped
          ? t('step.action.unskip.failed_message')
          : t('step.action.skip.failed_message'),
        type: ToastType.ERROR,
      });
    }
  };

  const onCtaClick = (
    visibilityTrigger: AssetVisibilityTrigger = AssetVisibilityTrigger.normal,
  ) => {
    biLogger.assetClick(
      mapToAssetClickEvent(step, AssetClickType.click, visibilityTrigger),
    );
    sessionRecorder.markStepCtaClick(step);
    navigateToCTA(step.cta, metaSiteId, ReferralInfo.DASHBOARD_SETUP);

    sendDealerClickEvent(authorization, step.id);
  };

  return (
    <StepComponent
      {...step}
      onToggleSkip={onToggle}
      onHover={onHover}
      onCtaClick={onCtaClick}
      showSkip={showSkip}
      showCta={showCta}
      isSkipped={isSkipped}
      isNextStep={shouldMarkNextStep && isNextStep}
      dismissFeatureEnabled={!!dismissFeatureEnabled}
      shouldDisplayTime={shouldDisplayTime}
    />
  );
};
