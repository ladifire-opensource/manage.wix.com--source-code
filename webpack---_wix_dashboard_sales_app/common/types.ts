import { Messages } from '@wix/yoshi-flow-bm';
import { InitialDataResponse } from '@src/api';
import { ExperimentsBag } from '@wix/wix-experiments';

export interface BannerInitialData extends InitialDataResponse {
  translations: Messages;
  experiments?: ExperimentsBag;
}

export interface BannerOffer {
  offerId: string;
  offerName: string;
  realEstateId: string;
  type: BannerOfferType;
  data: BannerOfferData;
  domainName?: string;
  siteName?: string;
}

export enum BannerOfferType {
  PROMOTE = 'regular',
  SALE = 'sale',
}

export type BannerOfferData = PromoteTemplateData | SaleTemplateData;

export interface BaseTemplateData {
  dismissible: boolean;
  cta: CTA;
  backgroundColor: string;
}

export interface PromoteTemplateData extends BaseTemplateData {
  titleBefore: BannerText;
  titleAfter?: BannerText;
}

export interface SaleTemplateData extends BaseTemplateData {
  title: BannerText;
  subtitleBefore?: BannerText;
  subtitleAfter?: BannerText;
  legalNote?: LegalNote;
  counter?: Counter;
}

export interface Theme {
  color: string;
  weight: TextWeight;
}

export enum TextWeight {
  BOLD = 'bold',
  NORMAL = 'normal',
}

export interface BannerText extends Theme {
  titleKey: string;
}

export interface CTA extends BannerText {
  url: string;
  backgroundColor: string;
}

export interface LegalNote extends BannerText {
  datetime?: Date;
}

export interface Counter extends Theme {
  countingHours: number;
  endDate: Date;
}

export enum BannerPosition {
  TOP = 'top',
  BOTOOM = 'bottom',
}
