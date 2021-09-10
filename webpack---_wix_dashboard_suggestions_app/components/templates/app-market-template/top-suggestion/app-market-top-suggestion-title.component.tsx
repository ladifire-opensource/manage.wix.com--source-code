import { Box, Text, Badge } from 'wix-style-react';
import React from 'react';
import { AppMarketTemplateDataHooks } from '@src/common/hooks';
import { getNonWidowsText } from '@src/common/utils';
import { useTranslation } from '@wix/yoshi-flow-bm';

export interface AppMarketTopSuggestionTitleProps {
  title: string;
  isNew: boolean;
}
export const AppMarketTopSuggestionTitle: React.FC<AppMarketTopSuggestionTitleProps> = ({
  title,
  isNew,
}) => {
  const { t } = useTranslation();
  return (
    <Box align="left" dataHook={AppMarketTemplateDataHooks.APP_TITLE_WRAPPER}>
      <Text
        showTooltip={false}
        size="small"
        skin="standard"
        tagName="span"
        weight="bold"
        maxLines={2}
      >
        <Box display="inline">
          <Box display="inline" marginRight="8px" dataHook={AppMarketTemplateDataHooks.APP_TITLE}>
            {getNonWidowsText(title)}
          </Box>
          {isNew && (
            <Badge skin="warning" size="small">
              <Box
                paddingLeft="8px"
                paddingRight="8px"
                dataHook={AppMarketTemplateDataHooks.NEW_BADGE}
              >
                {t('suggestion.widget.app-market-template.new')}
              </Box>
            </Badge>
          )}
        </Box>
      </Text>
    </Box>
  );
};
