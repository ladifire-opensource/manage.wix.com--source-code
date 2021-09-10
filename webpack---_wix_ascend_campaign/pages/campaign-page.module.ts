import { ResolveFn } from '@wix/yoshi-flow-bm';
import { getMyCampaignsIntialData } from '../api/my-campaigns.api';
import { MODULE_STATUS, QUERY_PARAMS } from '../constants';
import { CampaignPageIndexProps } from './campaign-page';

export const resolve: ResolveFn<CampaignPageIndexProps> = async ({
  httpClient,
}) => {
  const {
    data: { campaignSuggestions },
  } = await httpClient.request(getMyCampaignsIntialData());

  const query = new URLSearchParams(window.location.search);

  const campaignSuggestionId = query.get(QUERY_PARAMS.CAMPAIGN_SUGGESTION_ID);
  const campaignSuggestion = campaignSuggestions.find(
    (_campaignSuggestion) =>
      _campaignSuggestion.campaignSuggestionId === campaignSuggestionId,
  );

  const status: MODULE_STATUS = !campaignSuggestionId
    ? MODULE_STATUS.ERROR_MISSING_CAMPAIGN_SUGGESTION
    : campaignSuggestionId && !campaignSuggestion
    ? MODULE_STATUS.ERROR_CAMPAIGN_SUGGESTION_NOT_VALID
    : MODULE_STATUS.SUCCESS;

  return {
    status,
    campaignSuggestion,
  };
};
