import React, { FC, memo } from 'react';
import { useModuleParams } from 'yoshi-flow-bm-runtime';
import { UnpublishedBadge } from './unpublished-badge.component';

export const UnpublishedBadgeContainer: FC = memo(() => {
  const { liveSite } = useModuleParams();

  if (liveSite?.isSitePublished) {
    return null;
  }

  return <UnpublishedBadge />;
});
