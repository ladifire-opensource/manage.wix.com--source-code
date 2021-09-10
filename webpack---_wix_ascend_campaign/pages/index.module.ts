import { ResolveFn } from '@wix/yoshi-flow-bm';
import { getMyCampaignsIntialData } from '../api/my-campaigns.api';
import { CampaignSuggestion, CampaignVm } from '../types';

interface ResolvedProps {
  campaignSuggestions: CampaignSuggestion[];
  campaigns: CampaignVm[];
}

export const resolve: ResolveFn<ResolvedProps> = async ({ httpClient }) => {
  const {
    data: { campaignSuggestions, campaigns },
  } = await httpClient.request(getMyCampaignsIntialData());
  return {
    campaignSuggestions,
    campaigns,
  };
};
