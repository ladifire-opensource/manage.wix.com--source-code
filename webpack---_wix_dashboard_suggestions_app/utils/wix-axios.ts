import { wixAxiosInstanceConfig } from '@wix/wix-axios-config';
import axios from 'axios';
import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';

export const wixAxios = wixAxiosInstanceConfig(axios, {
  baseURL: '/',
});

export const addAuthorization = (
  headers: any = {},
): {
  headers: {
    [headerName: string]: any;
  };
} => ({
  headers: {
    ...headers,
    ...getAuthorizationHeader(),
  },
});

export const getAuthorizationHeader = (): {
  Authorization: string;
} => ({
  Authorization: getCurrentInstance(appDefIds.metaSite),
});
