import React, { useCallback, useMemo } from 'react';
import { OnVisibleParams, VisibilityDetector } from '@wix/os-dashboard-shared-components';
import { useErrorMonitor } from '@wix/yoshi-flow-bm';
import { useActions } from '../../contexts';
import { SuggestionItemComponent } from './suggestion-item.component';
import {
  ViewType,
  SuggestionOffer,
  ActionTargetExternalUrl,
  MainCtaClickParams,
} from '@src/common/types';
import { ErrorBoundary } from '@src/components/error-boundary/error-boundary';
import { createErrorReporter } from '@src/utils';

export interface SuggestionItemProps {
  viewType: ViewType;
  suggestion: SuggestionOffer;
  index: number;
  dataHook?: string;
  shouldUseVisibilityDetector?: boolean;
}

export const SuggestionItem: React.FC<SuggestionItemProps> = props => {
  const { suggestion, viewType, index, dataHook, shouldUseVisibilityDetector } = props;
  const { onMainCtaClicked, onSecCtaClicked, onSuggestionVisibilityChange } = useActions();
  const errorMonitor = useErrorMonitor();

  const errorLogger = useMemo(
    () => createErrorReporter(errorMonitor, viewType),
    [errorMonitor, viewType],
  );

  const onMainCTAClick = useCallback(
    ({ cta, openInSameWindow }: MainCtaClickParams) => {
      onMainCtaClicked({
        index,
        dealerOfferName: suggestion.dealerOfferName,
        dealerRealEstateId: suggestion.dealerRealEstateId,
        offerId: suggestion.offerId,
        templateType: suggestion.templateType,
        cta,
        openInSameWindow,
      });
    },
    [suggestion, index, onMainCtaClicked],
  );

  const onSecCTAClick = useCallback(
    (cta: ActionTargetExternalUrl) => {
      onSecCtaClicked({
        index,
        dealerOfferName: suggestion.dealerOfferName,
        dealerRealEstateId: suggestion.dealerRealEstateId,
        offerId: suggestion.offerId,
        cta,
      });
    },
    [suggestion, index, onSecCtaClicked],
  );

  const onVisibilityChange = useCallback(
    async ({ isFirstCheck }: OnVisibleParams) => {
      onSuggestionVisibilityChange({
        index,
        dealerOfferName: suggestion.dealerOfferName,
        dealerRealEstateId: suggestion.dealerRealEstateId,
        offerId: suggestion.offerId,
        templateType: suggestion.templateType,
        initialInViewport: isFirstCheck,
      });
    },
    [suggestion, index, onSuggestionVisibilityChange],
  );

  const renderMarkup = useCallback(
    () => (
      <SuggestionItemComponent
        suggestion={suggestion}
        viewType={viewType}
        onMainCTAClick={onMainCTAClick}
        onSecCTAClick={onSecCTAClick}
        dataHook={dataHook}
        index={index}
      />
    ),
    [suggestion, viewType, onMainCTAClick, onSecCTAClick, dataHook, index],
  );

  return (
    <ErrorBoundary errorLogger={errorLogger}>
      {shouldUseVisibilityDetector && (
        <VisibilityDetector onVisible={onVisibilityChange}>
          <div>{renderMarkup()}</div>
        </VisibilityDetector>
      )}
      {!shouldUseVisibilityDetector && renderMarkup()}
    </ErrorBoundary>
  );
};
