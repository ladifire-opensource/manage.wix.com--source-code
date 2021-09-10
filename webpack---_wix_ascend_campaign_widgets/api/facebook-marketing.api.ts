import { dsl } from '@wix/yoshi-serverless/wrap';

export const getFacebookMarketingCampaignInfo = dsl({
          functionName: 'getFacebookMarketingCampaignInfo',
          fileName: 'api/facebook-marketing.api',
        });