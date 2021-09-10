import { Messages } from '@wix/yoshi-flow-bm';
import { SuggestionOffer, ViewType, SuggestionStatus } from '.';

// Will be imported from business-dashboard-api
export interface BusinessDashboardProps {
  onLoaded: () => void;
  widgetTitle?: string;
}
export interface InitialData {
  suggestions?: SuggestionOffer[];
  sortedTags?: string[];
  translations: Messages;
  phase?: string;
  defaultReminderDays?: number;
}
export interface HttpResponse<T> {
  data: T;
}

export interface ResolvedProps extends InitialData {}

export enum PageId {
  HOME = '',
  SUGGESTIONS = 'suggestions',
}

export const Referral = {
  [ViewType.PAGE]: 'dashboard-suggestions-page',
  [ViewType.SECTION]: 'dashboard-suggestions-section',
  [ViewType.TOP]: 'dashboard-top-suggestion',
};

export interface TitleDescriptionPair {
  title: string;
  description: string;
}

export type SuggestionStatusTextKeysType = {
  readonly [Property in keyof SuggestionStatus]: TitleDescriptionPair;
};

export const SuggestionStatusTextKeys: { [key in SuggestionStatus]?: TitleDescriptionPair } = {
  [SuggestionStatus.SKIPPED]: {
    title: 'suggestion.widget.removed.title',
    description: 'suggestion.widget.removed.desc',
  },
  [SuggestionStatus.SKIPPED_ERROR]: {
    title: 'suggestion.widget.removed.title.error',
    description: 'suggestion.widget.removed.desc.error',
  },
  [SuggestionStatus.SHOW_LATER]: {
    title: 'suggestion.widget.show.me.later.title',
    description: 'suggestion.widget.show.me.later.desc',
  },
  [SuggestionStatus.SHOW_LATER_ERROR]: {
    title: 'suggestion.widget.show.me.later.title.error',
    description: 'suggestion.widget.show.me.later.desc.error',
  },
};
