import AdminAccess from 'wix-ui-icons-common/AdminAccess';
import React, { FC } from 'react';
import { Box, Divider, Card, Text, TextButton } from 'wix-style-react';
import { useTranslation } from '@wix/wix-i18n-config';
import { NoPermissionDataHooks } from '../../../utils/no-permission-widget.data-hooks';
import { useSupportLinks, Article } from '../../../hooks/support-links';

interface Props {
  widgetTitle: string;
  widgetId: string;
}

export const NoPermissionWidgetComponent: FC<Props> = ({ widgetTitle, widgetId }) => {
  const { t } = useTranslation();
  const { openArticle } = useSupportLinks();

  return (
    <Card dataHook={`${NoPermissionDataHooks.Component}-${widgetId}`}>
      <Card.Header dataHook={NoPermissionDataHooks.CardHeader} title={widgetTitle} />
      <Card.Content>
        <Box>
          <Box verticalAlign="top" paddingRight="8px" maxWidth="24px" maxHeight="28px">
            <AdminAccess size="medium" color="D20" />
          </Box>
          <Divider direction="vertical" />
          <Box direction="vertical" paddingLeft="12px">
            <Text size="tiny" dataHook={NoPermissionDataHooks.Text}>
              {t('dashboard.widget.not_permitted')}
              {` `}
              <TextButton
                as="a"
                target="_blank"
                size="tiny"
                onClick={() =>
                  openArticle({
                    article: Article.RolesAndPermissions,
                    referralInfo: 'learn-more-non-permitted-widget',
                  })
                }
                dataHook={NoPermissionDataHooks.LearnMore}
              >
                {t('dashboard.widget.not_permitted_learn_more')}
              </TextButton>
            </Text>
          </Box>
        </Box>
      </Card.Content>
    </Card>
  );
};
