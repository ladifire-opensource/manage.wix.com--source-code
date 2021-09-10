import React from 'react';
import { Box, TextButton, Text } from 'wix-style-react';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import { NO_PERMISSION_TOOLTIP_LINK, NO_PERMISSION_TOOLTIP_TEXT } from '../consts';
import { useSupportLinks, Article } from '../../../hooks/support-links';

export const NoPermissionTooltipContent = () => {
  const { t } = useTranslation();
  const { openArticle } = useSupportLinks();

  return (
    <Box direction="vertical">
      <Text size="tiny" weight="thin" light dataHook={NO_PERMISSION_TOOLTIP_TEXT}>
        {t('dashboard.customization.not_permitted')}
      </Text>
      <TextButton
        size="tiny"
        weight="normal"
        skin="light"
        underline="always"
        onClick={() =>
          openArticle({
            article: Article.RolesAndPermissions,
            referralInfo: 'learn-more-active-dashboard',
          })
        }
        dataHook={NO_PERMISSION_TOOLTIP_LINK}
      >
        {t('dashboard.customization.not_permitted_learn_more')}
      </TextButton>
    </Box>
  );
};
