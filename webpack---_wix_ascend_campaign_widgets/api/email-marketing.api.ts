import { dsl } from '@wix/yoshi-serverless/wrap';

export const getEmailMarketingCampaignInfo = dsl({
          functionName: 'getEmailMarketingCampaignInfo',
          fileName: 'api/email-marketing.api',
        });