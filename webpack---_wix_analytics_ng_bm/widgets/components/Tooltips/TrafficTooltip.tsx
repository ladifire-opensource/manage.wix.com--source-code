import React, { FC } from 'react';
import { Box, Tooltip, Text } from 'wix-style-react';
import InfoCircleSmall from 'wix-ui-icons-common/InfoCircleSmall';

import { IStatTextTooltipProps } from '../../types/tooltipTypes';
import { t } from '../../../utils/translate';

export const TrafficTooltip: FC<IStatTextTooltipProps> = ({
  statTextExtended,
  isConsentPolicyEnabled,
  children,
}) => {
  if (!statTextExtended && !isConsentPolicyEnabled) {
    return children;
  }

  return (
    <Tooltip
      maxWidth={265}
      content={
        <>
          {statTextExtended && (
            <Box marginBottom="SP2">
              <Text size="small" weight="bold" light>
                {statTextExtended}
              </Text>
            </Box>
          )}
          {isConsentPolicyEnabled && (
            <Box>
              <Box paddingRight="11px">
                <InfoCircleSmall />
              </Box>
              <Text size="tiny" light>
                {t('widget.dashboard.stat.traffic.tooltip.cookie-consent')}
              </Text>
            </Box>
          )}
        </>
      }
    >
      {children}
    </Tooltip>
  );
};
