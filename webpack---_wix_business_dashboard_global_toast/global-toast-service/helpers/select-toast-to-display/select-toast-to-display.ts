import { IToastOffer } from '../../types/global-toast';
import { IDismissedToasts } from '../../types/storage';
import {
  getDismissedToasts,
  generateDismissedId,
} from '../../storage/global-toast-storage';

const DAYS_IN_MILISECONDS = 1000 * 60 * 60 * 24;

const isDismissedToast = (
  offer: IToastOffer,
  dissmissedToasts: IDismissedToasts,
) => {
  if (!dissmissedToasts) {
    return false;
  }

  const dissmissedToast = dissmissedToasts[generateDismissedId(offer)];

  if (!dissmissedToast) {
    return false;
  }

  if (!offer.payload.dismissDays) {
    return false;
  }

  const dismissDays = parseInt(offer.payload.dismissDays, 10);
  const daysPassed = Math.floor(
    (Date.now() - dissmissedToast.timestamp) / DAYS_IN_MILISECONDS,
  );

  return daysPassed < dismissDays;
};

const isValidToast = ({ id, name, payload: { message } }: IToastOffer) => {
  return id && name && message;
};

const filterDismissedToasts = async (toasts: IToastOffer[], siteId: string) => {
  const shouldCheckDismissedOffers = toasts.some(
    (offer) => !!offer.payload.dismissDays,
  );

  if (!shouldCheckDismissedOffers) {
    return toasts;
  }

  const dissmissedToasts = await getDismissedToasts(siteId);

  return toasts.filter((toast) => !isDismissedToast(toast, dissmissedToasts));
};

export const selectToastToDisplay = async (
  siteId: string,
  offers: IToastOffer[],
): Promise<IToastOffer> => {
  const validToasts = offers.filter(isValidToast);
  const availableToasts = await filterDismissedToasts(validToasts, siteId);

  return availableToasts[0];
};
