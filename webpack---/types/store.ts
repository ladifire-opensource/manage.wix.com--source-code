import { ExperimentsBag } from '@wix/wix-experiments';
import { ISearchResult } from '.';

export enum ShowMoreType {
  None,
  ShowAll,
  GotoMore
}

export interface ISectionPaging {
  totalResults: number;
  displayedResults: number;
  availableResults: number;
  showMoreType: ShowMoreType;
}

export interface ISectionsPaging { [name: string]: ISectionPaging }

export interface ISearchStoreState {
  query: string;
  queryThatProvidedResults: string;
  results: ISearchResult[];
  sections: ISectionsPaging;
}

export interface IStoreState {
  isDataLoading: boolean;
  searchStore: ISearchStoreState;
  metaSiteId: string;
  isADIEditorType: boolean;
  locale: string;
  debug: boolean;
  experiments: ExperimentsBag;
}
