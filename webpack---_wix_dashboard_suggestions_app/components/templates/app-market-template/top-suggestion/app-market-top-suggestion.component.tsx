import React, { FC, memo } from 'react';
import { AppMarketTemplateDataHooks } from '@src/common/hooks';
import { RecommendedApp } from '@src/common/templates';
import { ViewType } from '@src/common/types';
import { ActionsMenu } from '@src/components/actions-menu/actions-menu.container';
import { SuggestionLayoutProps, TopSuggestionLayout } from '@src/components/layouts';
import { BasicTemplateDescription, BasicTemplateImage } from '../../basic-template/sub-components';
import { AppMarketTemplateComponentProps } from '../app-market-template.component';
import { CtaButton, AppRatingComponent } from '../sub-components';
import { AppMarketTopSuggestionTitle } from './app-market-top-suggestion-title.component';
import { TypeIndication } from '@src/components/type-indication/type-indication';

export interface AppMarketTopSuggestionComponentProps
  extends Pick<AppMarketTemplateComponentProps, 'suggestion'> {
  app: RecommendedApp;
  onCtaClick: () => void;
  isNew: boolean;
}

export const AppMarketTopSuggestionComponent: FC<AppMarketTopSuggestionComponentProps> = memo(
  ({ app, suggestion, onCtaClick, isNew }) => {
    const layoutProps: SuggestionLayoutProps = {
      title: <AppMarketTopSuggestionTitle title={app.name} isNew={isNew} />,
      image: (
        <BasicTemplateImage
          hasShadow={false}
          marginRight="0"
          width="32px"
          height="32px"
          viewType={ViewType.TOP}
          thumbnailUrl={app.icon || ''}
        />
      ),
      mainCTA: (
        <CtaButton
          titleKey="suggestion.widget.app-market-template.viewapp"
          onCtaClick={onCtaClick}
          weight="normal"
        />
      ),
      secondaryCTA: app.numberOfReviews ? (
        <AppRatingComponent reviewStars={app.reviewStars} numberOfReview={app.numberOfReviews} />
      ) : undefined,
      description: (
        <BasicTemplateDescription
          dataHook={AppMarketTemplateDataHooks.APP_DESCRIPTION}
          descriptionKey={app.description}
        />
      ),
      actionsMenu: <ActionsMenu suggestion={suggestion} index={0} />,
      typeIndication: (
        <TypeIndication
          type={suggestion.templateType}
          dataHook={AppMarketTemplateDataHooks.APP_TYPE_INDICATION}
        />
      ),
    };

    return (
      <TopSuggestionLayout
        dataHook={`${AppMarketTemplateDataHooks.APP_MARKET_TEMPLATE_TOP_LAYOUT_DATA_HOOK}.${suggestion.offerId}`}
        {...layoutProps}
      />
    );
  },
);
