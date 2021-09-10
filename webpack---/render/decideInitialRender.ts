import type { InitParams } from '../types';
import { defaultUrl } from '../constants';
import { getChatbotUrl } from '../util/getChatbotUrl';
import {
  generateActiveSession,
  generateNotActiveSession,
} from '../store/sessionGenerators';
import { IState } from '../store/widget';
import { buildWidgetUrl, isSessionActive } from '../util';
import { ActiveSession } from '../util/api';
import { renderWidget } from './renderWidget';
import { biWidgetLoadFailure } from '../bi';
import { DealerOfferDetails } from '../dealer/types';
import { WIDGET_LOAD_FAIL_PHASE } from '../types';

export type InitialRenderParams = {
  activeSession: ActiveSession | null;
  params: InitParams;
  widgetData?: IState;
  dealerOffer?: DealerOfferDetails;
};

export const decideInitialRender = (initialParams: InitialRenderParams) => {
  const { activeSession, widgetData, dealerOffer, params } = initialParams;
  try {
    if (isSessionActive(activeSession)) {
      const startUrl = buildWidgetUrl(
        `${defaultUrl}${activeSession.startUrl}`,
        {
          group_name: params.origin,
        },
      );
      const session = generateActiveSession({
        startUrl,
        widgetData,
        params,
      });
      return renderWidget(session, params, dealerOffer);
    }

    const href = getChatbotUrl(dealerOffer?.payload);
    if (href) {
      const startUrl = buildWidgetUrl(href, { group_name: params.origin });
      const session = generateNotActiveSession({
        startUrl,
        widgetData,
        params,
        dealerOffer,
      });
      return renderWidget(session, params, dealerOffer);
    }

    if (params.testMode) {
      const startUrl = buildWidgetUrl(defaultUrl, {
        group_name: params.origin,
      });
      const session = generateNotActiveSession({
        startUrl,
        widgetData,
        params,
        dealerOffer,
      });
      return renderWidget(session, params, dealerOffer);
    }
  } catch (e) {
    biWidgetLoadFailure({
      failReason: WIDGET_LOAD_FAIL_PHASE.CRITERIA_CHECK_UNEXPECTED_ERROR,
      failDetails: e.message,
      initParams: params,
    });
    return e;
  }
  biWidgetLoadFailure({
    failReason: WIDGET_LOAD_FAIL_PHASE.CRITERIA_CHECK_MISS_MATCH,
    failDetails: JSON.stringify(dealerOffer),
    initParams: params,
  });
};
