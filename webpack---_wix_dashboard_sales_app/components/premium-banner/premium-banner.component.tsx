import React, { useCallback, FC } from 'react';
import { useBannerOffer } from '@contexts/banner-offer';
import { useBannerDismiss } from '@contexts/banner-dismiss';
import { BannerOfferType, BannerPosition } from '@types';
import {
  PromoteTemplateComponent,
  SaleTemplateComponent,
  DelayedAnimation,
} from '@components/premium-banner';
import { useActions } from '@src/actions/premium-banner.actions';
import { PremiumBannerDataHooks } from '@data-hooks';
import { Box, IconButton } from 'wix-style-react';
import { DismissSmall } from 'wix-ui-icons-common';
import classnames from 'classnames';
import styles from './premium-banner.scss';
import { positionToAnimationConfig } from './animation-config';

export interface PremiumBannerComponentProps {
  bannerPosition: BannerPosition;
}

export const PremiumBannerComponent: FC<PremiumBannerComponentProps> = ({ bannerPosition }) => {
  const { type: bannerType, data } = useBannerOffer();
  const { isBannerDismissed } = useBannerDismiss();
  const { dismissBanner } = useActions();

  const renderTemplate = useCallback(() => {
    if (bannerType === BannerOfferType.PROMOTE) {
      return <PromoteTemplateComponent />;
    }
    if (bannerType === BannerOfferType.SALE) {
      return <SaleTemplateComponent />;
    }
  }, [bannerType]);

  const renderDismiss = useCallback(
    () => (
      <IconButton
        className={styles.dismissIcon}
        size="tiny"
        onClick={dismissBanner}
        dataHook={PremiumBannerDataHooks.DISMISS_BUTTON}
      >
        <DismissSmall />
      </IconButton>
    ),
    [dismissBanner],
  );

  return (
    <DelayedAnimation
      height
      translate={positionToAnimationConfig[bannerPosition]}
      show={!isBannerDismissed}
    >
      <Box
        className={classnames(styles.premiumBanner, {
          [styles.dismissible]: data.dismissible,
          [styles.closerToBorder]: bannerPosition === BannerPosition.TOP,
        })}
        dataHook={PremiumBannerDataHooks.PREMIUM_BANNER}
        verticalAlign="middle"
        align="center"
        backgroundColor={data.backgroundColor}
      >
        <DelayedAnimation delayDuration="low" opacity show={!isBannerDismissed}>
          {renderTemplate()}
        </DelayedAnimation>
        {data.dismissible && renderDismiss()}
      </Box>
    </DelayedAnimation>
  );
};
