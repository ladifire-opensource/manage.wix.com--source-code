import { Messages } from 'yoshi-flow-bm-runtime';
import { wixAxiosInstanceConfig } from '@wix/wix-axios-config';

export const getMessages = async (
  baseUrl: string,
  language: string,
): Promise<Messages> => {
  const axios = await import('axios');
  const wixAxios = wixAxiosInstanceConfig(axios, {
    baseURL: '/',
  });

  const { data } = await wixAxios.get(
    `https://${baseUrl}assets/locale/messages_${language}.json`,
  );

  return data;
};
