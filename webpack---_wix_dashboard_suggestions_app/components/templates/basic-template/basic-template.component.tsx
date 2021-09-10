import React from 'react';
import {
  BasicTemplateTitle,
  BasicTemplateDescription,
  BasicTemplateMainAction,
  BasicTemplateSecondaryAction,
} from './sub-components';
import { TopSuggestionLayout, SectionSuggestionLayout } from '../../layouts';
import { SuggestionLayoutProps } from '../../layouts/suggestion-layout';
import { LayoutDataHooks } from '@src/common/hooks';
import { ActionsMenu } from '../../actions-menu/actions-menu.container';
import {
  ActionTargetExternalUrl,
  MainCtaClickParams,
  SuggestionOffer,
  ViewType,
} from '@src/common/types';
import { BasicTemplateData } from '@src/common/templates';

export interface BasicTemplateProps {
  viewType: ViewType;
  dataHook?: string;
  index: number;
  image: React.ReactElement | undefined;
  suggestion: SuggestionOffer;
  onMainCTAClick: (params: MainCtaClickParams) => void;
  onSecCTAClick?: (cta: ActionTargetExternalUrl) => void;
}

export const BasicTemplateComponent: React.FC<BasicTemplateProps> = ({
  suggestion,
  image,
  dataHook,
  index,
  viewType,
  onMainCTAClick,
  onSecCTAClick,
}) => {
  const { titleKey, descriptionKey, actionTarget, secondaryAction } =
    suggestion.data as BasicTemplateData;
  const layoutProps: SuggestionLayoutProps = {
    dataHook,
    title: <BasicTemplateTitle titleKey={titleKey} />,
    description: <BasicTemplateDescription descriptionKey={descriptionKey} />,
    image,
    mainCTA: <BasicTemplateMainAction cta={actionTarget} onCTAClick={onMainCTAClick} />,
    secondaryCTA: secondaryAction?.params.url && (
      <BasicTemplateSecondaryAction
        titleKey={secondaryAction.titleKey}
        onClick={() => onSecCTAClick?.(secondaryAction)}
      />
    ),
    actionsMenu: <ActionsMenu suggestion={suggestion} index={index} />,
  };
  if (viewType === ViewType.SECTION || viewType === ViewType.PAGE) {
    const onCardClicked = () => onMainCTAClick({ cta: actionTarget });

    return (
      <div data-hook={LayoutDataHooks.SECTION_LAYOUT_DATA_HOOK} onClick={onCardClicked}>
        <SectionSuggestionLayout {...layoutProps} />
      </div>
    );
  }
  return (
    <div data-hook={LayoutDataHooks.TOP_LAYOUT_DATA_HOOK}>
      <TopSuggestionLayout {...layoutProps} />
    </div>
  );
};
