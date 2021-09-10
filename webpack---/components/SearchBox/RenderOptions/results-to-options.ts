import { ISearchBoxEntry, sectionShowMore, sectionGotoMore , emptyResultsContent, sectionHeader, mapSectionResultsToOptions } from "../Entries/index";
import * as _ from 'lodash';

import { TFunction as TF } from '@wix/wix-i18n-config';
import { ISearchResult, DataType } from '../../../types';
import { renderOption } from './render-dropdown-option';
import { ISectionsPaging, ShowMoreType } from '../../../types/store';
import { ISectionVisibleResults } from '../../../services/bi/send-bi-events';

type Sections = { [key in DataType]: ISearchResult[] };

interface SearchResultsParameters {
  searchResults: ISearchResult[];
  sectionsPaging: ISectionsPaging;
  query: string;
  getSectionVisibleOptionsCount: () => ISectionVisibleResults;
  hideDropdown: () => void;
  t: TF;
}

const ensureResultTypeInMap = (map: Sections, result: ISearchResult) => {
  if (!map[result.type]) {
    map[result.type] = [];
  }
};

const addResultToMap = (map: Sections, result: ISearchResult) => map[result.type].push(result);

const putResultsIntoSections = (searchResults: ISearchResult[]): Sections =>
  searchResults.reduce((map: Sections, result) => {
    ensureResultTypeInMap(map, result);
    addResultToMap(map, result);
    return map;
  }, {} as any);

const numberOfResultsToDisplay = (sections: Sections, sectionsPaging: ISectionsPaging, sectionType: DataType) =>
            sectionsPaging[sectionType] && sectionsPaging[sectionType].displayedResults || sections[sectionType].length;

const getResultsToDisplay = (sections: Sections, sectionsPaging: ISectionsPaging, sectionType: DataType, index: number, sectionIndex: number) =>
        _.take(sections[sectionType], numberOfResultsToDisplay(sections, sectionsPaging, sectionType))
        .map(mapSectionResultsToOptions(index, sectionIndex));

const mapSectionsToEntries = (sections: Sections, params: SearchResultsParameters): ISearchBoxEntry[] => {
  const { sectionsPaging, query, t } = params;

  let index = 0;
  let sectionIndex = 0;

  const shouldDisplayShowMore = (sectionType: DataType) =>
    sectionsPaging[sectionType] && sectionsPaging[sectionType].showMoreType === ShowMoreType.ShowAll;

  const shouldDisplayGotoMore = (sectionType: DataType) =>
    sectionsPaging[sectionType] && sectionsPaging[sectionType].showMoreType === ShowMoreType.GotoMore;

  const getShowMoreInArray = (sectionType: DataType) =>
    shouldDisplayShowMore(sectionType) ?
      [sectionShowMore(sectionType, index, sectionIndex, sections[sectionType].length, query, sectionsPaging[sectionType], t)] :
    shouldDisplayGotoMore(sectionType) ?
      [sectionGotoMore(sectionType, index, sectionIndex, sections[sectionType].length, query, sectionsPaging[sectionType], t)] : [];

  return _.flatMap(_.keys(sections), (sectionType: DataType) => {
    const sectionResults = [
      sectionHeader(sectionType, t, index),
      ...getResultsToDisplay(sections, sectionsPaging, sectionType, index, sectionIndex),
      ...getShowMoreInArray(sectionType)
    ];
    sectionIndex++;
    index += sections[sectionType].length;
    return sectionResults;
  });
};

const mapResultsToOrderedEntriesInSections = (params: SearchResultsParameters) => {
  const { searchResults, query, t } = params;

  if (!searchResults.length && query !== '') {
    return [
      emptyResultsContent(query, t)
    ];
  }

  const displaySections = putResultsIntoSections(searchResults);
  return mapSectionsToEntries(displaySections, params);
};

const generateDropdownOption = ({ getSectionVisibleOptionsCount, hideDropdown, t }: SearchResultsParameters, entry: ISearchBoxEntry, index: number) => ({
  ...entry,
  value: renderOption({ entry, index, t, closeOptionsDropdown: hideDropdown, getSectionVisibleOptionsCount })
});

export const mapSearchResultsToDropdownOptions = (params: SearchResultsParameters) =>
  mapResultsToOrderedEntriesInSections(params)
    .map((entry, index) => generateDropdownOption(params, entry, index));
