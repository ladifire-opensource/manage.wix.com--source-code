import {
  assetClickParams,
  assetViewParams,
  suggestionFeedbackClickParams,
} from '@wix/bi-logger-suggestions-widget';

export enum BIEvents {
  ItemShown = 590,
  ItemClicked = 591,
  ViewAllClicked = 195,
  ArrowClicked = 195,
  SeeNextClicked = 195,
  FeedbackClicked = 4,
}

export enum ClickType {
  CLICK = 'click',
  SUB_CLICK = 'sub-click',
  SKIP = 'remove',
  MENU = 'actions-menu',
  SHOW_LATER = 'show-later',
}

export enum VisibilityTrigger {
  NORMAL = 'normal',
  SCROLLING_TO_VIEW = 'scrolling to view',
  ARROW = 'arrow',
  VIDEO_CLICK = 'video-click',
}

export enum PromotionType {
  BIZ_MGR_NAVIGATION = 'bizMgrNavigation',
  AUTOMATIONS = 'automations-article',
  VIDEO = 'video',
  EXTERNAL_URL = 'externalUrl',
  APP_MARKET = 'appmarket',
}

export enum WidgetName {
  TOP_SUGGESTIONS = 'top-suggestions',
  SUGGESTIONS = 'suggestions',
  SUGGESTIONS_PAGE = 'suggestions-page',
}

export enum Place {
  HEADER = 'header',
  FOOTER = 'footer',
}

export type SuggestionBIEventAsset =
  | assetViewParams
  | assetClickParams
  | suggestionFeedbackClickParams;
