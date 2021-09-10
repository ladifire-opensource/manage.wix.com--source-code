import React from 'react';
import { BasicTemplate, CrmAutomationsTemplate } from '@src/components/templates';
import { GeneralDataHooks } from '@src/common/hooks';
import { Skipped } from '@src/components/skipped/skipped.container';
import {
  ViewType,
  SuggestionOffer,
  ActionTargetExternalUrl,
  TemplateType,
  SuggestionStatus,
  MainCtaClickParams,
} from '@src/common/types';
import { AppMarketTemplate } from '../templates';
import { useErrorMonitor } from '@wix/yoshi-flow-bm';
import { UnknownTemplateTypeError } from '@src/common/types/errors';

export interface SuggestionItemComponentProps {
  viewType: ViewType;
  suggestion: SuggestionOffer;
  dataHook?: string;
  index: number;
  onMainCTAClick: (params: MainCtaClickParams) => void;
  onSecCTAClick: (cta: ActionTargetExternalUrl) => void;
}

export const SuggestionItemComponent: React.FC<SuggestionItemComponentProps> = ({
  suggestion,
  viewType,
  index,
  onMainCTAClick,
  onSecCTAClick,
  dataHook,
}) => {
  const errorMonitor = useErrorMonitor();

  const renderTemplate = () => {
    if (suggestion.templateType === TemplateType.BASIC) {
      return (
        <BasicTemplate
          suggestion={suggestion}
          index={index}
          viewType={viewType}
          onMainCTAClick={onMainCTAClick}
          dataHook={dataHook}
        />
      );
    }

    if (suggestion.templateType === TemplateType.APP_MARKET) {
      return (
        <AppMarketTemplate
          suggestion={suggestion}
          index={index}
          viewType={viewType}
          onMainCTAClick={onMainCTAClick}
          onSecCTAClick={onSecCTAClick}
        />
      );
    }

    if (suggestion.templateType === TemplateType.CRM_AUTOMATIONS) {
      return (
        <CrmAutomationsTemplate
          suggestion={suggestion}
          index={index}
          viewType={viewType}
          onMainCTAClick={onMainCTAClick}
          dataHook={dataHook}
        />
      );
    }

    // TODO : handle other templates.
    errorMonitor.captureException(
      new UnknownTemplateTypeError(suggestion.offerId, suggestion.templateType),
    );
    return null;
  };

  const renderSkipped = () => {
    return <Skipped suggestion={suggestion} viewType={viewType} index={index} />;
  };

  const renderSuggestion = () => {
    if (
      suggestion.status === SuggestionStatus.SKIPPED ||
      suggestion.status === SuggestionStatus.SHOW_LATER ||
      suggestion.status === SuggestionStatus.SKIPPED_ERROR ||
      suggestion.status === SuggestionStatus.SHOW_LATER_ERROR
    ) {
      return renderSkipped();
    }
    return renderTemplate();
  };

  return (
    <div
      data-hook={GeneralDataHooks.SUGGESTION_ITEM_DATA_HOOK}
      data-suggestion-id={suggestion.offerId}
    >
      {renderSuggestion()}
    </div>
  );
};
