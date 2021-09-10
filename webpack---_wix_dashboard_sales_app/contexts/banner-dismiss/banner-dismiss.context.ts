import { createContext, useContext } from 'react';

export interface BannerDismissProvided {
  isBannerDismissed: boolean;
  setBannerDismiss: (isDismissed: boolean) => void;
}

export const BannerDismissContext = createContext({} as BannerDismissProvided);

export const useBannerDismiss = () => useContext(BannerDismissContext);
