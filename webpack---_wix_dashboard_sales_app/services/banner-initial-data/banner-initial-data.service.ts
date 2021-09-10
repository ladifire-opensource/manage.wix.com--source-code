import { fetchTranslations } from '@src/i18n/fetch-translations';
import { IHttpClient } from '@wix/yoshi-flow-bm';
import { BannerInitialData } from '@types';
import { getInitialData as getInitialDataAPI } from '@src/api';
import { isSiteNameNeeded, parseStringDates } from './utils';
import { NoSiteNameError } from '@src/common/errors';

export interface InitialDataParams {
  translationUrl: string;
  accountLanguage: string;
  httpClient: IHttpClient;
}

export const getInitialData = async ({
  translationUrl,
  accountLanguage,
  httpClient,
}: InitialDataParams): Promise<BannerInitialData> => {
  const [translations, initialDataResponse] = await Promise.all([
    fetchTranslations(httpClient, translationUrl, accountLanguage),
    httpClient.request(getInitialDataAPI()),
  ]);

  const initialData = parseStringDates(initialDataResponse.data);

  if (
    initialData.bannerOffer &&
    !initialData.userSiteName &&
    isSiteNameNeeded(initialData.bannerOffer, translations)
  ) {
    throw new NoSiteNameError();
  }

  return {
    translations,
    ...initialData,
  } as BannerInitialData;
};
