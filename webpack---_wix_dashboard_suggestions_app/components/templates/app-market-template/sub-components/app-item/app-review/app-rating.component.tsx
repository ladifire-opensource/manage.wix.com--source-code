import React, { FC } from 'react';
import { Box, Text } from 'wix-style-react';
import StarFilled from 'wix-ui-icons-common/StarFilled';
import { AppMarketTemplateDataHooks } from '@src/common/hooks';

export interface AppRatingComponentProps {
  reviewStars: number;
  numberOfReview: number;
}

export const AppRatingComponent: FC<AppRatingComponentProps> = ({
  reviewStars,
  numberOfReview,
}) => (
  <Box align="center" flex="1">
    <Box paddingRight="4px">
      <StarFilled size="18px" color="#FDB10C" />
    </Box>
    <Box verticalAlign="bottom" dataHook={AppMarketTemplateDataHooks.APP_REVIEW}>
      <Box paddingRight="4px">
        <Text
          size="tiny"
          weight="thin"
          color="dark"
          dataHook={AppMarketTemplateDataHooks.APP_REVIEW_RATING}
        >
          {reviewStars}
        </Text>
      </Box>
      <Box>
        <Text
          dataHook={AppMarketTemplateDataHooks.APP_REVIEW_RATE_COUNT}
          size="tiny"
          weight="thin"
          color="dark"
        >{`(${numberOfReview})`}</Text>
      </Box>
    </Box>
  </Box>
);
