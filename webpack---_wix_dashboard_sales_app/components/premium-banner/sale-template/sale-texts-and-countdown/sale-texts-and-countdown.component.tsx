import React, { FC, useCallback } from 'react';
import { Box } from 'wix-style-react';
import { SaleTemplateData } from '@types';
import { Countdown, StyledText } from '@components/premium-banner';
import { PremiumBannerDataHooks } from '@data-hooks';
import classnames from 'classnames';
import styles from './sale-texts-and-countdown.scss';

export interface SaleTextsProps
  extends Pick<SaleTemplateData, 'title' | 'subtitleBefore' | 'subtitleAfter' | 'counter'> {}

export const SaleTextsAndCountdown: FC<SaleTextsProps> = ({
  title,
  subtitleBefore,
  subtitleAfter,
  counter,
}) => {
  const renderSecondLineTexts = useCallback(
    () => (
      <>
        {subtitleBefore && (
          <StyledText
            {...subtitleBefore}
            size="small"
            dataHook={PremiumBannerDataHooks.SUBTITLE_BEFORE}
          />
        )}
        {subtitleBefore && subtitleAfter && (
          <>
            &nbsp;
            <StyledText
              {...subtitleAfter}
              size="small"
              dataHook={PremiumBannerDataHooks.SUBTITLE_AFTER}
            />
          </>
        )}
      </>
    ),
    [subtitleBefore, subtitleAfter],
  );

  return (
    <Box
      className={classnames(styles.saleTextsAndCountdown, { [styles.hasCountdown]: counter })}
      direction="vertical"
    >
      <span className={styles.firstLineWrapper}>
        <StyledText
          {...title}
          className={styles.firstLineBefore}
          size="small"
          dataHook={PremiumBannerDataHooks.TITLE}
        />
        {counter && <Countdown {...counter} />}
      </span>
      {!counter && (
        <span className={styles.secondLineWrapper} data-hook={PremiumBannerDataHooks.SECOND_LINE}>
          {renderSecondLineTexts()}
        </span>
      )}
    </Box>
  );
};
