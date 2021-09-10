import { LocalStorageCapsule } from 'data-capsule';
import { PREMIUM_BANNER_NUMBER_DAYS_TO_DISMISS_EXPIRATION } from '@consts';
import {
  DAY_IN_MS,
  LOCAL_STORAGE_NAMESPACE,
  DISMISS_STORAGE_KEY,
} from './dismiss-expiration.consts';

export const localStorageCapsule = LocalStorageCapsule({ namespace: LOCAL_STORAGE_NAMESPACE });

const getDismissExpiration = (): number =>
  new Date().getTime() + DAY_IN_MS * PREMIUM_BANNER_NUMBER_DAYS_TO_DISMISS_EXPIRATION; // expire in one day.

export const getCapsuleScope = (metaSiteId: string, userId: string) => `${userId}:${metaSiteId}`;

export const saveDismissAction = async (metaSiteId: string, userId: string) => {
  await localStorageCapsule.setItem(DISMISS_STORAGE_KEY, getDismissExpiration(), {
    scope: getCapsuleScope(metaSiteId, userId),
  });
};

export const hasValidDismiss = async (metaSiteId: string, userId: string) => {
  try {
    const lastDismiss = await localStorageCapsule.getItem(DISMISS_STORAGE_KEY, {
      scope: getCapsuleScope(metaSiteId, userId),
    });

    return new Date().getTime() < lastDismiss;
  } catch {
    return false;
  }
};
