import React, { FC, memo, useContext } from 'react';
import { PremiumBadge } from './premium-badge.component';
import { AppContext } from '../../../app-context/app-context';

export const PremiumBadgeContainer: FC = memo(() => {
  const {
    widgetData: { plan },
  } = useContext(AppContext);

  if (!plan?.name) {
    return null;
  }

  return <PremiumBadge />;
});
