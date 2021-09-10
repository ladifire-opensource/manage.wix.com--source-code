import { SuggestionOffer, ViewsSuggestions } from '@src/common/types';
import {
  assetClickParams,
  assetViewParams,
  clickInDashboardParams,
  suggestionFeedbackClickParams,
  Logger,
} from '@wix/bi-logger-suggestions-widget';
import { PageId } from '../common/types/types';
import { ClickType, VisibilityTrigger, WidgetName, Place } from './types';

export const userSawAnItemBIEvent = (logger: Logger) => (params: assetViewParams) =>
  logger.assetView({
    ...params,
    item_mode: 'open',
  });

export const userClickedAnArrowBIEvent = (logger: Logger) =>
  logger.clickInDashboard({
    name: 'arrow',
    widget_name: WidgetName.TOP_SUGGESTIONS,
  });

export const userClickedAnItemBIEvent = (logger: Logger) => (params: assetClickParams) =>
  logger.assetClick({
    click_type: ClickType.CLICK,
    ...params,
  });

export const userClickedAVideoItemBIEvent = (logger: Logger) => (params: assetClickParams) =>
  logger.assetClick({
    ...params,
    click_type: ClickType.CLICK,
    visibility_trigger: VisibilityTrigger.VIDEO_CLICK,
  });

export const userClickedOnSecondaryItemBIEvent = (logger: Logger) => (params: assetClickParams) =>
  logger.assetClick({
    ...params,
    click_type: ClickType.SUB_CLICK,
  });

export const userSkippedItemBIEvent = (logger: Logger) => (params: suggestionFeedbackClickParams) =>
  logger.suggestionFeedbackClick({
    ...params,
    click_name: ClickType.SKIP,
  });

export const userClickedOnActionsMenuBIEvent =
  (logger: Logger) => (params: suggestionFeedbackClickParams) =>
    logger.suggestionFeedbackClick({
      ...params,
      click_name: ClickType.MENU,
    });

export const userClickedOnClose = (logger: Logger) => (params: clickInDashboardParams) =>
  logger.clickInDashboard({
    ...params,
    name: 'see-next-suggestion',
  });

export const userShowedLaterBIEvent = (logger: Logger) => (params: suggestionFeedbackClickParams) =>
  logger.suggestionFeedbackClick({
    ...params,
    click_name: ClickType.SHOW_LATER,
  });
export const userNavigateToSpecificPageBIEvent = (
  logger: Logger,
  pageId: PageId,
  originWidget: WidgetName,
  place?: Place,
) => {
  const navigateBi: clickInDashboardParams = {
    name: pageId === PageId.SUGGESTIONS ? 'see-all-suggestions' : 'back-to-dashboard',
    widget_name: originWidget,
  };

  if (place) {
    navigateBi.place = place;
  }

  logger.clickInDashboard(navigateBi);
};

export const fullPageFailedToLoadBIEvent = (logger: Logger) => () =>
  logger.util.log({
    evid: 297,
    error_location: 'suggestion-page',
    error_name: null,
    page_url: window.location.href,
  });

export const userSawFullPageWithSelectedTag =
  (logger: Logger) =>
  ({
    tag,
    suggestions,
    allTags,
  }: {
    tag: string | false;
    suggestions: SuggestionOffer[];
    allTags: string[] | false;
  }) =>
    logger.suggestionPagePageLoaded({
      tag: tag || 'no tags',
      items: suggestions.map(({ offerId }: SuggestionOffer) => offerId).join(','),
      tags_list: allTags ? allTags.join(',') : 'no tags',
    });

export const userSawLastSuggestion = (logger: Logger) => {
  logger.util.log({
    evid: 1172,
    name: 'see-all-suggestions',
    widget_name: 'top-suggestions',
  });
};

export const fireSuggestionsWidgetSnapshot = (
  logger: Logger,
  viewsSuggestions: ViewsSuggestions,
) => {
  if (!viewsSuggestions?.page?.length) {
    return;
  }

  const realestateId = viewsSuggestions.page[0].dealerRealEstateId;

  const suggestionsOfferIds = (suggestions: SuggestionOffer[]) =>
    suggestions?.length ? suggestions.map(suggestion => suggestion.offerId).join(',') : '';

  logger.suggestionsWidgetSnapshot({
    asset_campaign_guid: realestateId,
    eligible_items: suggestionsOfferIds(viewsSuggestions.page),
    loaded_items_widget: suggestionsOfferIds(viewsSuggestions.section),
    loaded_items_top: suggestionsOfferIds(viewsSuggestions.top),
  });
};
