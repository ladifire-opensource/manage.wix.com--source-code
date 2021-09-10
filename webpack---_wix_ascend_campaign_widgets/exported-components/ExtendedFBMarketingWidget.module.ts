import { ResolveFn } from '@wix/yoshi-flow-bm';
import { getFacebookMarketingCampaignInfo } from '../api/facebook-marketing.api';
import { FacebookMarketingData } from '../services/interfaces';

export interface ResolvedProps {
  facebookMarketingData?: FacebookMarketingData;
  isError: boolean;
}

export const resolve: ResolveFn<ResolvedProps> = async ({
  httpClient,
  moduleParams: { metaSiteId },
  fedopsLogger,
}) => {
  try {
    fedopsLogger.appLoadStarted();
    const { data: facebookMarketingData } = await httpClient.request(
      getFacebookMarketingCampaignInfo(),
    );
    return {
      facebookMarketingData,
      isError: false,
    };
  } catch (error) {
    const { default: BiEventsFactory } = await import(
      /* webpackPrefetch: true, webpackChunkName: 'promote-bi-events' */ '../utils/promote-bi-events'
    );
    const biEvents = new BiEventsFactory(metaSiteId);
    biEvents.widgetLoadError('FB_ADS', error);
    return {
      facebookMarketingData: {
        facebookMarketingInfo: undefined,
        shouldShowTrafficEmptyState: false,
      },
      isError: true,
    };
  }
};
