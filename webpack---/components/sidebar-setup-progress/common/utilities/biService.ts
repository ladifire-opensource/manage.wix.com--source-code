import {
  BiOptions,
  ProgressBarClickedInfo,
  HappyMomentOrigin,
  BIHappyMomentClickType,
  BIEvents,
  BIItemClickType,
  BIItemMode,
  BISidebarLocation,
  IAllItemsComplete,
  IItem,
  ISectionVisibilityBi,
  VisibilityTrigger,
} from '../../api';

export let logger: any;

export interface ILogger {
  msid: string;
  viewMode: string;
}

export interface Logger {
  log(evid: number, options: BiOptions): any;
}

export const initializeBiLogger = (biLogger: any) => {
  logger = biLogger;
};

export const sendBI = (options: BiOptions, evid: BIEvents) => {
  logger.log(evid, {
    _: Date.now(),
    ...options,
  });
};

export const sendItemVisibility = ({
  item,
  visibilityTrigger = VisibilityTrigger.NORMAL,
}: {
  item: IItem;
  visibilityTrigger?: VisibilityTrigger;
}) => {
  const {
    name,
    order,
    orderInCategory,
    id,
    actionTarget: { type },
    isCompleted,
    sectionId,
    isSkipped,
    categoryId,
  } = item;

  sendBI(
    {
      asset_campaign_guid: sectionId,
      asset_campaign_id: name,
      asset_location_on_page: order,
      asset_location_from_group_list: orderInCategory,
      offering_guid: id,
      promotion_asset_type: type,
      item_mode: itemModeForBi({ isSkipped, isCompleted }),
      visibility_trigger: visibilityTrigger,
      group_id: categoryId,
    },
    BIEvents.ItemShown,
  );
};

export const sendSectionLoaded = ({
  sectionId,
  skippedSteps,
  completedSteps,
  availableSteps,
  skippedStepsNames,
  completedStepsNames,
  availableStepsNames,
}: {
  sectionId: string;
  skippedSteps: number;
  completedSteps: number;
  availableSteps: number;
  skippedStepsNames: string[];
  completedStepsNames: string[];
  availableStepsNames: string[];
}) => {
  sendBI(
    {
      asset_campaign_guid: sectionId,
      number_of_skipped_items: skippedSteps,
      number_of_resolved_items: completedSteps,
      number_of_available_items: availableSteps,
      skipped_items: skippedStepsNames,
      resolved_items: completedStepsNames,
      available_items: availableStepsNames,
    },
    BIEvents.SectionLoaded,
  );
};

export const sendSectionHidden = ({
  sectionId,
  skippedSteps,
  completedSteps,
  skippedStepsNames,
  completedStepsNames,
}: {
  sectionId: string;
  skippedSteps: number;
  completedSteps: number;
  skippedStepsNames: string[];
  completedStepsNames: string[];
}) => {
  sendBI(
    {
      asset_campaign_guid: sectionId,
      number_of_skipped_items: skippedSteps,
      number_of_resolved_items: completedSteps,
      skipped_items: skippedStepsNames,
      resolved_items: completedStepsNames,
    },
    BIEvents.HiddenSection,
  );
};

export const sendSidebarItemVisibilityStepCompleted = (item: IItem) => {
  sendItemVisibility({
    item: {
      ...item,
      order: BISidebarLocation as any,
    },
    visibilityTrigger: VisibilityTrigger.STEP_COMPLETED,
  });
};

export const sendSidebarItemVisibility = (item: IItem) => {
  sendItemVisibility({
    item: {
      ...item,
      order: BISidebarLocation as any,
    },
  });
};

export const sendItemSidebarCtaClicked = (item: IItem) => {
  sendItemClicked({
    item: { ...item, order: BISidebarLocation as any },
    clickType: BIItemClickType.click,
  });
};

export const sendItemSidebarStepCompletedCtaClicked = (item: IItem) => {
  sendItemClicked({
    item: { ...item, order: BISidebarLocation as any },
    clickType: BIItemClickType.click,
    visibilityTrigger: VisibilityTrigger.STEP_COMPLETED,
  });
};

export const sendItemSidebarStepCompletedClosed = (item: IItem) => {
  sendItemClicked({
    item: { ...item, order: BISidebarLocation as any },
    clickType: BIItemClickType.close,
    visibilityTrigger: VisibilityTrigger.STEP_COMPLETED,
  });
};

export const sendItemCtaClicked = (item: IItem) => {
  sendItemClicked({ item, clickType: BIItemClickType.click });
};

export const sendItemSkipped = (item: IItem) => {
  sendItemClicked({ item, clickType: BIItemClickType.skip });
};

export const sendItemActivated = (item: IItem) => {
  sendItemClicked({ item, clickType: BIItemClickType.activate });
};

