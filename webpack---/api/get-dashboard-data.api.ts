import { dsl } from 'yoshi-serverless/wrap';

export const getDashboardData = dsl({
          functionName: 'getDashboardData',
          fileName: 'api/get-dashboard-data.api',
        });