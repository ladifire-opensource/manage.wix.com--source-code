import {
  CategorizedSteps,
  DashboardWidgetData,
  Step,
} from '@wix/dashboard-setup-common';
import {
  assetClickParams,
  assetViewParams,
  finishSetupWidgetParams,
  setupWidgetItemsParams,
} from '@wix/bi-logger-setup-widget-new-dashboard';
import { getRealEstateId, getStepsStatusSummery } from '@src/selectors';

export const BI_SOURCE = 5;
export const BI_WIDGET_NAME = 'setup';

export enum AssetVisibilityTrigger {
  normal = 'normal',
  windowScrolled = 'scrolling to view',
  hover = 'hover',
  arrow = 'arrow',
}

export enum AssetClickType {
  close = 'close',
  click = 'click',
  skip = 'skip',
  unskip = 'unskip',
}

export const mapToAssetViewEvent = (
  step: Step,
  isSkipped: boolean,
  visibilityTrigger: AssetVisibilityTrigger = AssetVisibilityTrigger.normal,
): assetViewParams => {
  return {
    asset_campaign_guid: step.dealer.realEstateId,
    asset_campaign_id: step.dealer.offerName,
    asset_location_on_page: step.order.toString(),
    group_id: step.categoryId,
    asset_location_from_group_list: step.orderInCategory,
    offering_guid: step.id,
    item_mode: getStepMode(step, isSkipped),
    visibility_trigger: visibilityTrigger,
    promotion_asset_type: step.cta?.type,
  };
};

export const mapToAssetClickEvent = (
  step: Step,
  clickType: AssetClickType,
  visibilityTrigger: AssetVisibilityTrigger = AssetVisibilityTrigger.normal,
): assetClickParams => {
  return {
    asset_campaign_guid: step.dealer.realEstateId,
    asset_campaign_id: step.dealer.offerName,
    asset_location_on_page: step.order.toString(),
    group_id: step.categoryId,
    asset_location_from_group_list: step.orderInCategory,
    offering_guid: step.id,
    click_type: clickType,
    visibility_trigger: visibilityTrigger,
    promotion_asset_type: step.cta?.type,
  };
};

export const mapToFinishSetupEvent = (params: {
  categorizedSteps: CategorizedSteps;
  skippedSteps: string[];
}): finishSetupWidgetParams => {
  const { categorizedSteps, skippedSteps } = params;
  const completedSteps = categorizedSteps
    .map((category) => {
      return category.steps.filter((step) => step.isCompleted);
    })
    .flat()
    .map((step) => step.id);

  return {
    resolved_items: completedSteps.join(','),
    skipped_items: skippedSteps.join(','),
    widget_name: BI_WIDGET_NAME,
  };
};

export const mapToWidgetItems = (
  dashboardWidgetData: DashboardWidgetData,
): setupWidgetItemsParams => {
  const { completed, unCompleted, skipped } =
    getStepsStatusSummery(dashboardWidgetData);
  const realEstateId = getRealEstateId(dashboardWidgetData);

  return {
    asset_campaign_guid: realEstateId,
    skipped_items: skipped.join(','),
    resolved_items: completed.join(','),
    available_items: unCompleted.join(','),
  };
};

const getStepMode = (step: Step, isSkipped: boolean): string => {
  return step.isCompleted ? 'completed' : isSkipped ? 'skipped' : 'open';
};
