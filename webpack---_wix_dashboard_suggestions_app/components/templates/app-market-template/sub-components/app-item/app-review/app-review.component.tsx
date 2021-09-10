import React, { FC } from 'react';
import { Box, Badge } from 'wix-style-react';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { AppMarketTemplateDataHooks } from '@src/common/hooks';
import { AppRatingComponent } from './app-rating.component';

export interface AppReviewComponentProps {
  isNew: boolean;
  reviewStars: number;
  numberOfReview: number;
}

export const AppReviewComponent: FC<AppReviewComponentProps> = ({
  isNew,
  reviewStars,
  numberOfReview,
}) => {
  const { t } = useTranslation();
  return (
    <Box direction="horizontal" verticalAlign="middle" width="72px">
      {isNew && (
        <Box flex="1" align="center">
          <Badge skin="warning" size="small" dataHook={AppMarketTemplateDataHooks.NEW_BADGE}>
            {t('suggestion.widget.app-market-template.new')}
          </Badge>
        </Box>
      )}
      {!isNew && <AppRatingComponent reviewStars={reviewStars} numberOfReview={numberOfReview} />}
    </Box>
  );
};
