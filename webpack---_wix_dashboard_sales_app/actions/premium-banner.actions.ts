import { useBannerDismiss } from '@contexts/banner-dismiss';
import { useBannerOffer } from '@contexts/banner-offer';
import { useOpenUrlAction } from './open-url.action';
import { useDismissBannerAction } from './dismiss-banner.action';
import { useBi, useModuleParams, useSentry } from '@wix/yoshi-flow-bm';

export interface Actions {
  openUrl: (url: string) => void;
  dismissBanner: () => void;
}

export const useActions = (): Actions => {
  const { setBannerDismiss } = useBannerDismiss();
  const biLogger = useBi();
  const { metaSiteId, userId } = useModuleParams();
  const { offerId, realEstateId } = useBannerOffer();
  const sentry = useSentry();

  return {
    openUrl: useOpenUrlAction({ biLogger, metaSiteId, userId, offerId, realEstateId, sentry }),
    dismissBanner: useDismissBannerAction({ setBannerDismiss, biLogger, metaSiteId, userId }),
  };
};
