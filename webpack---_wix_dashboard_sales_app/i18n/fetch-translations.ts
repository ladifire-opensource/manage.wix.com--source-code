import { Messages, IHttpClient, HttpResponse } from '@wix/yoshi-flow-bm';

export const fetchTranslations = (
  client: IHttpClient,
  baseUrl: string,
  language: string,
): Promise<Messages> =>
  client
    .get(`${baseUrl}assets/locale/messages_${language}.json`)
    .then((response: HttpResponse) => response.data);
