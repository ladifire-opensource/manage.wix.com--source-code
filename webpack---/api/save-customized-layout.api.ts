import { dsl } from 'yoshi-serverless/wrap';

export const saveCustomizedLayout = dsl({
          functionName: 'saveCustomizedLayout',
          fileName: 'api/save-customized-layout.api',
        });

export const getCustomizedLayout = dsl({
          functionName: 'getCustomizedLayout',
          fileName: 'api/save-customized-layout.api',
        });