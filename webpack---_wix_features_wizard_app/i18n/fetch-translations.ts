import axios, { AxiosResponse } from 'axios';
import { Messages } from '@wix/wix-i18n-config';

export const fetchTranslations = (
  baseUrl: string,
  language: string,
): Promise<Messages> =>
  axios
    .get(
      `${
        baseUrl ? '//' + baseUrl : 'http://localhost:3202/'
      }assets/locale/messages_${language}.json`,
    )
    .then((response: AxiosResponse) => response.data);
