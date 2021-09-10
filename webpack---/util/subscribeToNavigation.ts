import type { InitParams } from '../types';
import { renderWidget } from '../render/renderWidget';
import { UserStorageType } from '../data-capsule-helpers';
import { getFirstOffer } from '../dealer/getOffer';
import { dispatch, getState } from '../store';
import { generateNotActiveSession } from '../store/sessionGenerators';
import { onPopState, onPushState, onReplaceState } from './historyTracker';
import { buildWidgetUrl } from '.';
import { getChatbotUrl } from './getChatbotUrl';

export const subscribeToNavigation = (
  userStorage: UserStorageType,
  params: InitParams,
) => {
  const handleNavigation = async (): Promise<void> => {
    const state = getState();

    dispatch('page/navigate');

    // user is already using the bot
    if (state.isActiveSession) {
      return;
    }

    const [dealerOffer, widgetData] = await Promise.all([
      getFirstOffer(params).catch((e) => {
        console.error('getFirstOffer - failure', e.message);
        return undefined;
      }),
      userStorage.getWidgetData(),
    ]);

    const href = getChatbotUrl(dealerOffer?.payload);

    if (!href && state.expanded) {
      // collapse expanded widget
      dispatch('widget/toggle');
    }

    // hide the current widget [if no dealer href]
    dispatch('widget/startUrl', href);

    if (href) {
      const startUrl = buildWidgetUrl(href, { group_name: params.origin });
      const session = generateNotActiveSession({
        startUrl,
        widgetData,
        params,
        dealerOffer,
      });
      // render widget triggered by the internal page navigation
      renderWidget(session, params, dealerOffer);
    }
  };
  onPushState(handleNavigation);
  onReplaceState(handleNavigation);
  onPopState(handleNavigation);
};
