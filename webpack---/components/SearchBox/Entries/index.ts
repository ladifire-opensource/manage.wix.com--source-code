import { gotoActions, GotoActionMethod } from './goto-actions';
import { TFunction as TF } from '@wix/wix-i18n-config';
import { ISearchResult, DataType } from '../../../types';
import { ISectionPaging } from '../../../types/store';

export enum EntryType {
  Option,
  Title,
  Empty,
  ShowMore,
  GotoMore
}

interface IWSRDropdownOptionProps {
  id: string;
  title?: boolean;
  disabled?: boolean;
  overrideStyle?: boolean;
}

interface ISearchBoxEntryBase extends IWSRDropdownOptionProps {
  entryType: EntryType;
  index: number;
  indexInSection: number;
  sectionIndex: number;
}

export interface IResultEntry extends ISearchBoxEntryBase {
  entryType: EntryType.Option;
  type: DataType;
  displayTitle: string;
  snippet?: string;
  icon?: string;
  avatar?: string;
  payload: any;
}

export interface IHeaderEntry extends ISearchBoxEntryBase {
  entryType: EntryType.Title;
  type: DataType;
  displayTitle: string;
  snippet?: string;
  icon?: string;
  avatar?: string;
  title: true;
  overrideStyle: true;
  showMoreAction?: GotoActionMethod;
  payload: null;
}

export interface IEmptyEntry extends ISearchBoxEntryBase {
  entryType: EntryType.Empty;
  displayTitle: string;
  snippet: string;
  disabled: true;
}

export interface IShowMoreEntry extends ISearchBoxEntryBase {
  title: true;
  overrideStyle: true;
  entryType: EntryType.ShowMore;
  type: DataType;
  displayedResults: number;
  availableResults: number;
  query: string;
}

export interface IGotoMoreEntry extends ISearchBoxEntryBase {
  title: true;
  overrideStyle: true;
  entryType: EntryType.GotoMore;
  type: DataType;
  totalResults: number;
  availableResults: number;
  gotoMoreAction?: GotoActionMethod;
  query: string;
}

export type ISearchBoxEntry = IHeaderEntry | IResultEntry | IEmptyEntry | IShowMoreEntry | IGotoMoreEntry;

// TECHDEBT: remove dependency on translation function, and move display parameters inside the components | SEV: 5 | EFFORT: 2
export const sectionHeader = (sectionType: DataType, t: TF, index: number): IHeaderEntry => {
  const sectionKey = sectionType.toLowerCase().replace(/ /g, '-');
  return {
    entryType: EntryType.Title,
    id: sectionKey,
    index,
    indexInSection: -1,
    sectionIndex: index,
    displayTitle: t('searchbox.headers.' + sectionKey),
    title: true,
    overrideStyle: true,
    type: sectionType,
    showMoreAction: gotoActions[sectionType],
    payload: null
  };
};

export const mapSectionResultsToOptions = (globalIndex: number, sectionIndex: number) =>
  ({ id, title, type, snippet, icon, avatar, payload }: ISearchResult, index: number): IResultEntry => ({
    entryType: EntryType.Option,
    type,
    id,
    index: globalIndex + index,
    indexInSection: index,
    sectionIndex,
    displayTitle: title,
    snippet,
    icon,
    avatar,
    payload
  });

export const emptyResultsContent = (query: string, t: TF): IEmptyEntry => ({
  id: 'empty-content',
  index: 1,
  indexInSection: 0,
  sectionIndex: 0,
  displayTitle: t('searchbox.headers.empty-results', { QUERY_STRING: query }),
  snippet: t('searchbox.results.empty'),
  entryType: EntryType.Empty,
  disabled: true
});

export const sectionShowMore = (sectionType: DataType, globalIndex: number, sectionIndex: number, indexInSection: number, query: string, sectionPaging: ISectionPaging, t: TF): IShowMoreEntry => {
  const sectionKey = sectionType.toLowerCase().replace(/ /g, '-');

  return {
    id: sectionKey + '-show-more',
    entryType: EntryType.ShowMore,
    index: globalIndex + indexInSection,
    title: true,
    overrideStyle: true,
    query,
    indexInSection,
    sectionIndex,
    type: sectionType,
    availableResults: sectionPaging.availableResults,
    displayedResults: sectionPaging.displayedResults,
  };
};

export const sectionGotoMore = (sectionType: DataType, globalIndex: number, sectionIndex: number, indexInSection: number, query: string, sectionPaging: ISectionPaging, t: TF): IGotoMoreEntry => {
  const sectionKey = sectionType.toLowerCase().replace(/ /g, '-');

  return {
    id: sectionKey + '-goto-more',
    entryType: EntryType.GotoMore,
    index: globalIndex + indexInSection,
    title: true,
    query,
    overrideStyle: true,
    indexInSection,
    sectionIndex,
    type: sectionType,
    availableResults: sectionPaging.availableResults,
    totalResults: sectionPaging.totalResults,
    gotoMoreAction: gotoActions[sectionType]
  };
};
