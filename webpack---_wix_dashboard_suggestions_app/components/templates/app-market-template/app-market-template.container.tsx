import React, { FC, useCallback, useEffect, useState, memo } from 'react';
import { AppMarketTemplateData, RecommendedApp } from '@src/common/templates';
import {
  ActionTargetBizMgrNavigation,
  CTA,
  TemplateCommonProps,
  ViewType,
} from '@src/common/types';
import { getAppMarketRecommendations } from '@src/services/app-market';
import { useModuleParams } from '@wix/yoshi-flow-bm';
import { AppMarketTemplateComponent } from './app-market-template.component';
import { useServices } from '@src/services';
import {
  ClickType,
  PromotionType,
  useSuggestionsBILogger,
  VisibilityTrigger,
} from '@src/bi-logger';
import { useSuggestions } from '@src/contexts';
import {
  dealerSubItemClickParams,
  dealerSubItemShownParams,
} from '@wix/bi-logger-suggestions-widget';

export interface AppMarketTemplateProps extends TemplateCommonProps {}

export interface CtaClickParams extends Omit<AppItemViewParams, 'initialInViewport'> {
  index?: number;
  cta: ActionTargetBizMgrNavigation;
  disableClickAction?: boolean;
}

export interface AppItemViewParams {
  id: string;
  index?: number;
  initialInViewport: boolean;
}

export const AppMarketTemplate: FC<AppMarketTemplateProps> = memo(
  ({ viewType, onMainCTAClick, index, suggestion }) => {
    const [loading, setLoading] = useState(true);
    const [apps, setApps] = useState<RecommendedApp[]>();
    const { metaSiteId, accountLanguage } = useModuleParams();
    const { hideWidget, onLoaded } = useSuggestions();
    const { navigateToCTA } = useServices();
    const biLogger = useSuggestionsBILogger();
    const { actionTarget } = suggestion.data as AppMarketTemplateData;

    const initApps = useCallback(async () => {
      setLoading(true);
      const fetchedApps = await getAppMarketRecommendations({ metaSiteId, lang: accountLanguage });
      setApps(fetchedApps);
      setLoading(false);
      onLoaded?.();
    }, [metaSiteId, accountLanguage, onLoaded]);

    useEffect(() => {
      initApps();
    }, [initApps]);

    const onAppItemCtaClicked = useCallback(
      ({ id, index: appIndex, cta, disableClickAction }: CtaClickParams) => {
        const log: dealerSubItemClickParams = {
          app_id: id,
          offering_guid: suggestion.offerId,
          msid: metaSiteId,
          promotion_asset_type: PromotionType.APP_MARKET,
          asset_campaign_guid: suggestion.dealerRealEstateId,
          asset_campaign_id: suggestion.dealerOfferName,
          click_type: ClickType.CLICK,
        };
        if (viewType === ViewType.TOP) {
          log.asset_location_on_page = 'bubble';
        } else {
          log.asset_location_from_group_list = appIndex;
        }

        biLogger.dealerSubItemClick(log);
        !disableClickAction &&
          navigateToCTA({ cta, metaSiteId, viewType, accountLanguage, openInSameWindow: true });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [biLogger, navigateToCTA, accountLanguage, viewType],
    );

    const onAppItemViewed = useCallback(
      ({ id, index: appIndex, initialInViewport }: AppItemViewParams) => {
        const log: dealerSubItemShownParams = {
          app_id: id,
          offering_guid: suggestion.offerId,
          msid: metaSiteId,
          promotion_asset_type: PromotionType.APP_MARKET,
          asset_campaign_guid: suggestion.dealerRealEstateId,
          asset_campaign_id: suggestion.dealerOfferName,
          visibility_trigger: initialInViewport
            ? VisibilityTrigger.NORMAL
            : VisibilityTrigger.SCROLLING_TO_VIEW,
        };
        if (viewType === ViewType.TOP) {
          log.asset_location_on_page = 'bubble';
        } else {
          log.asset_location_from_group_list = appIndex;
        }
        biLogger.dealerSubItemShown(log);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [biLogger, accountLanguage, viewType],
    );

    const onCtaClick = useCallback(
      ({ openInSameWindow, cta }: { cta?: CTA; openInSameWindow?: boolean } = {}) => {
        onMainCTAClick({ cta: cta || actionTarget, openInSameWindow });
      },
      [actionTarget, onMainCTAClick],
    );

    if (apps?.length === 0) {
      if (viewType === ViewType.TOP) {
        hideWidget();
      }
      return null;
    }

    return (
      <AppMarketTemplateComponent
        apps={apps || []}
        index={index}
        loading={loading || !apps}
        viewType={viewType}
        suggestion={suggestion}
        onCtaClick={onCtaClick}
        onAppItemCtaClicked={onAppItemCtaClicked}
        onAppItemViewed={onAppItemViewed}
      />
    );
  },
);
