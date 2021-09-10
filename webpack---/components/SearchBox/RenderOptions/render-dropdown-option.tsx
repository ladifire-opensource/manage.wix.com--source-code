import * as React from 'react';
import { SearchResultOption } from './SearchResultOption';
import { SearchResultTitle } from './SearchResultTitle';
import { SearchResultEmpty } from './SearchResultEmpty';
import { SearchResultShowMore } from './SearchResultShowMore';
import { SearchResultGotoMore } from './SearchResultGotoMore';
import { DataType, SearchEverythingType, IAppMarketAPIResponse } from '../../../types';
import { TFunction } from '@wix/wix-i18n-config';
import { EntryType, ISearchBoxEntry } from '../Entries';
import { SearchResultOptionIcon } from './SearchResultOptionIcon';
import { ISectionVisibleResults } from '../../../services/bi/send-bi-events';

const actionWithHideDropdown = (clickAction, hideDropdown) => clickAction && ((...args) => {
  clickAction(...args);
  hideDropdown();
});

interface IRenderOptions {
  entry: ISearchBoxEntry;
  index: number;
  closeOptionsDropdown: () => void;
  getSectionVisibleOptionsCount: () => ISectionVisibleResults;
  t: TFunction;
}

export const renderOption = ({ entry, index, closeOptionsDropdown, getSectionVisibleOptionsCount, t }: IRenderOptions) => {
  const { id, indexInSection, sectionIndex } = entry;
  switch (entry.entryType) {
    case EntryType.Empty:
      return (
          <SearchResultEmpty id={id}
                           value={entry.displayTitle}
                           snippet={entry.snippet}
                           indexInSection={indexInSection}
                           index={index}
                           t={t}
        />
      );
    case EntryType.Title:
      return (
        <SearchResultTitle id={id}
                           value={entry.displayTitle}
                           type={entry.type}
                           indexInSection={indexInSection}
                           sectionIndex={sectionIndex}
                           showMoreAction={actionWithHideDropdown(entry.showMoreAction, closeOptionsDropdown)}
                           getSectionVisibleOptionsCount={getSectionVisibleOptionsCount}
                           index={index}
                           t={t}
        />
      );
    case EntryType.ShowMore:
      return (
        <SearchResultShowMore id={id}
                              type={entry.type}
                              indexInSection={indexInSection}
                              index={index}
                              getSectionVisibleOptionsCount={getSectionVisibleOptionsCount}
                              sectionIndex={sectionIndex}
                              displayedResults={entry.displayedResults}
                              availableResults={entry.availableResults}
                              query={entry.query}
        />
      );
    case EntryType.GotoMore:
      return (
        <SearchResultGotoMore id={id}
                              type={entry.type}
                              indexInSection={indexInSection}
                              clickAction={actionWithHideDropdown(entry.gotoMoreAction, closeOptionsDropdown)}
                              index={index}
                              sectionIndex={sectionIndex}
                              totalResults={entry.totalResults}
                              availableResults={entry.availableResults}
                              query={entry.query}
        />
      );
    default:
      return () => (
        <SearchResultOption id={id}
                            value={entry.displayTitle}
                            type={entry.type}
                            indexInSection={indexInSection}
                            index={index}
                            snippet={entry.snippet}
                            isInstalled={entry.type === DataType.AppMarket && (entry.payload as IAppMarketAPIResponse).installed}
                            openInNewTab={entry.payload && entry.payload.type === SearchEverythingType.Url}
                            t={t}
                            Icon={<SearchResultOptionIcon {...entry} />}
        />
      );
  }
};
