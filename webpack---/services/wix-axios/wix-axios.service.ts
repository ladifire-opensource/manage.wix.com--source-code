import { wixAxiosInstanceConfig } from '@wix/wix-axios-config';
import axios from 'axios';

export const wixAxios = wixAxiosInstanceConfig(axios, {
  baseURL: '/',
});
