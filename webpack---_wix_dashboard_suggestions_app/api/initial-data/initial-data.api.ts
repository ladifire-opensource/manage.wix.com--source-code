import { dsl } from '@wix/yoshi-serverless/wrap';

export const getInitialDataAPI = dsl({
          functionName: 'getInitialDataAPI',
          fileName: 'api/initial-data/initial-data.api',
        });