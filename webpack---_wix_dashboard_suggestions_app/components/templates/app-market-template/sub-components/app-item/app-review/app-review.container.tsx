import React, { FC } from 'react';
import { RecommendedApp } from '@src/common/templates';
import { AppReviewComponent } from './app-review.component';

export interface AppReviewProps extends Pick<RecommendedApp, 'reviewStars' | 'numberOfReviews'> {}

export const AppReview: FC<AppReviewProps> = ({ reviewStars, numberOfReviews }) => (
  <AppReviewComponent
    reviewStars={reviewStars}
    numberOfReview={numberOfReviews}
    isNew={numberOfReviews === 0}
  />
);
