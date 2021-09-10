export const EmailMarketingCampaignStatus = {
  SENT: 'sent',
  PUBLISHED: 'published',
  NOT_SENT_TO_ALL: 'not-sent-to-all',
  DECLINED: 'declined',
  SENDING: 'sending',
  IN_REVIEW: 'in-review',
  OTHER: 'other',
};

export type FacebookMarketingCampaignStatusType =
  | 'live'
  | 'paused'
  | 'error'
  | 'ended';

export type FacebookMarketingCampaignIntent =
  | 'UNSPECIFIED'
  | 'Products'
  | 'Services'
  | 'Traffic'
  | 'Event'
  | 'Tickets'
  | 'Leads';

export const FacebookMarketingCampaignStatus: {
  [key: string]: FacebookMarketingCampaignStatusType;
} = {
  LIVE: 'live',
  PAUSED: 'paused',
  ERROR: 'error',
  ENDED: 'ended',
};
