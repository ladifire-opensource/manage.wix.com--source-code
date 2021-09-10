import {
  ISearchEverythingAPIResponse, IQueryParams, DataType, SearchEverythingType,
  IServiceSearchResults, IBusinessManagerSearchResult
} from "../../types/index";
import axios from 'axios';
import { AXIOS_TIMEOUT } from '../constants';
import { ISearchEverythingPayload, ILinkPayload, IModalPayload, IURLAPIResponse } from '../../types/services';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';

const searchEverythingUrlFormat = (query: string, page: number) => `/_api/search-everything/v1/search/${query}?limit=500${page ? '?page=' + page.toString() : ''}`;

const getURLsWithMetaSiteId = (path: string, metaSiteId: string) =>
  path && path.replace('{{META_SITE_ID}}', metaSiteId) || '';

const getResultPayload = (response: ISearchEverythingAPIResponse, metaSiteId: string): ISearchEverythingPayload => {
  if (response.type === SearchEverythingType.Url) {
    return {
      type: SearchEverythingType.Url,
      path: getURLsWithMetaSiteId((response as IURLAPIResponse).path, metaSiteId)
    };
  }

  if (response.type === SearchEverythingType.Link) {
    const { pageComponentId, appState } = (response as ILinkPayload);
    return {
      type: SearchEverythingType.Link,
      pageComponentId,
      appState,
    };
  }

  const { modalType } = (response as IModalPayload);
  return {
    type: SearchEverythingType.Modal,
    modalType
  };
};

export class SearchEverythingService {

  static pageSize = 5;

  static async search({ query, metaSiteId, page }: IQueryParams): Promise<IServiceSearchResults> {
    const searchEverythingUrl = searchEverythingUrlFormat(query, page);
    const result = await axios.get(searchEverythingUrl, {
      timeout: AXIOS_TIMEOUT,
      headers: {
        Authorization: getCurrentInstance(appDefIds.metaSite)
      }
    });

    const apiResults: ISearchEverythingAPIResponse[] = result.data && result.data.results || [];
    const results = apiResults.map<IBusinessManagerSearchResult>(response => ({
      type: DataType.BusinessManager,
      id: response.id,
      title: response.title,
      snippet: response.snippet,
      icon: response.icon,
      payload: getResultPayload(response, metaSiteId)
    }));

    const totalResults = result.data && result.data.totalResults;

    return { results, totalResults, availableResults: results.length };
  }
}
