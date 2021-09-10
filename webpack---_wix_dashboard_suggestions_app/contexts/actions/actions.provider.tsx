import React from 'react';
import { useModuleParams } from '@wix/yoshi-flow-bm';
import { ActionsContext } from './actions.context';
import {
  onGetFeedbackClicked,
  onMainCtaClicked,
  onSuggestionVisibilityChange,
  onReminderMeLaterClicked,
  onSkipClicked,
  onSecCtaClicked,
  onNavigateToPage,
  onMenuClicked,
  onRemoveClicked,
} from '../../actions';
import { useSuggestionsBILogger } from '../../bi-logger';
import { useTags } from '../tags/tags.context';
import { useSuggestions } from '../suggestions';
import { ViewType } from '@src/common/types';

export interface ActionsProps {
  viewType: ViewType;
}

export const ActionsProvider: React.FC<ActionsProps> = ({ viewType, children }) => {
  const { metaSiteId, accountLanguage } = useModuleParams();
  const biLogger = useSuggestionsBILogger();
  const { selectedTag, removeTag } = useTags();
  const { setSuggestionStatus, suggestions } = useSuggestions();
  const commonProp = { metaSiteId, biLogger, viewType, selectedTag, accountLanguage };

  const actions = {
    onMainCtaClicked: onMainCtaClicked(commonProp),
    onSecCtaClicked: onSecCtaClicked(commonProp),
    onSuggestionVisibilityChange: onSuggestionVisibilityChange(commonProp),
    onReminderMeLaterClicked: onReminderMeLaterClicked(commonProp, setSuggestionStatus),
    onSkipClicked: onSkipClicked(commonProp, setSuggestionStatus),
    onGetFeedbackClicked,
    onNavigateToPage: onNavigateToPage(commonProp),
    onMenuClicked: onMenuClicked(commonProp),
    onRemoveClicked: onRemoveClicked({
      ...commonProp,
      setSuggestionStatus,
      suggestions,
      removeTag,
    }),
  };

  return <ActionsContext.Provider value={actions}>{children}</ActionsContext.Provider>;
};
