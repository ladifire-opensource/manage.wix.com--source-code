import React, { FC } from 'react';
import { LinearProgressBar, Text, Box } from 'wix-style-react';
import { useTranslation } from '@wix/wix-i18n-config';
import * as s from './header.component.scss';
import { StepsProgress } from '@src/utils';
import { HeaderDataHooks } from './header.data-hooks';

interface Props {
  stepsProgress: StepsProgress;
}

const getProgressBarPercentage = (
  completedCount: number,
  length: number,
  minimalBarProgress: number = 0,
): number =>
  completedCount > 0
    ? (completedCount / length) * (100 - minimalBarProgress)
    : 0;

export const ProgressBar: FC<Props> = ({ stepsProgress }: Props) => {
  const [t] = useTranslation();
  const { completedCount, totalCount, completedPercentage } = stepsProgress;
  const stepsLeft = totalCount - completedCount;
  const minimalBarProgress = 15;
  const progressBarPercentage = getProgressBarPercentage(
    completedCount,
    totalCount,
    minimalBarProgress,
  );

  return (
    <Box verticalAlign="middle">
      <Text size="tiny" secondary dataHook={HeaderDataHooks.ProgressBarTitle}>
        {stepsLeft === 1
          ? t('setup.progress.bar.one_step_left')
          : t('setup.progress.bar', { steps: stepsLeft })}
      </Text>
      <Box className={s.headerProgress}>
        <LinearProgressBar
          skin="success"
          value={progressBarPercentage + minimalBarProgress}
          dataHook={HeaderDataHooks.ProgressBar}
        />
      </Box>
    </Box>
  );
};
