import React, { FC } from 'react';
import classnames from 'classnames';
import { TextWeight } from '@types';
import { StyledText } from '@components/premium-banner';
import { formatToHHMMSS } from './utils';
import styles from './countdown.scss';
import { PremiumBannerDataHooks } from '@data-hooks';

export interface CountdownComponentProps {
  timeLeft: number;
  color: string;
  weight: TextWeight;
}

export const CountdownComponent: FC<CountdownComponentProps> = ({ timeLeft, color, weight }) => (
  <div className={styles.countdownWrapper} data-hook={PremiumBannerDataHooks.COUNTDOWN}>
    <StyledText
      className={styles.countdown}
      plainText={formatToHHMMSS(timeLeft)}
      color={color}
      weight={weight}
      size="small"
      titleKey=""
    />
    <div className={styles.labelsWrapper}>
      <StyledText
        weight={TextWeight.NORMAL}
        size="small"
        color={color}
        titleKey="premium-banner.hours"
        className={styles.label}
      />
      <StyledText
        weight={TextWeight.NORMAL}
        size="small"
        color={color}
        titleKey="premium-banner.minutes"
        className={classnames(styles.label, styles.gapper)}
      />
      <StyledText
        weight={TextWeight.NORMAL}
        size="small"
        color={color}
        titleKey="premium-banner.seconds"
        className={styles.label}
      />
    </div>
  </div>
);
