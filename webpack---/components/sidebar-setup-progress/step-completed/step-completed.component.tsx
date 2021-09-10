import * as React from 'react';
import { SidebarTooltipContent } from '../sidebar-tooltip-content/sidebar-tooltip-content.component';
import {
  sendSidebarItemVisibilityStepCompleted,
  sendItemSidebarStepCompletedCtaClicked,
  sendItemSidebarStepCompletedClosed,
  navigate,
  isPremiumStep,
} from '../common';
import { SidebarTooltip } from '../sidebar-tooltip/sidebar-tooltip.component';
import { IItem, ICount } from '../api';
import { Box, Text, Divider } from 'wix-style-react';
import ConfirmSmall from 'wix-ui-icons-common/ConfirmSmall';
import CircleSmallFilledSmall from 'wix-ui-icons-common/CircleSmallFilledSmall';
import { WithTranslation, withTranslation } from '@wix/wix-i18n-config';

export interface IProps extends WithTranslation {
  item: IItem;
  metaSiteId: string;
  hideTooltip(): void;
  itemsCount: ICount;
  enlargedProgressBarPopup: boolean;
}

export class StepCompletedComponent extends React.PureComponent<IProps> {
  componentDidMount() {
    sendSidebarItemVisibilityStepCompleted(this.props.item);
  }

  handleClick = () => {
    const { metaSiteId, item, hideTooltip } = this.props;
    hideTooltip();
    navigate({ metaSiteId, item, fromProgressBar: true });
    sendItemSidebarStepCompletedCtaClicked(item);
  };

  handleCancel = () => {
    const { item, hideTooltip } = this.props;
    sendItemSidebarStepCompletedClosed(item);
    hideTooltip();
  };

  render() {
    const {
      item: { title, description, actionLabel, isPermitted },
      t,
      itemsCount,
      enlargedProgressBarPopup,
    } = this.props;

    const stepsLeft =
      itemsCount.totalSteps - itemsCount.skippedAndCompletedSteps;

    return (
      <SidebarTooltip
        onCancel={this.handleCancel}
        enlargedProgressBarPopup={enlargedProgressBarPopup}
        happyMoment
      >
        <Box direction="vertical">
          <Box>
            <Box
              marginRight="16px"
              marginTop="3px"
              backgroundColor="#e8f1ff"
              width="18px"
              height="18px"
              borderRadius="50%"
            >
              <ConfirmSmall color="#116dff" />
            </Box>
            <Box direction="vertical" width="100%">
              <Text
                size="medium"
                weight="thin"
                secondary={enlargedProgressBarPopup}
              >
                {t('sidebar.step_completed', {
                  count: stepsLeft,
                })}
              </Text>
              <Box paddingTop="16px" paddingBottom="16px">
                <Divider />
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              marginRight="16px"
              marginTop={enlargedProgressBarPopup ? '3px' : '0'}
            >
              <CircleSmallFilledSmall color="#116dff" />
            </Box>
            <SidebarTooltipContent
              isPremiumStep={isPremiumStep(this.props.item)}
              title={`${t('sidebar.next_step')} ${t(title)}`}
              description={t(description)}
              actionLabel={t(actionLabel)}
              isPermitted={isPermitted}
              onClick={this.handleClick}
              enlargedProgressBarPopup={enlargedProgressBarPopup}
            />
          </Box>
        </Box>
      </SidebarTooltip>
    );
  }
}

export const StepCompleted = withTranslation()(StepCompletedComponent);
