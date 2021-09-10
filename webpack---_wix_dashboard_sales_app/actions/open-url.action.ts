import { BILogger, SentryHub } from '@wix/yoshi-flow-bm';
import { META_SITE_ID_PLACEHOLDER } from '@consts';
import { fireBannerClickEvent } from '@services/dealer-events/dealer-events.service';

export const injectMetasiteIdIfNeeded = (url: string, metaSiteId: string) =>
  url.replace(META_SITE_ID_PLACEHOLDER, metaSiteId);

export interface OpenUrlActionParams {
  metaSiteId: string;
  userId: string;
  biLogger: BILogger;
  offerId: string;
  realEstateId: string;
  sentry: SentryHub;
}

export const useOpenUrlAction =
  ({ biLogger, metaSiteId, userId, offerId, realEstateId, sentry }: OpenUrlActionParams) =>
  (url: string) => {
    biLogger.assetClick({
      click_type: 'click',
    });
    const finalUrl = injectMetasiteIdIfNeeded(url, metaSiteId);

    fireBannerClickEvent(
      { offerId, realEstateId, url: finalUrl },
      {
        sentry,
        metaSiteId,
        userId,
      },
    );

    window.open(finalUrl);
  };
