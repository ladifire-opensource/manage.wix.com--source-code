import { dsl } from 'yoshi-serverless/wrap';

export const getAvailableWidgets = dsl({
          functionName: 'getAvailableWidgets',
          fileName: 'api/get-available-widgets.api',
        });