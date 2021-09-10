import {
  assetClickParams,
  assetViewParams,
  clickInDashboardParams,
  Logger,
  suggestionFeedbackClickParams,
} from '@wix/bi-logger-suggestions-widget';
import { appDefIds } from '@wix/business-manager-api';
import {
  MainCtaSpec,
  SecCtaSpec,
  ReminderMeLaterSpec,
  GetFeedbackSpec,
  VisibilityChangeSpec,
  NavigateToPageSpec,
} from './types';
import {
  userClickedAnItemBIEvent,
  userClickedOnSecondaryItemBIEvent,
  PromotionType,
  VisibilityTrigger,
  userSawAnItemBIEvent,
  populateBILogVisibilityTriggerField,
  populateBILogLocationField,
  ClickType,
  populateBILogTagFieldOnlyForPage,
  userNavigateToSpecificPageBIEvent,
  userSkippedItemBIEvent,
  userClickedOnActionsMenuBIEvent,
  userClickedOnClose,
  populateBILogWidgetNameField,
  userShowedLaterBIEvent,
  populateBILogPromotionType,
  populateBILogClickType,
} from '../bi-logger';
import { useServices } from '../services';
import {
  ViewType,
  SuggestionStatus,
  SuggestionOffer,
  ActionTargetType,
  TemplateType,
} from '@src/common/types';

interface CommonActionSpec {
  metaSiteId: string;
  selectedTag: string;
  biLogger: Logger;
  viewType: ViewType;
  accountLanguage: string;
}

interface RemovalActionSpec extends CommonActionSpec {
  setSuggestionStatus: (offerId: string, status: SuggestionStatus) => void;
  suggestions: SuggestionOffer[] | undefined;
  removeTag: (tag: string) => void;
}

const RemoveTagsOnlyForPage = (
  tags: string[],
  viewType: ViewType,
  suggestions: SuggestionOffer[] | undefined,
  removeTag: (tag: string) => void,
) => {
  if (viewType !== ViewType.PAGE) {
    return;
  }
  const shouldRemoveTag = (tag: string) =>
    suggestions?.filter(offer => offer.tags.includes(tag)).length === 1;
  const shouldBeRemoved = tags.filter(tag => shouldRemoveTag(tag));
  shouldBeRemoved && shouldBeRemoved.forEach(removeTag);
};

export const onMainCtaClicked =
  ({ viewType, metaSiteId, biLogger, selectedTag, accountLanguage }: CommonActionSpec) =>
  (spec: MainCtaSpec) => {
    const {
      navigateToCTA,
      sessionRecorder,
      dealerEventsService: { fireSuggestionMainCTAClickedEvent },
    } = useServices();

    let biLog: assetClickParams = {
      asset_campaign_guid: spec.dealerRealEstateId,
      asset_campaign_id: spec.dealerOfferName,
      offering_guid: spec.offerId,
      click_type: ClickType.CLICK,
      visibility_trigger: VisibilityTrigger.NORMAL,
    };
    biLog = populateBILogPromotionType(biLog, spec.templateType);
    biLog = populateBILogLocationField(biLog, spec.index, viewType);
    biLog = populateBILogTagFieldOnlyForPage(biLog, viewType, selectedTag);
    biLog = populateBILogClickType(biLog, viewType, spec.templateType);

    userClickedAnItemBIEvent(biLogger)(biLog);

    fireSuggestionMainCTAClickedEvent({
      offerId: spec.offerId,
      realEstateId: spec.dealerRealEstateId,
      cta: spec.cta,
    });

    sessionRecorder.markMainCtaClick(spec.dealerOfferName, viewType);

    return navigateToCTA({
      cta: spec.cta,
      metaSiteId,
      viewType,
      accountLanguage,
      openInSameWindow: spec.openInSameWindow,
    });
  };

export const onSecCtaClicked =
  ({ viewType, biLogger, selectedTag, metaSiteId }: CommonActionSpec) =>
  (spec: SecCtaSpec) => {
    const {
      navigateToCTA,
      sessionRecorder,
      dealerEventsService: { fireSuggestionSecondaryCTAClickedEvent },
    } = useServices();

    let biLog: assetClickParams = {
      asset_campaign_guid: spec.dealerRealEstateId,
      asset_campaign_id: spec.dealerOfferName,
      offering_guid: spec.offerId,
      promotion_asset_type: PromotionType.EXTERNAL_URL,
      click_type: ClickType.SUB_CLICK,
      visibility_trigger: VisibilityTrigger.NORMAL,
    };
    biLog = populateBILogLocationField(biLog, spec.index, viewType);
    biLog = populateBILogTagFieldOnlyForPage(biLog, viewType, selectedTag);

    userClickedOnSecondaryItemBIEvent(biLogger)(biLog);

    fireSuggestionSecondaryCTAClickedEvent({
      offerId: spec.offerId,
      realEstateId: spec.dealerRealEstateId,
      url: spec.cta.params.url,
    });

    sessionRecorder.markSecondaryCtaClick(spec.dealerOfferName, viewType);
    navigateToCTA({
      cta: spec.cta,
      metaSiteId,
      viewType,
    });
  };

export const onRemoveClicked =
  ({ viewType, biLogger, suggestions, removeTag, setSuggestionStatus }: RemovalActionSpec) =>
  (spec: ReminderMeLaterSpec) => {
    let biLog: clickInDashboardParams = {};

    biLog = populateBILogWidgetNameField(biLog, viewType);
    userClickedOnClose(biLogger)(biLog);
    RemoveTagsOnlyForPage(spec.tags, viewType, suggestions, removeTag);
    setSuggestionStatus(spec.offerId, SuggestionStatus.REMOVED);
  };

