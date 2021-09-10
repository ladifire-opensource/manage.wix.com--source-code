import React, { FC } from 'react';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import { Text, Box } from 'wix-style-react';
import * as styles from './unpublished-badge.scss';
import { UNPUBLISHED_BADGE_DATA_HOOK } from '@src/components/data-hooks';

export const UnpublishedBadge: FC = () => {
  const [t] = useTranslation();

  return (
    <div className={styles.container}>
      <Box paddingBottom="2px" paddingTop="2px" align="center">
        <Text
          light
          weight="bold"
          dataHook={UNPUBLISHED_BADGE_DATA_HOOK}
          className={styles['caption-c1']}
        >
          {t('unpublished')}
        </Text>
      </Box>
    </div>
  );
};
