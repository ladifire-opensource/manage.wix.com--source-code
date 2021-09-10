import { AxiosResponse } from 'axios';
import { Messages } from '@wix/wix-i18n-config';

export const fetchTranslations = async (baseUrl: string, language: string): Promise<Messages> => {
  const { wixAxios } = await import('@services/wix-axios');

  return wixAxios
    .get(`//${baseUrl}assets/locale/messages_${language}.json`)
    .then((response: AxiosResponse) => response.data)
    .catch(() => ({}));
};
