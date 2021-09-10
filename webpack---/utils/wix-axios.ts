import axios from 'axios';
import { wixAxiosInstanceConfig } from '@wix/wix-axios-config';

const adapter = process.env.NODE_ENV === 'test' ? require('axios/lib/adapters/http') : undefined;
export const wixAxios = wixAxiosInstanceConfig(axios, { baseURL: '/', adapter });
