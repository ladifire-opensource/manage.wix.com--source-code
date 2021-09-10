import React, { FC, memo } from 'react';
import { Box, Text } from 'wix-style-react';
import { RecommendedApp } from '@src/common/templates';
import { AppMarketTemplateDataHooks } from '@src/common/hooks';

const TOOLTIP_DELAY_MS = 250;

export interface AppTitleAndDescriptionComponentProps
  extends Pick<RecommendedApp, 'name' | 'description'> {}

export const AppTitleAndDescriptionComponent: FC<AppTitleAndDescriptionComponentProps> = memo(
  ({ name, description }) => {
    return (
      <Box direction="vertical">
        <Text
          dataHook={AppMarketTemplateDataHooks.APP_TITLE}
          maxLines={1}
          ellipsis
          tooltipProps={{
            enterDelay: TOOLTIP_DELAY_MS,
          }}
          size="tiny"
          tagName="div"
          weight="bold"
        >
          {name}
        </Text>
        <Text
          dataHook={AppMarketTemplateDataHooks.APP_DESCRIPTION}
          maxLines={3}
          ellipsis
          tooltipProps={{
            enterDelay: TOOLTIP_DELAY_MS,
          }}
          size="tiny"
          tagName="div"
          weight="thin"
          secondary
        >
          {description}
        </Text>
      </Box>
    );
  },
);
