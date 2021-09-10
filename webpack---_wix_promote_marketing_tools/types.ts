import { SOCIAL_CHANNELS } from './constants';

type EMTemplateData = {
  messageId: string;
  templateVariables?: object;
};

type SPTemplateData = {
  intentId: string;
  presetId?: string;
  bgUrl?: string;
  text?: string;
};

type VMTemplateData = {
  scenario: string;
  template: string;
  videoData: object;
  productId?: string;
};

export type ChannelTemplateData =
  | EMTemplateData
  | SPTemplateData
  | VMTemplateData
  | {};

export enum Channel {
  EMAIL_MARKETING = 'EMAIL_MARKETING',
  SOCIAL_POSTS = 'SOCIAL_POSTS',
  VIDEO_MAKER = 'VIDEO_MAKER',
}

export type ChannelsPermitted = Record<Channel, boolean>;

export type PromotionTemplates = {
  intentType: string;
  itemId: string;
  channels: Partial<Record<Channel, ChannelTemplateData[]>>;
  itemThumbnail: string;
};

export type SocialChannel = keyof typeof SOCIAL_CHANNELS;
