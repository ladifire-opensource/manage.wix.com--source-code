import axios, {AxiosInstance} from 'axios';
import {HttpClient} from './workflow-api';
import {
  getCurrentInstance,
  appDefIds,
} from '@wix/business-manager-api';

export class AxiosHttpClient implements HttpClient {
  private axiosClient: AxiosInstance;

  constructor(axiosClient: AxiosInstance, updateError?: Function) {
    this.axiosClient = axiosClient;
    if (updateError) {
      this.axiosClient.interceptors.response.use(res => res, err => updateError(err));
    }
  }

  get(url, opts: any = {}) {
    return this.axiosClient.get(url, {
      ...opts,
      ...withAuthorizationHeader()
    });
  }

  post(url, body) {
    return this.axiosClient.post(url, body, withAuthorizationHeader());
  }

  patch(url, body) {
    return this.axiosClient.patch(url, body, withAuthorizationHeader());
  }

  delete(url) {
    return this.axiosClient.delete(url, withAuthorizationHeader());
  }
}

const withAuthorizationHeader = () => {
  return {
    headers: {
      Authorization: getCurrentInstance(appDefIds.workflow)
    }
  };
};

export const createAxiosInstance = (defaultHeaders: boolean = true) => {
  const DefaultHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
  };

  return axios.create({
    headers: defaultHeaders ? DefaultHeaders : {}
  });
};
