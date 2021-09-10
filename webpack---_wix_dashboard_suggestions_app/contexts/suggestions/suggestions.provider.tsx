import { SuggestionOffer, SuggestionStatus } from '@src/common/types';
import React, { useState, FunctionComponent } from 'react';
import { SuggestionsContext } from './suggestions.context';

export interface SuggestionsProviderProps {
  suggestions?: SuggestionOffer[];
  onEmpty?: () => void;
  onLoaded?: () => void;
}

export const SuggestionsProvider: FunctionComponent<SuggestionsProviderProps> = ({
  suggestions,
  onEmpty,
  onLoaded,
  children,
}) => {
  const [suggestionsState, setSuggestionsState] = useState({
    suggestions,
  });

  const setSuggestionStatus = (offerId: string, status: SuggestionStatus) => {
    if (!suggestionsState.suggestions) {
      return;
    }
    const newSuggestions =
      status === SuggestionStatus.REMOVED
        ? suggestionsState.suggestions.filter(offer => offer.offerId !== offerId)
        : suggestionsState.suggestions.map(offer =>
            offer.offerId === offerId ? { ...offer, status } : offer,
          );

    // eslint-disable-next-line no-unused-expressions
    !newSuggestions.length && onEmpty?.();

    setSuggestionsState({
      suggestions: newSuggestions,
    });
  };

  const providedValue = {
    suggestions: suggestionsState.suggestions,
    setSuggestionStatus,
    hideWidget: () => onEmpty?.(),
    onLoaded,
  };

  return (
    <SuggestionsContext.Provider value={providedValue}>{children}</SuggestionsContext.Provider>
  );
};
