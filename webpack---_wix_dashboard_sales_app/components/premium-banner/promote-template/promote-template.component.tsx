import React from 'react';
import { usePromoteBannerOfferData } from '@contexts/banner-offer';
import { StyledText, StyledButton } from '..';
import { PremiumBannerDataHooks } from '@data-hooks';
import { Box } from 'wix-style-react';
import styles from './promote-template.scss';

export const PromoteTemplateComponent = () => {
  const { titleAfter, titleBefore, cta } = usePromoteBannerOfferData();

  return (
    <Box
      className={styles.promoteTemplate}
      verticalAlign="middle"
      dataHook={PremiumBannerDataHooks.PROMOTE_TYPE}
    >
      <span className={styles.textWrapper}>
        <StyledText {...titleBefore} dataHook={PremiumBannerDataHooks.TITLE_BEFORE} />
        {titleAfter && (
          <>
            &nbsp;
            <StyledText {...titleAfter} dataHook={PremiumBannerDataHooks.TITLE_AFTER} />
          </>
        )}
      </span>
      <Box className={styles.button}>
        <StyledButton {...cta} dataHook={PremiumBannerDataHooks.CTA_BUTTON} />
      </Box>
    </Box>
  );
};
