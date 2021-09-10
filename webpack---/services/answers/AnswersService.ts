import { AXIOS_TIMEOUT } from '../constants';
import { DataType, IServiceSearchResults, IAnswersSearchResult, IAnswersAPIResponse, IQueryParams } from '../../types';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import axios from 'axios';

const answersSearchUrlFormat = (query: string) => `/_api/search-everything/v1/answers/search/${query}?limit=3`; // 30

export class AnswersService {

  static pageSize = 3;

  static async search({ query }: IQueryParams): Promise<IServiceSearchResults> {
    const searchEverythingUrl = answersSearchUrlFormat(query);
    const result = await axios.get(searchEverythingUrl, {
      timeout: AXIOS_TIMEOUT,
      headers: {
        Authorization: getCurrentInstance(appDefIds.metaSite)
      }
    });
    const apiResults: IAnswersAPIResponse[] = result.data && result.data.results || [];
    const totalResults = /* result.data && result.data.totalResults ||*/ apiResults.length;

    const results = apiResults.map<IAnswersSearchResult>(({ id, title, url }) => ({
      type: DataType.Answers,
      id,
      title,
      payload: {
        url
      }
    }));

    return { results, totalResults, availableResults: results.length };
  }
}
