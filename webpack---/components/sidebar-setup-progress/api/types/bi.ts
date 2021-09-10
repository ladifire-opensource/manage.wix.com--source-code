import { ActionTypes } from './items';

export enum BIPaths {
  bizMgr = 'dash',
}

export enum BIEvents {
  ItemShown = 590,
  ItemClicked = 591,
  SectionShown = 573,
  ProgressBarShown = 672,
  HappyMomentShown = 575,
  HappyMomentClicked = 576,
  ProgressBarClicked = 550,
  SectionCompleted = 169,
  HiddenSection = 284,
  SectionLoaded = 349,
}

export enum BISources {
  myAccount = 5,
}

export enum BIItemMode {
  skipped = 'skipped',
  complete = 'complete',
  open = 'open',
}

export enum BIItemClickType {
  click = 'click',
  skip = 'skip',
  undo = 'undo',
  activate = 'activate',
  showLater = 'show_later',
  close = 'close',
}

export enum BIHappyMomentClickType {
  click = 'click',
  close = 'close',
}

export interface IBaseBi {
  asset_campaign_guid: string;
}

export interface IBaseItemBi extends IBaseBi {
  asset_campaign_id: string;
  asset_location_on_page: number;
  asset_location_from_group_list: number;
  offering_guid: string;
  promotion_asset_type: ActionTypes;
  group_id: string;
}

export interface IAllItemsComplete {
  asset_campaign_guid: string;
}

export interface IItemVisibilityBi extends IBaseItemBi {
  item_mode: BIItemMode;
}

export interface IItemClickBi extends IBaseItemBi {
  click_type: BIItemClickType;
  visibility_trigger: VisibilityTrigger;
}

export interface ISectionVisibilityBi {
  done_steps: number;
  skipped_steps: number;
  steps: number;
  sectionName: string;
}

export interface IHappyMomentModalShown extends IBaseBi {
  origin: HappyMomentOrigin;
}

export interface HappyMomentClicked {
  asset_campaign_guid: string;
  origin: HappyMomentOrigin;
  click_type: BIHappyMomentClickType;
}

export enum EReferralInfo {
  OMNI_SETUP = 'omni-setup',
  PROGRESS_BAR = 'progress_bar',
}

export const BISidebarLocation = 'bubble';

export enum HappyMomentOrigin {
  LIGHTBOX = 'light_box',
  PROGRESS_BAR = 'progress_bar_popup',
}

export enum VisibilityTrigger {
  NORMAL = 'normal',
  STEP_COMPLETED = 'step_completed',
}

export enum ProgressBarClickedInfo {
  NAME = 'progress-bar',
  SIDEBAR_NAME = 'progress-bar',
  APP_ID = 'home',
}

export interface ProgressBarClicked {
  name: ProgressBarClickedInfo.NAME;
  app_id: ProgressBarClickedInfo.APP_ID;
  sidebar_name: ProgressBarClickedInfo.SIDEBAR_NAME;
}

export interface HiddenSection {
  asset_campaign_guid: string;
  number_of_skipped_items: number;
  number_of_resolved_items: number;
  skipped_items: string[];
  resolved_items: string[];
}

export interface SectionLoaded {
  asset_campaign_guid: string;
  number_of_skipped_items: number;
  number_of_resolved_items: number;
  number_of_available_items: number;
  skipped_items: string[];
  resolved_items: string[];
  available_items: string[];
}

export type BiOptions =
  | IItemClickBi
  | IItemVisibilityBi
  | ISectionVisibilityBi
  | IHappyMomentModalShown
  | IAllItemsComplete
  | HappyMomentClicked
  | ProgressBarClicked
  | HiddenSection
  | SectionLoaded;
