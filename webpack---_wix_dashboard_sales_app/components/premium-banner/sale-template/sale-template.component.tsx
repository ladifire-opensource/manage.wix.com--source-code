import React from 'react';
import classnames from 'classnames';
import { useSalesBannerOfferData } from '@contexts/banner-offer';
import { PremiumBannerDataHooks } from '@data-hooks';
import { Box, Divider } from 'wix-style-react';
import { StyledText, StyledButton } from '..';
import { SaleTextsAndCountdown } from './sale-texts-and-countdown/sale-texts-and-countdown.component';
import styles from './sale-template.scss';

export const SaleTemplateComponent = () => {
  const { subtitleBefore, subtitleAfter, title, cta, counter, legalNote, dismissible } =
    useSalesBannerOfferData();
  const {
    datetime: legalDatetime,
    color: legalColor,
    weight: legalWeight,
    titleKey: legalTitleKey,
  } = legalNote!;

  return (
    <Box
      className={classnames(styles.saleTemplate, { [styles.dismissible]: dismissible })}
      verticalAlign="middle"
      dataHook={PremiumBannerDataHooks.SALE_TYPE}
    >
      <Box className={classnames(styles.texts)}>
        <SaleTextsAndCountdown
          title={title}
          subtitleBefore={subtitleBefore}
          subtitleAfter={subtitleAfter}
          counter={counter}
        />
      </Box>
      <Box className={styles.button}>
        <StyledButton {...cta} dataHook={PremiumBannerDataHooks.CTA_BUTTON} />
      </Box>
      <Divider className={styles.divider} direction="vertical" />
      <Box className={styles.legal}>
        <StyledText
          color={legalColor}
          weight={legalWeight}
          titleKey={legalTitleKey}
          dateValue={legalDatetime}
          className={styles.legalText}
          dataHook={PremiumBannerDataHooks.LEGAL_NOTE}
        />
      </Box>
    </Box>
  );
};
