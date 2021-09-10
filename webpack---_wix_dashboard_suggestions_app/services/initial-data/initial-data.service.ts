import { InitialData } from '../../common/types/types';
import { fetchTranslations } from '../../i18n/fetch-translations';
import { IHttpClient, Messages } from '@wix/yoshi-flow-bm';
import { getInitialDataAPI } from '../../api';
import { ViewType, ViewsSuggestions } from '../../common/types';

export const INITIAL_DATA_API_ENDPOINT_URL = '/_serverless/dashboard-suggestions/initial-data';

export interface InitialDataParams {
  view: ViewType;
  includeSortedTags?: boolean;
  translationUrl: string;
  accountLanguage: string;
  reportError: (e: Error) => void;
  httpClient: IHttpClient;
}

let translationsPromise: Promise<Messages>;
let viewsSuggestions: ViewsSuggestions;

const getInitialDataHandled = async (reportError: (e: Error) => void, httpClient: IHttpClient) => {
  try {
    const { data } = await httpClient.request(getInitialDataAPI());
    return data;
  } catch (e) {
    reportError(e);
    return null;
  }
};

export const getInitialData = async (params: InitialDataParams) => {
  const { reportError, translationUrl, accountLanguage, view, includeSortedTags, httpClient } =
    params;

  try {
    translationsPromise =
      translationsPromise || fetchTranslations(httpClient, translationUrl, accountLanguage);

    const [initialDataResponse, translations] = await Promise.all([
      getInitialDataHandled(reportError, httpClient),
      translationsPromise,
    ]);

    const initialData: InitialData = {
      translations,
    };

    const data = initialDataResponse;
    if (data) {
      viewsSuggestions = data.viewsSuggestions;
      initialData.phase = data.phase;
      initialData.suggestions = data.viewsSuggestions[view];
      includeSortedTags && (initialData.sortedTags = data.sortedTags);
      initialData.defaultReminderDays = data.defaultReminderDays;
    }
    return initialData;
  } catch (e) {
    reportError(e);
    throw e;
  }
};

export const useViewsSuggestions = () => viewsSuggestions;
