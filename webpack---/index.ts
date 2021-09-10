import { DealerOfferDetails } from './dealer/types';
import { createButton } from './components/Button';
import { fedopsLogger } from './sdk';
import { createUserStorage } from './data-capsule-helpers';
import { getActiveSession } from './util/api';
import { subscribeToNavigation } from './util/subscribeToNavigation';
import { subscribeToStateChange } from './store/subscribeToStateChange';
import { decideInitialRender } from './render/decideInitialRender';
import { mount } from './render/mount';
import { getFirstOffer } from './dealer/getOffer';

import type { InitParams } from './types';
import { biWidgetLoadAttempt, biWidgetLoadFailure } from './bi';
import { WIDGET_LOAD_FAIL_PHASE } from './types';

// DO NOT TOUCH THIS CODE
export const renderButton = (
  dealerOfferDetails: DealerOfferDetails | undefined,
) => {
  const chatBotUrl =
    dealerOfferDetails?.payload?.chatbotConfig?.value ||
    'https://www.wix.com/support/conversations/category/contact';
  const textContent =
    dealerOfferDetails?.payload?.chatbotConfig?.key || 'Need Help?';

  return mount([createButton(chatBotUrl, textContent)]);
};
// END

export const initWidget = async (params: InitParams): Promise<void> => {
  try {
    biWidgetLoadAttempt(params);
    if (!params.origin) {
      throw new Error('WixSupportChatSDK: origin is required');
    }
    const userStorage = createUserStorage();

    fedopsLogger.interactionStarted('dealer-capsule-requests');
    const [dealerOffer, widgetData, activeSession] = await Promise.all([
      getFirstOffer(params).catch((e) => {
        console.error('getFirstOffer - failure', e.message);
        return undefined;
      }),
      userStorage.getWidgetData(),
      getActiveSession(),
    ]);
    fedopsLogger.interactionEnded('dealer-capsule-requests');

    // handle the collapse/drag/etc changes
    subscribeToStateChange(userStorage);

    // handle page navigation
    subscribeToNavigation(userStorage, params);

    return decideInitialRender({
      activeSession,
      widgetData,
      dealerOffer,
      params,
    });
  } catch (error) {
    biWidgetLoadFailure({
      failReason: WIDGET_LOAD_FAIL_PHASE.STATE_LOADING,
      failDetails: error.message,
      initParams: params,
    });
    console.error('initWidget', error.message);
    throw new Error(error.message);
  }
};

export * from './types';
