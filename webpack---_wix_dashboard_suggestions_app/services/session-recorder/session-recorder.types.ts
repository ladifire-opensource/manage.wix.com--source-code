import { ViewType } from '@src/common/types';

export enum CustomAttribute {
  Load = 'suggestions-load',
  Event = 'suggestions-event',
}

export const SUGGESTION_MAIN_CTA_CLICKED_PREFIX = 'main-cta-clicked';
export const SUGGESTION_SECONDARY_CTA_CLICKED_PREFIX = 'secondary-cta-clicked';
export const SEE_ALL_SUGGESTIONS_CLICKED_PREFIX = 'see-all-clicked';
export const CAROUSEL_CLICKED_PREFIX = 'carousel-clicked';
export const SUGGESTION_SKIP_CLICKED_PREFIX = 'skip';
export const SUGGESTION_SHOW_LATER_CLICKED_PREFIX = 'show-later';
export const SUGGESTION_MENU_CLICKED_PREFIX = 'actions-menu';

export interface SessionRecorder {
  markLoaded(view: ViewType, phase?: string): void;
  markSeeAllSuggestion(view: ViewType): void;
  markMainCtaClick(offerName: string, view: ViewType): void;
  markSkipClick(offerName: string, view: ViewType): void;
  markMenuClick(offerName: string, view: ViewType): void;
  markShowLaterClick(offerName: string, view: ViewType): void;
  markSecondaryCtaClick(offerName: string, view: ViewType): void;
  markCarouselClicked(fromOffer: string, toOfferName: string): void;
}
