import React, { useState, FC, useEffect, useCallback } from 'react';
import { hasValidDismiss } from '@services/dismiss-expiration';
import { useModuleParams } from '@wix/yoshi-flow-bm';
import { BannerDismissContext, BannerDismissProvided } from './banner-dismiss.context';

export const BannerDismissProvider: FC = ({ children }) => {
  const { metaSiteId, userId } = useModuleParams();
  const [dismissed, setBannerDismiss] = useState(true);

  const updateDismissFromStorage = useCallback(async () => {
    setBannerDismiss(await hasValidDismiss(metaSiteId, userId));
  }, [metaSiteId, userId]);

  useEffect(() => {
    updateDismissFromStorage();
  }, [updateDismissFromStorage]);

  const providedValue = {
    isBannerDismissed: dismissed,
    setBannerDismiss,
  } as BannerDismissProvided;

  return (
    <BannerDismissContext.Provider value={providedValue}>{children}</BannerDismissContext.Provider>
  );
};
