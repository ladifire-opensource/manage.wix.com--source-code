import React, { FC, useEffect, useMemo } from 'react';
import { useBannerOffer } from '@contexts/banner-offer';
import { BannerOfferType, BannerPosition } from '@types';
import { useBi, useExperiments, useModuleParams, useSentry } from '@wix/yoshi-flow-bm';
import { UnknownTemplateError } from '@src/common/errors';
import { scopedSentry } from '@src/utils/logging';
import { PremiumBannerComponent } from '.';
import { fireBannerViewedEvent } from '@services/dealer-events/dealer-events.service';

export const PremiumBanner: FC = () => {
  const { type: bannerType, offerId, realEstateId } = useBannerOffer();
  const { metaSiteId, userId } = useModuleParams();
  const biLogger = useBi();
  const sentry = useSentry();

  useEffect(() => {
    biLogger.assetView({
      item_mode: 'open',
    });

    fireBannerViewedEvent(
      {
        offerId,
        realEstateId,
      },
      {
        sentry,
        metaSiteId,
        userId,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [biLogger, sentry]);

  if (!Object.values(BannerOfferType).includes(bannerType)) {
    scopedSentry({ metaSiteId, userId, sentry }).captureException(
      new UnknownTemplateError(offerId, bannerType),
    );

    return null;
  }

  return <PremiumBannerComponent bannerPosition={BannerPosition.BOTOOM} />;
};
