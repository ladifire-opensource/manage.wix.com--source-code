import { ResolveFn } from 'yoshi-flow-bm-runtime';
import { Messages } from '@wix/wix-i18n-config';
import { mapToSidebarData } from '@src/services/sidebar';
import { ProgressBarDataResponse } from '@src/components/sidebar-setup-progress/api';
import { fetchInitialData } from '@src/services/initial-data';

export interface ResolvedProps {
  messages: Messages;
  widgetData: ProgressBarDataResponse;
}

export const resolve: ResolveFn<ResolvedProps> = async ({
  moduleParams,
  sentry,
}) => {
  const { messages, widgetData } = await fetchInitialData(moduleParams, sentry);

  if (!widgetData) {
    throw Error('Failed to fetch widget data');
  }

  return {
    messages,
    widgetData: mapToSidebarData(widgetData),
  };
};
