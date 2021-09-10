import React, { FC } from 'react';
import { TextButton, Heading, Box, Text, Tooltip } from 'wix-style-react';
import { useTranslation } from '@wix/wix-i18n-config';
import { ProgressBar } from './progress-bar.component';
import * as s from './header.component.scss';
import { StepsProgress } from '@src/utils';
import { HeaderDataHooks } from './header.data-hooks';
import { useDashboardWidgetData } from '../dashboard-widget.context';

interface Props {
  category: string | null;
  stepsProgress: StepsProgress;
  openFeaturesModal(buttonName: string): void;
  isFeaturesWizardEnabled: boolean;
  hasFeaturesWizardPermissions: boolean;
}

export const HeaderComponent: FC<Props> = ({
  category,
  stepsProgress,
  openFeaturesModal,
  isFeaturesWizardEnabled,
  hasFeaturesWizardPermissions,
}: Props) => {
  const [t] = useTranslation();

  const shouldDisplayExploreFeatures =
    isFeaturesWizardEnabled && hasFeaturesWizardPermissions;

  const { widgetTitle } = useDashboardWidgetData();
  return (
    <Box
      dataHook={HeaderDataHooks.Header}
      className={s.header}
      direction="vertical"
    >
      <Box>
        <Heading dataHook={HeaderDataHooks.Title} appearance="H3">
          {widgetTitle || t('setup.header')}
        </Heading>
        <Box marginLeft="auto" alignSelf="center">
          <ProgressBar stepsProgress={stepsProgress} />
          {shouldDisplayExploreFeatures && (
            <TextButton
              dataHook={HeaderDataHooks.ExploreFeatures}
              className={s.headerExpoloreFeaturesButton}
              size="tiny"
              weight="normal"
              onClick={() => openFeaturesModal('explore-features')}
            >
              {t('setup.explore_features.cta')}
            </TextButton>
          )}
        </Box>
      </Box>

      <Box>
        {isFeaturesWizardEnabled && (
          <HeaderCategory
            category={category}
            hasPermission={hasFeaturesWizardPermissions}
            openFeaturesModal={() => openFeaturesModal('change-business-type')}
          />
        )}
      </Box>
    </Box>
  );
};

const HeaderCategory: FC<{
  category: string | null;
  openFeaturesModal: () => void;
  hasPermission: boolean;
}> = ({ category, openFeaturesModal, hasPermission }) => {
  const [t] = useTranslation();

  return (
    <Box
      verticalAlign="bottom"
      paddingTop="tiny"
      dataHook={HeaderDataHooks.CategoryContainer}
    >
      <Text weight="bold" size="tiny">
        {t('setup.select.business.type')}
      </Text>
      {category && (
        <Box paddingLeft="tiny">
          <Text dataHook={HeaderDataHooks.Category} size="tiny">
            {category}
          </Text>
        </Box>
      )}
      <Box paddingLeft="tiny">
        <Tooltip
          disabled={hasPermission}
          dataHook={HeaderDataHooks.PermissionsTooltip}
          appendTo="scrollParent"
          content={t('setup.select-type.no_permission')}
        >
          <Box>
            <TextButton
              dataHook={HeaderDataHooks.CategorySelect}
              weight="thin"
              size="tiny"
              disabled={!hasPermission}
              onClick={openFeaturesModal}
            >
              {category
                ? t('setup.change.business.type')
                : t('setup.choose.business.type')}
            </TextButton>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};
