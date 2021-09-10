import { TemplateType, ViewType } from '@src/common/types';
import {
  assetViewParams,
  assetClickParams,
  clickInDashboardParams,
} from '@wix/bi-logger-suggestions-widget';
import { VisibilityTrigger, SuggestionBIEventAsset, WidgetName } from '.';
import { ClickType, PromotionType } from './types';

export const populateBILogLocationField = (
  logToPopulate: SuggestionBIEventAsset,
  index: number,
  viewType: ViewType,
): SuggestionBIEventAsset => {
  const log = { ...logToPopulate };

  if (viewType === ViewType.TOP) {
    log.asset_location_from_group_list = index;
    log.asset_location_on_page = 'bubble';
    return log;
  }
  log.asset_location_on_page = `${index}`;

  return log;
};

export const populateBILogWidgetNameField = (
  logToPopulate: clickInDashboardParams,
  viewType: ViewType,
): clickInDashboardParams => {
  const log = { ...logToPopulate };
  if (viewType === ViewType.TOP) {
    log.widget_name = WidgetName.TOP_SUGGESTIONS;
  }
  if (viewType === ViewType.SECTION) {
    log.widget_name = WidgetName.SUGGESTIONS;
  }
  if (viewType === ViewType.PAGE) {
    log.widget_name = WidgetName.SUGGESTIONS_PAGE;
  }
  return log;
};

export const populateBILogVisibilityTriggerField = (
  logToPopulate: assetViewParams | assetClickParams,
  initialInViewport?: boolean,
): SuggestionBIEventAsset => {
  const log = { ...logToPopulate };

  if (initialInViewport) {
    log.visibility_trigger = VisibilityTrigger.NORMAL;
    return log;
  }
  log.visibility_trigger = VisibilityTrigger.SCROLLING_TO_VIEW;

  return log;
};

export const populateBILogTagFieldOnlyForPage = (
  logToPopulate: SuggestionBIEventAsset,
  viewType: ViewType,
  tag: string,
): SuggestionBIEventAsset => {
  const log = { ...logToPopulate };

  if (viewType === ViewType.PAGE) {
    log.tag = tag;
  }

  return log;
};

export const populateBILogPromotionType = (
  logToPopulate: SuggestionBIEventAsset,
  templateType?: TemplateType,
): assetClickParams | assetViewParams => {
  const log: assetClickParams | assetViewParams = { ...logToPopulate };

  log.promotion_asset_type = PromotionType.BIZ_MGR_NAVIGATION;

  if (templateType === TemplateType.APP_MARKET) {
    log.promotion_asset_type = PromotionType.APP_MARKET;
  }
  if (templateType === TemplateType.CRM_AUTOMATIONS) {
    log.promotion_asset_type = PromotionType.AUTOMATIONS;
  }

  return log;
};

export const populateBILogClickType = (
  logToPopulate: SuggestionBIEventAsset,
  viewType?: ViewType,
  templateType?: TemplateType,
): assetClickParams => {
  const log: assetClickParams = { ...logToPopulate };

  log.click_type = ClickType.CLICK;

  if (templateType === TemplateType.APP_MARKET && viewType !== ViewType.TOP) {
    log.click_type = ClickType.SUB_CLICK;
  }

  return log;
};
