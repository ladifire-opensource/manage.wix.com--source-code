import React, { useCallback } from 'react';
import { ActionsMenuComponent } from './actions-menu.component';
import { useActions } from '@src/contexts';
import { SuggestionOffer } from '@src/common/types';

export interface ActionMenuProps {
  suggestion: SuggestionOffer;
  index: number;
}

export const ActionsMenu: React.FC<ActionMenuProps> = ({ suggestion, index }) => {
  const { onSkipClicked, onMenuClicked, onReminderMeLaterClicked } = useActions();

  const onSkipClick = useCallback(() => {
    const { offerId, dealerOfferName, dealerRealEstateId, tags } = suggestion;
    onSkipClicked({ offerId, index, dealerOfferName, dealerRealEstateId, tags });
  }, [suggestion, index, onSkipClicked]);

  const onShowLaterClick = useCallback(() => {
    const { offerId, dealerOfferName, dealerRealEstateId, tags } = suggestion;
    onReminderMeLaterClicked({ offerId, index, dealerOfferName, dealerRealEstateId, tags });
  }, [suggestion, index, onReminderMeLaterClicked]);

  const onMenuClick = useCallback(() => {
    const { offerId, dealerOfferName, dealerRealEstateId, tags } = suggestion;
    onMenuClicked({ offerId, index, dealerOfferName, dealerRealEstateId, tags });
  }, [suggestion, index, onMenuClicked]);

  return (
    <ActionsMenuComponent
      onSkipClick={onSkipClick}
      onShowLaterClick={onShowLaterClick}
      onMenuClick={onMenuClick}
    />
  );
};
