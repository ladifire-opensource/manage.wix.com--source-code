import { IHttpClient, HttpResponse } from '@wix/yoshi-flow-bm';

export const fetchTranslations = (httpClient: IHttpClient, baseUrl: string, language: string) =>
  httpClient
    .get(`${baseUrl}assets/locale/messages_${language}.json`)
    .then((response: HttpResponse) => response.data);
