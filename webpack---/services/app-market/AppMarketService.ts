import {
  IAppMarketAPIResponse, IQueryParams, DataType, IServiceSearchResults,
  IAppMarketSearchResult, INewAppMarketAPIResponse
} from '../../types';
import axios from 'axios';
import { AXIOS_TIMEOUT } from '../constants';
import { isAppInstalled } from '@wix/business-manager-api';

const APP_MARKET_PAGE_SIZE = 3;

const appMarketSearchUrlFormat = (query: string, isADI: boolean = false, locale: string) => {
  const filter = encodeURIComponent(query);
  const adiFilter = isADI ? '&dashboard=only' : '';
  return `/_api/app-market-api/apps/?filter=${filter}${adiFilter}&lang=${locale}&limit=${APP_MARKET_PAGE_SIZE}&exclude=editor_1.4_incompatible,ecommerce_old&fields=appDefinitionId,appType,by,downloadsAllTime,externalPremium,frontPageImage,hasDashboard,hasMobile,hasPremium,isTrial,isWixLabs,name,premiumOnly,publishedAt,slug,teaser,widgets,wixComponentId,isWixComponent,appType,hasSection,dashboard,overrideDashboardUrl,listWidgetId,price,hideAppFirstTimeMsg,roundIcon,appIcon,overrideDashboardLink,listedInMarket,appFields`;
};

export class AppMarketService {

  static pageSize = APP_MARKET_PAGE_SIZE;

  static async search({ query, isADI, locale, experiments }: IQueryParams): Promise<IServiceSearchResults> {
    return experiments.enabled('specs.wos2.useNewAppMarketApi') ?
      this.searchWithNewAppMarketAPI({ query }) :
      this.searchWithOldAppMarketAPI({ query, isADI, locale });
  }

  private static async searchWithNewAppMarketAPI({ query }: Partial<IQueryParams>): Promise<IServiceSearchResults> {
    const appMarketSearchUrl = `/_serverless/app-market-search/autocomplete?term=${query}`;
    const res = await axios.get(appMarketSearchUrl, { timeout: AXIOS_TIMEOUT });
    const data: INewAppMarketAPIResponse[] = res.data.suggestions;
    const results = data.map<IAppMarketSearchResult>(response => ({
      type: DataType.AppMarket,
      id: response.id,
      title: response.name,
      snippet: response.teaser,
      avatar: response.company.name === 'Wix' ? response.icon : null,
      icon: response.company.name !== 'Wix' ? 'AppMarket' : null,
      payload: {
        slug: response.slug,
        installed: isAppInstalled(response.id)
      }
    }));
    return { results, totalResults: results.length, availableResults: results.length };
  }

  private static async searchWithOldAppMarketAPI({ query, isADI, locale }: Partial<IQueryParams>): Promise<IServiceSearchResults> {
    const searchEverythingUrl = appMarketSearchUrlFormat(query, isADI, locale);
    const result = await axios.get(searchEverythingUrl, { timeout: AXIOS_TIMEOUT });
    const data: IAppMarketAPIResponse[] = result.data;
    const results = data.map<IAppMarketSearchResult>(response => ({
      type: DataType.AppMarket,
      id: response.appDefinitionId,
      title: response.name,
      snippet: response.teaser,
      avatar: response.by === 'Wix' ? response.appIcon : null,
      icon: response.by !== 'Wix' ? 'AppMarket' : null,
      payload: {
        slug: response.slug,
        installed: isAppInstalled(response.appDefinitionId)
      }
    }));

    return { results, totalResults: results.length, availableResults: results.length };
  }
}
