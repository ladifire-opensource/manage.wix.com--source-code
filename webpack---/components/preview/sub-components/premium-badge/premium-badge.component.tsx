import React, { FC } from 'react';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import { Badge } from 'wix-style-react';
import * as styles from './premium-badge.scss';
import { PREMIUM_BADGE_DATA_HOOK } from '@src/components/data-hooks';

export const PremiumBadge: FC = () => {
  const [t] = useTranslation();

  return (
    <Badge
      size="small"
      skin="premium"
      dataHook={PREMIUM_BADGE_DATA_HOOK}
      className={styles.container}
    >
      {t('premium')}
    </Badge>
  );
};