export const onMenuClicked =
  ({ viewType, biLogger, selectedTag }: CommonActionSpec) =>
  (spec: ReminderMeLaterSpec) => {
    const { sessionRecorder } = useServices();

    let biLog: suggestionFeedbackClickParams = {
      asset_campaign_guid: spec.dealerRealEstateId,
      asset_campaign_id: spec.dealerOfferName,
      offering_guid: spec.offerId,
      click_name: ClickType.MENU,
    };
    biLog = populateBILogLocationField(biLog, spec.index, viewType);
    biLog = populateBILogTagFieldOnlyForPage(biLog, viewType, selectedTag);

    userClickedOnActionsMenuBIEvent(biLogger)(biLog);

    sessionRecorder.markMenuClick(spec.dealerOfferName, viewType);
  };

export const onSuggestionVisibilityChange =
  ({ viewType, biLogger, selectedTag }: CommonActionSpec) =>
  (spec: VisibilityChangeSpec) => {
    const {
      dealerEventsService: { fireSuggestionViewedEvent },
    } = useServices();

    let biLog: assetViewParams = {
      asset_campaign_guid: spec.dealerRealEstateId,
      asset_campaign_id: spec.dealerOfferName,
      offering_guid: spec.offerId,
    };
    biLog = populateBILogPromotionType(biLog, spec.templateType);
    biLog = populateBILogLocationField(biLog, spec.index, viewType);
    biLog = populateBILogVisibilityTriggerField(biLog, spec.initialInViewport);
    biLog = populateBILogTagFieldOnlyForPage(biLog, viewType, selectedTag);

    userSawAnItemBIEvent(biLogger)(biLog);

    fireSuggestionViewedEvent({ offerId: spec.offerId, realEstateId: spec.dealerRealEstateId });
  };

export const onSkipClicked =
  (
    { viewType, biLogger, selectedTag }: CommonActionSpec,
    setSuggestionStatus: (offerId: string, status: SuggestionStatus) => void,
  ) =>
  (spec: ReminderMeLaterSpec) => {
    const {
      sessionRecorder,
      dealerEventsService: { fireSuggestionSkippedEvent },
    } = useServices();

    let biLog: suggestionFeedbackClickParams = {
      asset_campaign_guid: spec.dealerRealEstateId,
      asset_campaign_id: spec.dealerOfferName,
      offering_guid: spec.offerId,
    };
    biLog = populateBILogLocationField(biLog, spec.index, viewType);
    biLog = populateBILogTagFieldOnlyForPage(biLog, viewType, selectedTag);

    setSuggestionStatus(spec.offerId, SuggestionStatus.SKIPPED);
    userSkippedItemBIEvent(biLogger)(biLog);
    fireSuggestionSkippedEvent({
      offerId: spec.offerId,
      realEstateId: spec.dealerRealEstateId,
    }).catch(e => {
      setSuggestionStatus(spec.offerId, SuggestionStatus.SKIPPED_ERROR);
    });

    sessionRecorder.markSkipClick(spec.dealerOfferName, viewType);
  };

export const onReminderMeLaterClicked =
  (
    { viewType, biLogger, selectedTag }: CommonActionSpec,
    setSuggestionStatus: (offerId: string, status: SuggestionStatus) => void,
  ) =>
  (spec: ReminderMeLaterSpec) => {
    const {
      sessionRecorder,
      dealerEventsService: { fireSuggestionShowLaterEvent },
    } = useServices();

    let biLog: suggestionFeedbackClickParams = {
      asset_campaign_guid: spec.dealerRealEstateId,
      asset_campaign_id: spec.dealerOfferName,
      offering_guid: spec.offerId,
    };
    biLog = populateBILogLocationField(biLog, spec.index, viewType);
    biLog = populateBILogTagFieldOnlyForPage(biLog, viewType, selectedTag);
    userShowedLaterBIEvent(biLogger)(biLog);

    setSuggestionStatus(spec.offerId, SuggestionStatus.SHOW_LATER);

    fireSuggestionShowLaterEvent({
      offerId: spec.offerId,
      realEstateId: spec.dealerRealEstateId,
    }).catch(e => {
      setSuggestionStatus(spec.offerId, SuggestionStatus.SHOW_LATER_ERROR);
    });

    sessionRecorder.markShowLaterClick(spec.dealerOfferName, viewType);
  };

export const onGetFeedbackClicked = (spec: GetFeedbackSpec) => {};

export const onNavigateToPage =
  ({ biLogger, metaSiteId, viewType, accountLanguage }: CommonActionSpec) =>
  ({ pageId, originWidget, place }: NavigateToPageSpec) => {
    userNavigateToSpecificPageBIEvent(biLogger, pageId, originWidget, place);

    const { navigateToCTA, sessionRecorder } = useServices();
    sessionRecorder.markSeeAllSuggestion(viewType);
    navigateToCTA({
      cta: {
        type: ActionTargetType.bizMgrNavigation,
        titleKey: '',
        params: {
          pageComponentId: appDefIds.dashboard,
          openInNewTab: false,
          contextData: {
            appState: pageId,
          },
        },
      },
      metaSiteId,
      viewType,
      accountLanguage,
    });
  };
