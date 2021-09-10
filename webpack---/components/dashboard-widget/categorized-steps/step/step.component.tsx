import React, { FC, MouseEvent } from 'react';
import { Box, Text, TextButton, Tooltip, Button } from 'wix-style-react';
import ConfirmSmall from 'wix-ui-icons-common/ConfirmSmall';
import CircleSmallFilledSmall from 'wix-ui-icons-common/CircleSmallFilledSmall';
import MinusSmall from 'wix-ui-icons-common/MinusSmall';
import { useTranslation } from '@wix/wix-i18n-config';
import { StepDataHooks as Hooks } from './step.data-hooks';
import { Step as StepInterface } from '@wix/dashboard-setup-common';
import { DismissButton } from './dismiss.component';
import * as s from './step.component.scss';

export interface StepProps extends StepInterface {
  showSkip: boolean;
  showCta: boolean;
  isSkipped: boolean;
  isNextStep: boolean;
  dismissFeatureEnabled: boolean;
  shouldDisplayTime: boolean;
  onToggleSkip(): void;
  onHover(): void;
  onCtaClick(): void;
}

export const Step: FC<StepProps> = (props: StepProps) => {
  const {
    isCompleted,
    onCtaClick,
    isPermitted,
    isSkipped,
    isNextStep,
    dismissFeatureEnabled,
  } = props;

  const handleStepClick = () => {
    if (!isPermitted || isCompleted || isSkipped) {
      return;
    }

    onCtaClick();
  };

  const shouldHideStep = dismissFeatureEnabled && isSkipped;

  return (
    <Box
      direction="horizontal"
      verticalAlign="middle"
      dataHook={Hooks.StepContainer}
      className={`${s.container} ${shouldHideStep ? s.hide : s.show}`}
    >
      <Box
        direction="vertical"
        className={`
        ${s.step}
        ${isSkipped ? s.skipped : ''}
        ${isNextStep ? s.nextStep : ''}
        ${!isPermitted ? s.disabled : ''}
        ${isCompleted ? s.completed : ''}
        `}
      >
        <div onClick={handleStepClick}>
          <Box align="space-between" verticalAlign="middle">
            <Box verticalAlign="middle" minHeight="24px">
              <StepIcon
                dismissFeatureEnabled={dismissFeatureEnabled}
                isPermitted={isPermitted}
                isSkipped={isSkipped}
                isCompleted={isCompleted}
              />
              <StepContent {...props} />
            </Box>
            <Box>
              <StepActions {...props} />
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

const StepIcon: FC<{
  isCompleted: boolean;
  isPermitted: boolean;
  isSkipped: boolean;
  dismissFeatureEnabled: boolean;
}> = ({ isCompleted, isSkipped, isPermitted, dismissFeatureEnabled }) => {
  const iconPermitted = isPermitted ? s.iconPermitted : '';

  if (isCompleted) {
    return (
      <ConfirmSmall
        className={`${s.icon} ${s.iconBackground} ${iconPermitted}`}
        data-hook={Hooks.StepCompleteIcon}
      />
    );
  }

  if (isSkipped && !dismissFeatureEnabled) {
    return (
      <MinusSmall
        className={`${s.icon} ${s.iconMinus} ${s.iconBackground} ${s.iconPermitted}`} /* skipped icon always appears permitted */
        data-hook={Hooks.StepIncompleteIcon}
      />
    );
  }

  return (
    <CircleSmallFilledSmall
      className={`${s.icon} ${iconPermitted}`}
      data-hook={Hooks.StepIncompleteIcon}
    />
  );
};

const StepContent: FC<StepProps> = (props: StepProps) => {
  const [t] = useTranslation();
  const { title, timeToComplete, isCompleted, isSkipped, shouldDisplayTime } =
    props;
  const isActive = !isCompleted && !isSkipped;

  return (
    <Box paddingLeft="8px" paddingRight="12px">
      <Text size="tiny">
        <Text
          size="tiny"
          skin="standard"
          weight={isActive ? 'normal' : 'thin'}
          className={s.content}
          dataHook={Hooks.StepTitle}
        >
          {t(title)}
        </Text>
        {shouldDisplayTime && timeToComplete && (
          <Text
            className={s.timeToComplete}
            size="tiny"
            light
            secondary
            dataHook={Hooks.StepTimeToComplete}
          >
            ({t('step.action.time_to_complete', { timeToComplete })})
          </Text>
        )}
      </Text>
    </Box>
  );
};

const StepActions: FC<StepProps> = (props: StepProps) => {
  const [t] = useTranslation();
  const {
    isSkipped,
    cta,
    isPermitted,
    onToggleSkip,
    showSkip,
    showCta,
    isNextStep,
    dismissFeatureEnabled,
  } = props;

  return (
    <>
      {showSkip && (
        <PermissionsTooltip
          dataHook={Hooks.StepNoPermissionsSkipTooltip}
          isPermitted={isPermitted}
        >
          <Box
            className={!isSkipped ? s.skip : s.unskip}
            marginRight={showCta ? 'small' : ''}
            alignItems="center"
            verticalAlign="middle"
          >
            {dismissFeatureEnabled ? (
              !isSkipped ? (
                <DismissButton onDismiss={onToggleSkip} />
              ) : null
            ) : (
              <>
                {isSkipped && (
                  <Box marginRight="4px">
                    <Text
                      size="tiny"
                      secondary
                      dataHook={Hooks.SkippedStepInfo}
                    >
                      {t('step.action.info.skipped')}
                    </Text>
                  </Box>
                )}
                <TextButton
                  size="tiny"
                  disabled={!isPermitted}
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                    onToggleSkip();
                  }}
                  dataHook={Hooks.StepSkip}
                >
                  {isSkipped ? t('step.action.unskip') : t('step.action.skip')}
                </TextButton>
              </>
            )}
          </Box>
        </PermissionsTooltip>
      )}
      {showCta && (
        <PermissionsTooltip
          dataHook={Hooks.StepNoPermissionsCtaTooltip}
          isPermitted={isPermitted}
        >
          <Box>
            <Button
              size="small"
              priority={isPermitted && !isNextStep ? 'secondary' : 'primary'}
              disabled={!isPermitted}
              dataHook={Hooks.StepCTA}
              className={s.stepAction}
              ellipsis={true}
              showTooltip={isPermitted}
            >
              {t(cta!.value.key)}
            </Button>
          </Box>
        </PermissionsTooltip>
      )}
    </>
  );
};

const PermissionsTooltip: FC<{
  dataHook: string;
  isPermitted: boolean;
}> = ({ children, isPermitted, dataHook }) => {
  const [t] = useTranslation();

  if (isPermitted) {
    return <>{children}</>;
  }

  return (
    <Tooltip
      dataHook={dataHook}
      maxWidth="240px"
      content={t('step.action.no_permission')}
    >
      {children}
    </Tooltip>
  );
};
