import { Channel } from './types';

export const CHANNELS_PERMISSIONS = {
  [Channel.EMAIL_MARKETING]: ['shoutout.manage'],
  [Channel.SOCIAL_POSTS]: ['promote-shareit.manage'],
  [Channel.VIDEO_MAKER]: ['VIDEO-MAKER.MANAGE-ACCESS'],
};
