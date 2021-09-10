import React, { useCallback } from 'react';
import { SectionWidgetComponent } from './section-widget.component';
import { useExperiments } from '@wix/yoshi-flow-bm';
import { PROMINENT_SEE_ALL_SUGGESTIONS } from '@src/experiments';
import { PageId } from '@src/common/types/types';
import { Place, WidgetName } from '@src/bi-logger';
import { useActions } from '@src/contexts';

export interface SectionWidgetProps {
  widgetTitle?: string;
}

export const SectionWidget: React.FC<SectionWidgetProps> = ({ widgetTitle }) => {
  const { experiments } = useExperiments();
  const { onNavigateToPage } = useActions();
  const isProminentSeeAllSuggestionExperiment = experiments.enabled(PROMINENT_SEE_ALL_SUGGESTIONS);
  const footerButtonText = isProminentSeeAllSuggestionExperiment
    ? 'suggestion.widget.see.all.top.cta'
    : 'suggestion.widget.see.all.cta';
  const navigateToPage = useCallback((place: Place) => () =>
    onNavigateToPage({
      pageId: PageId.SUGGESTIONS,
      originWidget: WidgetName.SUGGESTIONS,
      place,
    }),[]);
  return (
    <SectionWidgetComponent
      widgetTitle={widgetTitle}
      headerButtonText={footerButtonText}
      isProminentSeeAllSuggestionExperiment={isProminentSeeAllSuggestionExperiment}
      navigateToPage={navigateToPage}
    />
  );
};
