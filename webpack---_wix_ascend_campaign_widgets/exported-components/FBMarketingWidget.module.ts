import { ResolveFn } from '@wix/yoshi-flow-bm';
import { getFacebookMarketingCampaignInfo } from '../api/facebook-marketing.api';
import { getPreviouslySelectedDateFilter } from '../components/CampaignWidgets/FBMarketingWidget/facebook-marketing-utils';
import { FacebookMarketingData } from '../services/interfaces';
import BiEventsFactory from '../utils/bi-events';
import { TimeFrame } from '../utils/time-range';

export interface ResolvedProps {
  facebookMarketingData: FacebookMarketingData;
  previouslySelectedDateFilter: TimeFrame;
}

export const resolve: ResolveFn<ResolvedProps> = async ({
  httpClient,
  getBILogger,
  moduleParams: { metaSiteId },
  fedopsLogger,
  getExperiments,
}) => {
  fedopsLogger.appLoadStarted();
  try {
    const experiments = await getExperiments();
    let previouslySelectedDateFilter = TimeFrame.LIFETIME;
    if (experiments.enabled('specs.ascend.FBMarketingOSWidgetDateFilter')) {
      previouslySelectedDateFilter = await getPreviouslySelectedDateFilter();
    }
    const { data: facebookMarketingData } = await httpClient.request(
      getFacebookMarketingCampaignInfo(previouslySelectedDateFilter),
    );
    return {
      facebookMarketingData,
      previouslySelectedDateFilter,
    };
  } catch (error) {
    const logger = await getBILogger();
    const biEvents = new BiEventsFactory(logger, metaSiteId);
    biEvents.facebookMarketingLoadFailure(error);
    throw error;
  }
};
