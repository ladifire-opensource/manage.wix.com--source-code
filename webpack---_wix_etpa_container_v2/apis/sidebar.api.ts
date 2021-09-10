import { dsl } from '@wix/yoshi-serverless/wrap';

export const getQuickLinksCategory = dsl({
          functionName: 'getQuickLinksCategory',
          fileName: 'apis/sidebar.api',
        });

export const getAppCategory = dsl({
          functionName: 'getAppCategory',
          fileName: 'apis/sidebar.api',
        });