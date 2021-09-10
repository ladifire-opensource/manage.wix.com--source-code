import React, { FC, useCallback, memo } from 'react';
import { RecommendedApp } from '@src/common/templates';
import {
  AppMarketTemplateProps,
  AppItemViewParams,
  CtaClickParams,
} from '../app-market-template.container';
import { OnVisibleParams, VisibilityDetector } from '@wix/os-dashboard-shared-components';
import { AppMarketTopSuggestionComponent } from './app-market-top-suggestion.component';
import { CTA } from '@src/common/types';

export interface AppMarketTopSuggestionProps extends Pick<AppMarketTemplateProps, 'suggestion'> {
  app: RecommendedApp;
  onAppItemCtaClicked: (params: CtaClickParams) => void;
  onAppItemViewed: (params: AppItemViewParams) => void;
  onMainCtaClicked: ({ openInSameWindow, cta }: { cta?: CTA; openInSameWindow?: boolean }) => void;
}
export const AppMarketTopSuggestion: FC<AppMarketTopSuggestionProps> = memo(
  ({ onMainCtaClicked, onAppItemCtaClicked, onAppItemViewed, app, suggestion }) => {
    const onCtaClick = useCallback(() => {
      onAppItemCtaClicked({ id: app.id, cta: app.cta, disableClickAction: true });
      onMainCtaClicked({ cta: app.cta, openInSameWindow: true });
    }, [onAppItemCtaClicked, onMainCtaClicked, app]);

    const onItemView = useCallback(
      ({ isFirstCheck }: OnVisibleParams) =>
        onAppItemViewed({ id: app.id, initialInViewport: isFirstCheck }),
      [onAppItemViewed, app],
    );

    return (
      <VisibilityDetector onVisible={onItemView}>
        <div>
          <AppMarketTopSuggestionComponent
            suggestion={suggestion}
            app={app}
            onCtaClick={onCtaClick}
            isNew={app.numberOfReviews === 0}
          />
        </div>
      </VisibilityDetector>
    );
  },
);
