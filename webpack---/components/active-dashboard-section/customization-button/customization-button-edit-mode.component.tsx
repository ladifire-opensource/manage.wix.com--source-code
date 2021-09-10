import React, { FC } from 'react';
import { Box, Button, Divider, PageSection, Text, TextButton, Tooltip } from 'wix-style-react';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import AdjustSmall from 'wix-ui-icons-common/AdjustSmall';
import ConfirmSmall from 'wix-ui-icons-common/ConfirmSmall';
import {
  CUSTOMIZE_DASHBOARD_BUTTON_DATA_HOOK,
  CUSTOMIZE_DASHBOARD_BUTTON_EDIT_MODE_DATA_HOOK,
  CUSTOMIZE_DASHBOARD_DND_EXPLANATION,
  NO_PERMISSION_TOOLTIP,
  CUSTOMIZE_DASHBOARD_TITLE_DATA_HOOK,
} from '../consts';
import { NoPermissionTooltipContent } from './no-permission-tooltip-content';
import { Animator } from 'wix-animations';

interface Props {
  isCustomizing: boolean;
  toggleIsCustomizing(): void;
  isCustomizable: boolean;
  withSiteCategoryOnDashboard: boolean;
}

export const CustomizationButtonEditMode: FC<Props> = ({
  toggleIsCustomizing,
  isCustomizing,
  isCustomizable,
  withSiteCategoryOnDashboard,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      direction="vertical"
      paddingBottom={'20px'}
      dataHook={CUSTOMIZE_DASHBOARD_BUTTON_EDIT_MODE_DATA_HOOK}
    >
      {withSiteCategoryOnDashboard && (
        <Box verticalAlign="middle">
          <Divider skin="dark" />
          <Box verticalAlign="middle" padding={'0 8px 0 8px'}>
            <Tooltip
              content={<NoPermissionTooltipContent />}
              disabled={isCustomizable}
              maxWidth={225}
              dataHook={NO_PERMISSION_TOOLTIP}
            >
              <Button
                weight="normal"
                size="small"
                skin="light"
                onClick={toggleIsCustomizing}
                dataHook={CUSTOMIZE_DASHBOARD_BUTTON_DATA_HOOK}
                disabled={!isCustomizable}
              >
                {isCustomizing
                  ? t('dashboard.customization.done')
                  : t('dashboard.customization.customize')}
              </Button>
            </Tooltip>
          </Box>
          <Divider skin="dark" />
        </Box>
      )}

      {!withSiteCategoryOnDashboard && (
        <PageSection
          title={t('dashboard.customization.business_overview')}
          dataHook={CUSTOMIZE_DASHBOARD_TITLE_DATA_HOOK}
          showDivider
          actionsBar={
            <Tooltip
              content={<NoPermissionTooltipContent />}
              disabled={isCustomizable}
              maxWidth={225}
              dataHook={NO_PERMISSION_TOOLTIP}
            >
              <TextButton
                prefixIcon={isCustomizing ? <ConfirmSmall /> : <AdjustSmall />}
                weight="normal"
                size="small"
                onClick={toggleIsCustomizing}
                dataHook={CUSTOMIZE_DASHBOARD_BUTTON_DATA_HOOK}
                disabled={!isCustomizable}
              >
                {isCustomizing
                  ? t('dashboard.customization.done')
                  : t('dashboard.customization.customize')}
              </TextButton>
            </Tooltip>
          }
        />
      )}

      <Animator show={isCustomizing} opacity timing="small">
        <Animator show={isCustomizing} height timing="small">
          <Box paddingTop={withSiteCategoryOnDashboard ? '12px' : '4px'}>
            <Text
              size="tiny"
              weight="thin"
              color="#333850"
              dataHook={CUSTOMIZE_DASHBOARD_DND_EXPLANATION}
            >
              {t('dashboard.customization.dnd_explanation')}
            </Text>
          </Box>
        </Animator>
      </Animator>
    </Box>
  );
};
