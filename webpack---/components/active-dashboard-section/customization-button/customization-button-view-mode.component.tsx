import React, { FC } from 'react';
import { Box, Divider, Text, TextButton, Tooltip } from 'wix-style-react';
import AdjustSmall from 'wix-ui-icons-common/AdjustSmall';
import InfoCircleSmall from 'wix-ui-icons-common/InfoCircleSmall';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import {
  CUSTOMIZE_DASHBOARD_BUTTON_DATA_HOOK,
  CUSTOMIZE_DASHBOARD_BUTTON_VIEW_MODE_DATA_HOOK,
  CUSTOMIZE_DASHBOARD_TOOLTIP,
  NO_PERMISSION_TOOLTIP,
} from '../consts';
import { NoPermissionTooltipContent } from './no-permission-tooltip-content';

interface Props {
  toggleIsCustomizing(): void;
  onTooltipShown(): void;
  isCustomizable: boolean;
  hasWidgets: boolean;
  withSiteCategoryOnDashboard: boolean;
}

export const CustomizationButtonViewMode: FC<Props> = ({
  toggleIsCustomizing,
  onTooltipShown,
  isCustomizable,
  hasWidgets,
  withSiteCategoryOnDashboard,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      verticalAlign="middle"
      paddingBottom={hasWidgets ? '20px' : '0'}
      dataHook={CUSTOMIZE_DASHBOARD_BUTTON_VIEW_MODE_DATA_HOOK}
    >
      <Divider skin="dark" />
      <Box verticalAlign="middle" padding={'0 8px 0 8px'}>
        <Tooltip
          content={<NoPermissionTooltipContent />}
          disabled={isCustomizable}
          maxWidth={225}
          moveBy={{ x: 11 }}
          dataHook={NO_PERMISSION_TOOLTIP}
          moveArrowTo={95}
        >
          <Box verticalAlign="middle" paddingRight="8px">
            <TextButton
              prefixIcon={<AdjustSmall />}
              size="small"
              weight="normal"
              onClick={toggleIsCustomizing}
              dataHook={CUSTOMIZE_DASHBOARD_BUTTON_DATA_HOOK}
              disabled={!isCustomizable}
            >
              {hasWidgets
                ? t(
                    withSiteCategoryOnDashboard
                      ? 'dashboard.customization.customize_widgets'
                      : 'dashboard.customization.customize',
                  )
                : t('dashboard.customization.customize_dashboard')}
            </TextButton>
          </Box>
        </Tooltip>
        {!hasWidgets && (
          <Tooltip
            content={
              <Box lineHeight="16px">
                <Text size="tiny" weight="thin" light>
                  {t('dashboard.customization.tooltip')}
                </Text>
              </Box>
            }
            maxWidth={225}
            onShow={onTooltipShown}
            dataHook={CUSTOMIZE_DASHBOARD_TOOLTIP}
            disabled={!isCustomizable}
          >
            <Box verticalAlign="middle">
              <InfoCircleSmall color="#333850" />
            </Box>
          </Tooltip>
        )}
      </Box>
      <Divider skin="dark" />
    </Box>
  );
};