export const sendItemShowLater = (item: IItem) => {
  sendItemClicked({ item, clickType: BIItemClickType.showLater });
};

export const sendItemUndoClicked = (item: IItem) => {
  sendItemClicked({ item, clickType: BIItemClickType.undo });
};

export const sendItemClicked = ({
  item,
  clickType,
  visibilityTrigger = VisibilityTrigger.NORMAL,
}: {
  item: IItem;
  clickType: BIItemClickType;
  visibilityTrigger?: VisibilityTrigger;
}) => {
  const {
    id,
    name,
    order,
    orderInCategory,
    actionTarget: { type },
    sectionId,
    categoryId,
  } = item;

  sendBI(
    {
      asset_campaign_guid: sectionId,
      asset_campaign_id: name || '',
      asset_location_on_page: order,
      asset_location_from_group_list: orderInCategory,
      offering_guid: id,
      promotion_asset_type: type,
      click_type: clickType,
      visibility_trigger: visibilityTrigger,
      group_id: categoryId,
    },
    BIEvents.ItemClicked,
  );
};

export const sendSectionVisibility = (options: ISectionVisibilityBi) => {
  const { sectionName, ...cleanedOpts } = options;
  sendBI(
    {
      ...cleanedOpts,
      asset_campaign_guid: options.sectionName,
    },
    BIEvents.SectionShown,
  );
};

export const sendProgressBarVisibility = (options: ISectionVisibilityBi) => {
  const { sectionName, ...cleanedOpts } = options;
  sendBI(
    {
      ...cleanedOpts,
      asset_campaign_guid: options.sectionName,
    },
    BIEvents.ProgressBarShown,
  );
};

export const sendHappyMoment = (
  sectionId: string,
  origin: HappyMomentOrigin,
) => {
  sendBI(
    {
      asset_campaign_guid: sectionId,
      origin,
    },
    BIEvents.HappyMomentShown,
  );
};

export const sendHappyMomentTooltipShown = (sectionId: string) => {
  sendHappyMoment(sectionId, HappyMomentOrigin.PROGRESS_BAR);
};

export const sendAllItemsSeenBiEvent = () => {
  sendBI(
    { asset_campaign_guid: 'no_asset' } as IAllItemsComplete,
    BIEvents.SectionShown,
  );
};

export const sendHappyMomentModalShown = (sectionId: string) => {
  sendHappyMoment(sectionId, HappyMomentOrigin.LIGHTBOX);
};

export const sendSectionCompleted = (sectionId: string) => {
  sendBI(
    {
      asset_campaign_guid: sectionId,
    },
    BIEvents.SectionCompleted,
  );
};

export const sendHappyMomentClicked = ({
  sectionId,
  origin,
  clickType,
}: {
  sectionId: string;
  origin: HappyMomentOrigin;
  clickType: BIHappyMomentClickType;
}) => {
  sendBI(
    {
      asset_campaign_guid: sectionId,
      origin,
      click_type: clickType,
    },
    BIEvents.HappyMomentClicked,
  );
};

export const sendHappyMomentTooltipClosed = (sectionId: string) => {
  sendHappyMomentClicked({
    sectionId,
    origin: HappyMomentOrigin.PROGRESS_BAR,
    clickType: BIHappyMomentClickType.close,
  });
};

export const sendHappyMomentTooltipCtaClicked = (sectionId: string) => {
  sendHappyMomentClicked({
    sectionId,
    origin: HappyMomentOrigin.PROGRESS_BAR,
    clickType: BIHappyMomentClickType.click,
  });
};

export const sendHappyMomentModalCtaClicked = (sectionId: string) => {
  sendHappyMomentClicked({
    sectionId,
    origin: HappyMomentOrigin.LIGHTBOX,
    clickType: BIHappyMomentClickType.click,
  });
};

export const sendHappyMomentModalClosed = (sectionId: string) => {
  sendHappyMomentClicked({
    sectionId,
    origin: HappyMomentOrigin.LIGHTBOX,
    clickType: BIHappyMomentClickType.close,
  });
};

export const itemModeForBi = ({
  isSkipped,
  isCompleted,
}: {
  isSkipped: boolean;
  isCompleted: boolean;
}): BIItemMode => {
  if (isSkipped) {
    return BIItemMode.skipped;
  }

  if (isCompleted) {
    return BIItemMode.complete;
  }

  return BIItemMode.open;
};

export const sendProgressBarClicked = () => {
  sendBI(
    {
      name: ProgressBarClickedInfo.NAME,
      app_id: ProgressBarClickedInfo.APP_ID,
      sidebar_name: ProgressBarClickedInfo.SIDEBAR_NAME,
    },
    BIEvents.ProgressBarClicked,
  );
};
