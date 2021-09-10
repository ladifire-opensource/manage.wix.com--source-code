import * as React from 'react';
import { Text, Button, Box } from 'wix-style-react';

export const sidebarTooltipTitleDataHook = 'omni-setup-sidebar-tooltip-title';
export const sidebarTooltipDescriptionDataHook =
  'omni-setup-sidebar-tooltip-description';
export const sidebarTooltipButtonDataHook = 'omni-setup-sidebar-tooltip-button';

export interface IProps {
  happyMoment?: boolean;
  title: string;
  description: string;
  onClick(): void;
  actionLabel: string;
  isPremiumStep: boolean;
  isPermitted: boolean;
  enlargedProgressBarPopup: boolean;
}

export class SidebarTooltipContent extends React.PureComponent<IProps> {
  render() {
    const {
      title,
      description,
      onClick,
      actionLabel,
      isPremiumStep,
      isPermitted,
      enlargedProgressBarPopup,
    } = this.props;

    return (
      <Box direction="vertical">
        <Text
          size={enlargedProgressBarPopup ? 'medium' : 'small'}
          weight={'bold'}
          dataHook={sidebarTooltipTitleDataHook}
        >
          {title}
        </Text>
        <Box marginTop={enlargedProgressBarPopup ? '4px' : '6px'}>
          <Text
            size={enlargedProgressBarPopup ? 'medium' : 'small'}
            weight="thin"
            secondary={enlargedProgressBarPopup}
            dataHook={sidebarTooltipDescriptionDataHook}
          >
            {description}
          </Text>
        </Box>
        <Box marginTop={enlargedProgressBarPopup ? '16px' : '18px'}>
          <Button
            skin={isPremiumStep ? 'premium' : 'standard'}
            disabled={!isPermitted}
            dataHook={sidebarTooltipButtonDataHook}
            onClick={onClick}
            size={enlargedProgressBarPopup ? 'medium' : 'small'}
          >
            {actionLabel}
          </Button>
        </Box>
      </Box>
    );
  }
}
