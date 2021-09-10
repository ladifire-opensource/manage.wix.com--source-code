import React, { FC, useMemo, memo } from 'react';
import { AppMarketTemplateData, RecommendedApp } from '@src/common/templates';
import {
  AppItemViewParams,
  AppMarketTemplateProps,
  CtaClickParams,
} from './app-market-template.container';
import { Box } from 'wix-style-react';
import { LoadingState, CtaButton, AppItem } from './sub-components';
import { SuggestionBaseLayout } from '@src/components/layouts';
import { ActionsMenu } from '@src/components/actions-menu/actions-menu.container';
import { BasicTemplateTitle } from '../basic-template/sub-components';
import { AppMarketTemplateDataHooks } from '@src/common/hooks';
import { ViewType } from '@src/common/types';
import { AppMarketTopSuggestion } from './top-suggestion';
import ChevronRight from 'wix-ui-icons-common/ChevronRight';

export interface AppMarketTemplateComponentProps
  extends Omit<AppMarketTemplateProps, 'onMainCTAClick'> {
  loading: boolean;
  onAppItemCtaClicked: (params: CtaClickParams) => void;
  onAppItemViewed: (params: AppItemViewParams) => void;
  onCtaClick: () => void;
  apps: RecommendedApp[];
}

export const AppMarketTemplateComponent: FC<AppMarketTemplateComponentProps> = memo(
  ({
    viewType,
    loading,
    apps,
    index,
    suggestion,
    onCtaClick,
    onAppItemCtaClicked,
    onAppItemViewed,
  }) => {
    const { titleKey, actionTarget } = suggestion.data as AppMarketTemplateData;

    const suggestionContent = useMemo(() => {
      if (loading) {
        return <LoadingState />;
      }
      return (
        <Box
          direction="vertical"
          minWidth="374px"
          flex="1"
          dataHook={`${AppMarketTemplateDataHooks.APPS_LIST}`}
        >
          {apps.map((app, appIndex) => (
            <AppItem
              key={appIndex}
              onAppItemCtaClicked={onAppItemCtaClicked}
              onAppItemViewed={onAppItemViewed}
              isLastInTheList={apps.length - 1 === appIndex}
              index={appIndex}
              viewType={viewType}
              {...app}
            />
          ))}
        </Box>
      );
    }, [apps, loading, onAppItemCtaClicked, onAppItemViewed, viewType]);

    if (viewType === ViewType.TOP) {
      return loading ? null : (
        <AppMarketTopSuggestion
          onMainCtaClicked={onCtaClick}
          onAppItemCtaClicked={onAppItemCtaClicked}
          onAppItemViewed={onAppItemViewed}
          suggestion={suggestion}
          app={apps[0]}
        />
      );
    }

    return (
      <SuggestionBaseLayout
        dataHook={`${AppMarketTemplateDataHooks.APP_MARKET_TEMPLATE_BASE_LAYOUT_DATA_HOOK}.${suggestion.offerId}`}
        content={suggestionContent}
        padding="16px 26px"
        title={
          <BasicTemplateTitle
            dataHook={AppMarketTemplateDataHooks.MAIN_TITLE}
            titleKey={titleKey}
          />
        }
        mainCTA={
          <Box paddingTop="12px">
            <CtaButton
              titleKey={actionTarget.titleKey}
              onCtaClick={onCtaClick}
              suffix={
                <Box marginLeft="-6px" direction="vertical">
                  <ChevronRight />
                </Box>
              }
            />
          </Box>
        }
        actionsMenu={<ActionsMenu suggestion={suggestion} index={index} />}
      />
    );
  },
);
