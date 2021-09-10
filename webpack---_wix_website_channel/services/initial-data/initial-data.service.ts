import { IHttpClient } from '@wix/yoshi-flow-bm';
import {
  getInitialData as getInitialDataApi,
  InitialDataResponse as InitialDataApiResponse,
} from '../../api';

export interface InitialDataParams {
  httpClient: IHttpClient;
}

export interface InitialData extends InitialDataApiResponse {}

export const getInitialData = async ({
  httpClient,
}: InitialDataParams): Promise<InitialData> => {
  const { data } = await httpClient.request(getInitialDataApi());

  return data;
};
