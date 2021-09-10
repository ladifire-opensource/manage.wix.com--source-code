import axios, { AxiosInstance } from 'axios';
import { wixAxiosInstanceConfig } from '@wix/wix-axios-config';

export let axiosInstance: AxiosInstance;

export const configureAxiosInstance = (createAxiosInstance: () => AxiosInstance): void => {
  if (!axiosInstance) {
    axiosInstance = createAxiosInstance();
  }
};

export const configureWixAxiosInstance = (options) => {
  configureAxiosInstance(() => wixAxiosInstanceConfig(axios, options));
};
