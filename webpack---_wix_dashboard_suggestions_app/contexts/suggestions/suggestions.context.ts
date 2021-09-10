import { SuggestionOffer, SuggestionStatus } from '@src/common/types';
import { createContext, useContext } from 'react';
import { useTags } from '..';
import { ALL_TAGS_FILTER_NAME } from '../../common/constants';

export interface SuggestionsContext {
  suggestions?: SuggestionOffer[];
  setSuggestionStatus: (offerId: string, status: SuggestionStatus) => void;
  hideWidget: () => void;
  onLoaded?: () => void;
}

export const SuggestionsContext = createContext({} as SuggestionsContext);

export const useSuggestions = () => useContext(SuggestionsContext);

export const useFilteredSuggestions = () => {
  const { suggestions } = useSuggestions();
  const { selectedTag } = useTags();

  const result =
    suggestions?.filter(
      suggestion => selectedTag === ALL_TAGS_FILTER_NAME || suggestion.tags.includes(selectedTag),
    ) || [];

  return result;
};

export const useTopSuggestion = (): SuggestionOffer => {
  const { suggestions } = useSuggestions();

  return suggestions![0];
};
