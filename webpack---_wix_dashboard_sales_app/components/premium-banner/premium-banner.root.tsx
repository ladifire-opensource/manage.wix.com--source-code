import React, { FC, useEffect, useMemo } from 'react';
import { biBannerLocationMapping } from '@src/common/bi-logger-maps';
import { BannerDismissProvider, BannerOfferProvider, StaticParamsProvider } from '@src/contexts';
import { createI18n } from '@src/i18n';
import { BannerInitialData, BannerPosition } from '@types';
import { ThemeProvider } from 'wix-style-react';
import { theme } from 'wix-style-react/themes/businessDashboard';
import { I18nextProvider, useBi, useExperiments, useModuleParams } from '@wix/yoshi-flow-bm';
import { PremiumBanner } from '.';
import './globals';

export interface PremiumBannerRootProps extends BannerInitialData {
  onLoaded?(): void;
}

export const PremiumBannerRoot: FC<PremiumBannerRootProps> = props => {
  const { bannerOffer, translations, userSiteName, primaryDomain, onLoaded } = props;
  const { metaSiteId, viewMode } = useModuleParams();
  const { experiments } = useExperiments();
  const biLogger = useBi();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    onLoaded?.();
  }, [onLoaded]);

  if (!bannerOffer) {
    return null;
  }

  const { offerId, offerName, realEstateId } = bannerOffer;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const i18n = useMemo(
    () => createI18n({ experiments: experiments.all(), translations }),
    [experiments, translations],
  );

  biLogger.util.updateDefaults({
    msid: metaSiteId,
    hosting: viewMode,
    asset_campaign_guid: realEstateId,
    asset_campaign_id: offerName,
    offering_guid: offerId,
    asset_location_on_page: biBannerLocationMapping[BannerPosition.BOTOOM],
    promotion_asset_type: 'externalUrl',
    visibility_trigger: 'normal',
  });

  return (
    <I18nextProvider i18n={i18n}>
      <BannerOfferProvider bannerOffer={bannerOffer}>
        <BannerDismissProvider>
          <StaticParamsProvider
            params={{
              siteName: userSiteName,
              primaryDomain,
            }}
          >
            <ThemeProvider theme={theme()}>
              <PremiumBanner />
            </ThemeProvider>
          </StaticParamsProvider>
        </BannerDismissProvider>
      </BannerOfferProvider>
    </I18nextProvider>
  );
};
