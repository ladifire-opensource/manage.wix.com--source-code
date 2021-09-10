import { IState } from './widget';
import { isMobile, getQueryParam } from '../util';
import { DealerOfferDetails, DealerOfferPayload } from '../dealer/types';
import { getTooltipState } from './tooltip';
import { InitParams } from '../types';

export type GenerateSessionParams = {
  startUrl: string;
  params: Partial<InitParams>;
  widgetData?: Partial<IState>;
  dealerOffer?: DealerOfferDetails;
};

const updateExpandedState = (
  widgetData: Partial<IState> = {},
  dealerPayload: DealerOfferPayload | undefined,
): Partial<IState> => {
  let expanded;
  if ('expanded' in widgetData) {
    expanded = widgetData.expanded;
  } else {
    expanded = !isMobile && Boolean(dealerPayload?.chatOpened);
  }
  return {
    ...widgetData,
    expanded,
  };
};

export function generateActiveSession({
  startUrl,
  params,
  widgetData = {},
}: GenerateSessionParams) {
  return {
    lastUpdated: Date.now(),
    // take expanded from widgetData, or default to true on desktop and false on mobile
    expanded: widgetData.expanded ?? !isMobile,
    left: widgetData.left,
    top: widgetData.top,
    right: widgetData.right,
    bottom: widgetData.bottom,
    isActiveSession: true,
    referral: getQueryParam(startUrl, 'referral'),
    startUrl,
    tooltip: getTooltipState(widgetData.tooltip, params.tooltipCloseTimeout),
  };
}

export function generateNotActiveSession({
  startUrl,
  params,
  dealerOffer,
  widgetData = {},
}: GenerateSessionParams) {
  const widgetDataUpdated = updateExpandedState(
    widgetData,
    dealerOffer?.payload,
  );

  return {
    lastUpdated: Date.now(),
    expanded: Boolean(widgetDataUpdated.expanded),
    left: widgetDataUpdated.left,
    top: widgetDataUpdated.top,
    right: widgetDataUpdated.right,
    bottom: widgetDataUpdated.bottom,
    isActiveSession: false,
    orig_page_name: document.title,
    orig_platform: window.location.href,
    referral: getQueryParam(startUrl, 'referral'),
    startUrl,
    tooltip: getTooltipState(
      widgetDataUpdated.tooltip,
      params.tooltipCloseTimeout,
    ),
  };
}
