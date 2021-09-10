export * from './api';
export * from './cta';
import { BasicTemplateData, AppMarketTemplateData, CrmAutomationsTemplateData } from '../templates';
import { ActionTargetExternalUrl, CTA } from './cta';

export enum ViewType {
  TOP = 'top',
  SECTION = 'section',
  PAGE = 'page',
}

export interface ViewsSuggestions {
  [ViewType.TOP]: SuggestionOffer[];
  [ViewType.SECTION]: SuggestionOffer[];
  [ViewType.PAGE]: SuggestionOffer[];
}

export interface GroupedSuggestionOffers {
  [key: string]: SuggestionOffer[];
}
export enum SuggestionStatus {
  NORMAL = 'normal',
  SKIPPED = 'skipped',
  SKIPPED_ERROR = 'skipped-error',
  SHOW_LATER = 'show-later',
  SHOW_LATER_ERROR = 'show-later-error',
  REMOVED = 'removed',
}

export interface SuggestionOffer {
  offerId: string;
  dealerOfferName: string;
  dealerRealEstateId: string;
  campaignId?: string;
  tags: string[];
  templateType: TemplateType;
  data?: TemplateTypeData;
  status: SuggestionStatus;
}

export enum TemplateType {
  BASIC = 'basic',
  APP_MARKET = 'app-market',
  CRM_AUTOMATIONS = 'crm-automations',
}

export type TemplateTypeData =
  | BasicTemplateData
  | AppMarketTemplateData
  | CrmAutomationsTemplateData;

export interface TemplateCommonProps {
  viewType: ViewType;
  dataHook?: string;
  index: number;
  suggestion: SuggestionOffer;
  onMainCTAClick: (params: MainCtaClickParams) => void;
  onSecCTAClick?: (cta: ActionTargetExternalUrl) => void;
}

export interface MainCtaClickParams {
  cta: CTA;
  openInSameWindow?: boolean;
}
