import { set } from 'lodash';
import axios, { AxiosRequestConfig } from 'axios';

export const createAuthInterceptor = (getInstance: () => string) => (config: AxiosRequestConfig) => {
  set(config, 'headers.common.Authorization', getInstance());
  return config;
};

export const createAxiosInstance = (baseUrl: string, getInstance: () => string) => {
  const instance = axios.create({ baseURL: baseUrl });
  instance.interceptors.request.use(createAuthInterceptor(getInstance));
  return instance;
};
