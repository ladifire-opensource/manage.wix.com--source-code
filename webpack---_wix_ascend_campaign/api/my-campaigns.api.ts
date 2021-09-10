import { dsl } from '@wix/yoshi-serverless/wrap';

export const getMyCampaignsIntialData = dsl({
          functionName: 'getMyCampaignsIntialData',
          fileName: 'api/my-campaigns.api',
        });