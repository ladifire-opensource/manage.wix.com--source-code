import { useActions } from '@src/contexts';
import { useConfiguration } from '@src/contexts/configuration';
import React, { useCallback } from 'react';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { SkippedComponent } from './skipped.component';
import StatusAlertFilledSmall from 'wix-ui-icons-common/StatusAlertFilledSmall';
import { PageId, SuggestionStatusTextKeys } from '@src/common/types/types';
import { WidgetName } from '@src/bi-logger';
import { ViewType, SuggestionOffer, SuggestionStatus } from '@src/common/types';

export interface SkippedProps {
  viewType: ViewType;
  suggestion: SuggestionOffer;
  index: number;
}

export const Skipped: React.FC<SkippedProps> = ({ suggestion, viewType, index }) => {
  const { onRemoveClicked, onNavigateToPage } = useActions();
  const { defaultRemindLaterDays } = useConfiguration();
  const [t] = useTranslation();

  const onCloseClick = useCallback(() => {
    const { offerId, dealerOfferName, tags } = suggestion;
    onRemoveClicked({ index, offerId, dealerOfferName, tags });
  }, [suggestion, index, onRemoveClicked]);

  const onSeeMoreClick = useCallback(() => {
    onNavigateToPage({
      pageId: PageId.SUGGESTIONS,
      originWidget: WidgetName.TOP_SUGGESTIONS,
    });
  }, [onNavigateToPage]);

  const isError =
    suggestion.status === SuggestionStatus.SKIPPED_ERROR ||
    suggestion.status === SuggestionStatus.SHOW_LATER_ERROR;

  const title = t(SuggestionStatusTextKeys[suggestion.status]?.title || '');
  const description = t(SuggestionStatusTextKeys[suggestion.status]?.description || '', {
    reminderDays: defaultRemindLaterDays,
  });

  return (
    <SkippedComponent
      prefixIcon={isError ? <StatusAlertFilledSmall color="#EE4437" /> : undefined}
      title={title}
      description={description}
      viewType={viewType}
      onCloseClick={onCloseClick}
      onSeeMoreClick={onSeeMoreClick}
    />
  );
};
