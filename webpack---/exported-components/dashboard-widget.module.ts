import { ResolveFn } from 'yoshi-flow-bm-runtime';

import { wixAxiosInstanceConfig } from '@wix/wix-axios-config';
import axios from 'axios';
import { ServerResponse } from '@wix/dashboard-site-details-api';

import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';

export const wixAxios = wixAxiosInstanceConfig(axios, {
  baseURL: '/',
});

export const fetchWidgetData = async (): Promise<ServerResponse> => {
  const headers = {
    Authorization: getCurrentInstance(appDefIds.dashboard),
  };

  return (
    await wixAxios.get('/_serverless/dashboard-site-details/widget-data', {
      headers,
    })
  ).data;
};

export const resolve: ResolveFn<{ serverResponse: ServerResponse }> = async ({
  moduleParams,
  sentry,
}) => {
  try {
    const widgetData = await fetchWidgetData();

    return {
      serverResponse: {
        ...widgetData,
      },
    };
  } catch (e) {
    const { metaSiteId, userId } = moduleParams;
    const { Scope } = await import('@sentry/hub');
    const scope = new Scope().setTags({ metaSiteId, userId });
    scope.setTag('widget', 'site-details-app');
    scope.setTag('action', 'fetch initial data');

    sentry.captureException(e, undefined, scope as any);
    return { serverResponse: {} as ServerResponse };
  }
};
