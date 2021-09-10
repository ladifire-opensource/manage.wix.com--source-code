import { BannerPosition } from '@types';
import { Translate } from 'wix-animations';

export const positionToAnimationConfig: Record<BannerPosition, Translate> = {
  [BannerPosition.TOP]: {
    enter: 'bottom',
    exit: 'top',
  },
  [BannerPosition.BOTOOM]: {
    enter: 'top',
    exit: 'bottom',
  },
};
