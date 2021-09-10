export const MODULE = 'promoteMarketingTools';

export const METHODS = {
  GET_CHANNELS_PERMITTED: 'getChannelsPermitted',
  GET_PROMOTION_TEMPLATES: 'getPromotionTemplates',
  PROMOTE_IN_CHANNEL: 'promoteInChannel',
};

export const FEDOPS_INTERACTIONS = {
  GET_PROMOTION_TEMPLATES: 'get-promotion-templates',
  PROMOTE_IN_CHANNEL: 'promote-in-channel',
};

export const SOCIAL_CHANNELS = {
  FACEBOOK: 'FACEBOOK',
  TWITTER: 'TWITTER',
  WHATSAPP: 'WHATSAPP',
  PINTEREST: 'PINTEREST',
  LINKEDIN: 'LINKEDIN',
} as const;

export const EXPERIMENTS = {
  WSR_NEW_SPACING: 'specs.promote.promote-marketing-tools.wsrNewSpacing',
};
