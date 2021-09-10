import {
  fetchToastsFromDealer,
  selectToastToDisplay,
  mapToastOfferToToastConfig,
} from './helpers';
import {
  setDismissedToast,
  generateDismissedId,
} from './storage/global-toast-storage';
import { IToastOffer } from './types/global-toast';
import { showToast } from '@wix/business-manager-api';
import { sendToastSeen, sendToastClosed } from './dealer-events';

const onCloseClickHandler =
  (metaSiteId: string, displayedOffer: IToastOffer): (() => void) =>
  (): void => {
    if (!displayedOffer.payload.dismissDays) {
      return;
    }

    sendToastClosed(displayedOffer.id);

    setDismissedToast(metaSiteId, {
      id: generateDismissedId(displayedOffer),
      timestamp: Date.now(),
    }).catch((err) => console.error(err));
  };

export const runGlobalToasts = async ({
  metaSiteId,
}: {
  metaSiteId: string;
}): Promise<void> => {
  const toasts = await fetchToastsFromDealer();
  const toastToDisplay = await selectToastToDisplay(metaSiteId, toasts);

  if (!toastToDisplay) {
    return;
  }

  const toastConfig = mapToastOfferToToastConfig({
    offer: toastToDisplay,
    metaSiteId,
    onCloseClick: onCloseClickHandler(metaSiteId, toastToDisplay),
  });

  showToast({ ...toastConfig, onToastSeen: sendToastSeen });
};
