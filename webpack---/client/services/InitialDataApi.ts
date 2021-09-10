import {UrlBuiler} from '../../common/url-builder';
import {AxiosInstance} from 'axios';
import HttpClient from 'yoshi-server-client';
import {
  FetchInitialSiteLevelDataArgs,
  InitialSiteLevelData
} from 'client-api-types';
import {appDefId} from '../../common/constants';

const baseUrl = '/_api/premium-manage-subscriptions';
export const defaultApiUrlBuilder = UrlBuiler().api(baseUrl);
export class InitServerApi {
  client: HttpClient;
  apiUrlBuilder: ReturnType<ReturnType<typeof UrlBuiler>['api']>;
  constructor(
    private readonly httpService: AxiosInstance,
    private readonly level: 'account' | 'site'
  ) {
    this.apiUrlBuilder = UrlBuiler().api(baseUrl);
    this.client = new HttpClient({
      baseUrl
    });
  }

  private async getHeaders() {
    if (this.level === 'site') {
      return import('@wix/business-manager-api').then(api => {
        return {
          authorization: api.getCurrentInstance(appDefId)
        };
      });
    }

    return {};
  }

  fetchInitialSiteLevelData = async (
    args: FetchInitialSiteLevelDataArgs
  ): Promise<InitialSiteLevelData> => {
    const url =
      this.apiUrlBuilder.fetchInitialSiteLevelData +
      '?metaSiteId=' +
      args.metaSiteId;

    return this.httpService
      .get(url, {headers: {...(await this.getHeaders())}})
      .then(res => res.data);
  };
}
