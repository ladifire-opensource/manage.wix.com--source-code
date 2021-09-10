import axios, { AxiosInstance } from 'axios';
import { HttpClient } from './assignee-api';

export class AxiosHttpClient implements HttpClient {
  private readonly axiosClient: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  get(url, opts: any = {}) {
    return this.axiosClient.get(url, opts).then((_) => _.data);
  }

  post(url, body) {
    return this.axiosClient.post(url, body).then((_) => _.data);
  }

  patch(url, body) {
    return this.axiosClient.patch(url, body).then((_) => _.data);
  }

  delete(url) {
    return this.axiosClient.delete(url).then((_) => _.data);
  }
}

export const createAxiosInstance = (
  signedInstance: string,
  defaultHeaders: boolean = true,
) => {
  const DefaultHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    Authorization: signedInstance,
  };

  return axios.create({
    headers: defaultHeaders ? DefaultHeaders : {},
  });
};
