import { BILogger } from '@wix/yoshi-flow-bm';
import { saveDismissAction } from '@services/dismiss-expiration';

export interface DismissBannerActionParams {
  metaSiteId: string;
  userId: string;
  biLogger: BILogger;
  setBannerDismiss: (value: boolean) => void;
}

export const useDismissBannerAction =
  ({ metaSiteId, userId, setBannerDismiss, biLogger }: DismissBannerActionParams) =>
  () => {
    biLogger.assetClick({
      click_type: 'close',
    });
    saveDismissAction(metaSiteId, userId);
    setBannerDismiss(true);
  };
