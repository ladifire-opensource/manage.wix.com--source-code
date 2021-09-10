import { ViewType } from '@src/common/types';
import { WixRecorder } from '@wix/wix-recorder';
import {
  CustomAttribute,
  SessionRecorder,
  SUGGESTION_MAIN_CTA_CLICKED_PREFIX,
  SUGGESTION_SECONDARY_CTA_CLICKED_PREFIX,
  SEE_ALL_SUGGESTIONS_CLICKED_PREFIX,
  CAROUSEL_CLICKED_PREFIX,
  SUGGESTION_SHOW_LATER_CLICKED_PREFIX,
  SUGGESTION_SKIP_CLICKED_PREFIX,
  SUGGESTION_MENU_CLICKED_PREFIX,
} from './session-recorder.types';

const initSessionRecorder = (wixRecorder: WixRecorder): SessionRecorder => {
  return {
    markLoaded: (view: ViewType, phase?: string): void => {
      wixRecorder.addCustomAttribute(CustomAttribute.Load, `${view}_${phase || 'undefined-phase'}`);
    },
    markSeeAllSuggestion: (view: ViewType): void => {
      wixRecorder.addCustomAttribute(
        CustomAttribute.Event,
        `${SEE_ALL_SUGGESTIONS_CLICKED_PREFIX}_${view}`,
      );
    },
    markMainCtaClick: (offerName: string, view: ViewType): void => {
      wixRecorder.addCustomAttribute(
        CustomAttribute.Event,
        `${SUGGESTION_MAIN_CTA_CLICKED_PREFIX}_${view}_${offerName}`,
      );
    },
    markSecondaryCtaClick: (offerName: string, view: ViewType): void => {
      wixRecorder.addCustomAttribute(
        CustomAttribute.Event,
        `${SUGGESTION_SECONDARY_CTA_CLICKED_PREFIX}_${view}_${offerName}`,
      );
    },
    markSkipClick: (offerName: string, view: ViewType): void => {
      wixRecorder.addCustomAttribute(
        CustomAttribute.Event,
        `${SUGGESTION_SKIP_CLICKED_PREFIX}_${view}_${offerName}`,
      );
    },
    markMenuClick: (offerName: string, view: ViewType): void => {
      wixRecorder.addCustomAttribute(
        CustomAttribute.Event,
        `${SUGGESTION_MENU_CLICKED_PREFIX}_${view}_${offerName}`,
      );
    },
    markShowLaterClick: (offerName: string, view: ViewType): void => {
      wixRecorder.addCustomAttribute(
        CustomAttribute.Event,
        `${SUGGESTION_SHOW_LATER_CLICKED_PREFIX}_${view}_${offerName}`,
      );
    },
    markCarouselClicked: (fromOffer: string, toOfferName: string): void => {
      wixRecorder.addCustomAttribute(
        CustomAttribute.Event,
        `${CAROUSEL_CLICKED_PREFIX}_from_${fromOffer}_to_${toOfferName}`,
      );
    },
  };
};

export const sessionRecorder = initSessionRecorder(window.wixRecorder);
