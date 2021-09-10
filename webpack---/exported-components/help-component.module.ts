import { ResolveFn } from 'yoshi-flow-bm-runtime';
import { InitialData } from '@types';
import { getPartnersUrl } from '../services/partners-entrypoints';
import { buildSentryScope } from '../logging.utils';
import { Brand } from '@wix/business-manager-api';

export const resolve: ResolveFn<InitialData> = async ({
  moduleParams: { userId, metaSiteId, brand },
  sentry,
}) => {
  const initialData: InitialData = {
    partnersEntryPointUrl: '',
  };
  try {
    initialData.partnersEntryPointUrl = await getPartnersUrl(brand ?? Brand.WIX);
  } catch (error) {
    sentry.captureException(error, undefined, buildSentryScope({ userId, metaSiteId }));
  }
  return initialData;
};
