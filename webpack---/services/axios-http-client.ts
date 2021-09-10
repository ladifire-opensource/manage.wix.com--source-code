import axios, {AxiosInstance} from 'axios';
import {HttpClient} from './api';

export default class AxiosHttpClient implements HttpClient {
  axiosClient: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  get(url, opts: any = {}) {
    return this.axiosClient.get(url, opts).then(_ => _.data);
  }

  post(url, body) {
    return this.axiosClient.post(url, body).then(_ => _.data);
  }

  patch(url, body) {
    return this.axiosClient.patch(url, body).then(_ => _.data);
  }

  delete(url) {
    return this.axiosClient.delete(url).then(_ => _.data);
  }
}

export const createAxiosInstance = (instance: string, defaultHeaders: boolean = true) => {
  const DefaultHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: instance
  };

  return axios.create({
    headers: defaultHeaders ? DefaultHeaders : {}
  });
};
