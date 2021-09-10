import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

export function getRetriableAxios({
  delay = 1000,
  retries = 3,
} = {}): AxiosInstance {
  const axiosInstance = axios.create();
  axiosRetry(axiosInstance, {
    retries,
    retryDelay: (retryCount) => retryCount * delay,
  });
  return axiosInstance;
}
