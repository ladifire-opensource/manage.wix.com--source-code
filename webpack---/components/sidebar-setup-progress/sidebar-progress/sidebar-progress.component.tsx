import * as React from 'react';
import * as css from './sidebar-progress.scss';
import {
  sendProgressBarClicked,
  calculateCompletedPercentage,
  navigateToDashboard,
} from '../common';
import { TSortedIds, ICount, RealEstateDefinition } from '../api';
import { Box, LinearProgressBar, Text } from 'wix-style-react';
import { withTranslation, WithTranslation } from '@wix/wix-i18n-config';
import {
  progressBarWrapperDataHook,
  stepsLeftDataHook,
  omniSetupSidebarProgressDataHook,
} from './sidebar-progress.data-hooks';

export interface IProps extends WithTranslation {
  sortedIds: TSortedIds;
  itemsCount: ICount;
  showTooltip(): void;
  realEstate?: RealEstateDefinition;
}

export class SidebarProgressComponent extends React.PureComponent<IProps> {
  handleClick() {
    sendProgressBarClicked();
    navigateToDashboard();
  }

  render() {
    const {
      itemsCount: { skippedAndCompletedSteps },
      sortedIds,
      showTooltip,
      t,
      realEstate,
    } = this.props;
    const minimalBarProgress = 15;
    const stepsLeft = sortedIds.length - skippedAndCompletedSteps;
    const progressBarPercentage = calculateCompletedPercentage(
      skippedAndCompletedSteps,
      sortedIds.length,
      minimalBarProgress,
    );

    return (
      <div
        className={`${css.container}`}
        onMouseEnter={showTooltip}
        onClick={this.handleClick}
        data-hook={progressBarWrapperDataHook}
      >
        <Box className={css.labels} align="space-between">
          <Text
            light
            size="small"
            skin="standard"
            tagName="span"
            weight="normal"
          >
            {t(realEstate?.progressBar?.titleKey!)}
          </Text>
        </Box>
        <LinearProgressBar
          skin="success"
          value={progressBarPercentage + minimalBarProgress}
          dataHook={omniSetupSidebarProgressDataHook}
        />
        <Box>
          <Text
            dataHook={stepsLeftDataHook}
            light
            size="tiny"
            skin="standard"
            tagName="span"
            weight="normal"
          >
            {stepsLeft === 1
              ? t('sidebar.one_step_left')
              : t('sidebar.steps_left', { count: stepsLeft })}
          </Text>
        </Box>
      </div>
    );
  }
}

export const SidebarProgress = withTranslation()(SidebarProgressComponent);
