import { DealerOfferPayload } from '../dealer/types';
import { BusinessHours, isInWorkingTime } from '@wix/wix-chatbot-common';
import { defaultBaseUrl } from '../constants';

export const getChatbotUrl = (
  dealerPayload?: DealerOfferPayload,
): string | undefined => {
  if (!dealerPayload) {
    return undefined;
  }
  if (dealerPayload.chatbotConfig.value && isWorkingHours(dealerPayload)) {
    try {
      const url = new URL(dealerPayload.chatbotConfig.value, defaultBaseUrl);
      return url.href;
    } catch (e) {}
  }
  return undefined;
};

function isWorkingHours(dealerPayload: DealerOfferPayload): Boolean {
  try {
    if (dealerPayload.workingHoursSchema) {
      const workingHours = JSON.parse(
        dealerPayload.workingHoursSchema,
      ) as BusinessHours;
      return isInWorkingTime(new Date(), workingHours);
    }
    return true;
  } catch (error) {
    console.error('isWorkingHours failed', error.message);
    return false;
  }
}
