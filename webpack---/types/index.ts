import Experiments from '@wix/wix-experiments';

export * from './services';
import {
  IAnswersPayload, IAppMarketPayload, ISearchEverythingPayload, IContactsPayload,
  SearchResultPayload
} from './services';

export enum DataType {
  BusinessManager = 'Business Manager',
  AppMarket = 'App Market',
  Contacts = 'Contacts',
  Answers = 'Answers',
  Ecom = 'Ecom'
}

export enum OptionType {
  BusinessManager = 'Business Manager',
  AppMarket = 'App Market',
  Contacts = 'Contacts',
  Answers = 'Answers',
  Ecom = 'Ecom'
}

export interface IOption {
  type: OptionType;
  id: number | string;
  value: string | React.ReactElement;
  icon?: React.SFC;
  title?: boolean;
  disabled?: boolean;
  payload?: any;
}

export interface ISearchResultBase<T extends DataType, P extends SearchResultPayload> {
  type: T;
  id: string;
  title: string;
  snippet?: string;
  icon?: string;
  avatar?: string;
  payload: P;
}

export type IBusinessManagerSearchResult = ISearchResultBase<DataType.BusinessManager, ISearchEverythingPayload>;
export type IAppMarketSearchResult = ISearchResultBase<DataType.AppMarket, IAppMarketPayload>;
export type IContactsSearchResult = ISearchResultBase<DataType.Contacts, IContactsPayload>;
export type IAnswersSearchResult = ISearchResultBase<DataType.Answers, IAnswersPayload>;

export type ISearchResult = IBusinessManagerSearchResult | IAppMarketSearchResult | IContactsSearchResult | IAnswersSearchResult;

export interface IServiceSearchResults {
  results: ISearchResult[];
  availableResults: number;
  totalResults: number;
}

export interface IQueryParams {
  query: string;
  metaSiteId: string;
  isADI: boolean;
  page?: number;
  locale: string;
  experiments: Experiments;
}

export interface ISectionResult {
  section: string;
  num_results: number;
  total_results: number;
  seen_results?: number;
  time_to_load_ms: number;
  is_expand_results_shown: number;
}

export type ResultsSectionStats = ISectionResult[];

export type IResultsStatistics = {
  [section: string]: ISectionResult;
};

export type SearchableService = {
  pageSize: number;
  search: (prams: IQueryParams) => Promise<IServiceSearchResults>;
};

export interface ISectionService {
  section: string;
  service: SearchableService;
}

export interface IResultCountPerSection { [section: string]: number }

export interface ISearchSectionsResult {
  results: ISearchResult[];
  totalResults: IResultCountPerSection;
  availableResults: IResultCountPerSection;
  servicesStats: IResultsStatistics;
}
