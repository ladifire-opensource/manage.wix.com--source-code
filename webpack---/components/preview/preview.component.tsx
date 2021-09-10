import React, { FC, memo } from 'react';
import { ImageWrapperContainer } from './sub-components/image-wrapper/image-wrapper.container';
import * as styles from './preview.scss';
import { UnpublishedBadgeContainer } from './sub-components/unpublished-badge';
import { PremiumBadgeContainer } from './sub-components/premium-badge';

export const Preview: FC = memo(() => (
  <div className={styles.container}>
    <PremiumBadgeContainer />
    <ImageWrapperContainer />
    <UnpublishedBadgeContainer />
  </div>
));
