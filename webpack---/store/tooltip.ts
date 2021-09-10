import { dispatch } from '.';
import { DealerOfferDetails, DealerOfferPayloadTooltip } from '../dealer/types';
import { isEqual } from './util';

export type ITooltipStatePerOffer = {
  offerGuid: string;
  closedAt: number;
};

export type ITooltipState = {
  lastOpenAt?: number;
  closedAt?: number;
  perOffer?: ITooltipStatePerOffer[];
};

export const closedStateExpired = (
  closedAt: number,
  tooltipCloseTimeout: number,
): boolean => {
  const closedAtTime = new Date(closedAt).getTime();
  return Date.now() - closedAtTime > tooltipCloseTimeout;
};

// true if tooltip state has global closedAt or perOffer closedAt
export const isClosedTooltip = (
  tooltipCloseTimeout: number = 0,
  state?: ITooltipState,
  dealerOfferGuid?: string,
): boolean => {
  if (!state || !dealerOfferGuid) {
    return false;
  }

  if (
    state.closedAt &&
    !closedStateExpired(state.closedAt, tooltipCloseTimeout)
  ) {
    return true;
  }

  return !!state.perOffer?.find(
    ({ offerGuid, closedAt }) =>
      offerGuid === dealerOfferGuid &&
      !closedStateExpired(closedAt, tooltipCloseTimeout),
  );
};

export const getTooltipFromOffer = (
  offer?: DealerOfferDetails,
): DealerOfferPayloadTooltip | undefined => {
  if (
    offer &&
    offer.payload.tooltipAppearanceAfterXSeconds &&
    offer.payload.tooltipTitle
  ) {
    return {
      tooltipAppearanceAfterXSeconds:
        offer.payload.tooltipAppearanceAfterXSeconds,
      tooltipContent: offer.payload.tooltipContent,
      tooltipCta: offer.payload.tooltipCta,
      tooltipTitle: offer.payload.tooltipTitle,
    };
  }

  return undefined;
};

// Get tooltip state and update it if closedAt dates expired
export const getTooltipState = (
  state?: ITooltipState,
  tooltipCloseTimeout: number = 0,
): ITooltipState | undefined => {
  if (!state) {
    return undefined;
  }

  const newState = { ...state };

  // if global closedAt date expired, we clear it
  if (
    state.closedAt &&
    closedStateExpired(state.closedAt, tooltipCloseTimeout)
  ) {
    delete newState.closedAt;
  }

  // then go through perOffer entries and delete expired ones
  if (Array.isArray(state.perOffer)) {
    newState.perOffer = state.perOffer
      .map(
        (statePerOffer) =>
          !closedStateExpired(statePerOffer.closedAt, tooltipCloseTimeout) && {
            ...statePerOffer,
          },
      )
      .filter(Boolean) as ITooltipStatePerOffer[];

    if (newState.perOffer.length === 0) {
      delete newState.perOffer;
    }
  }

  if (!isEqual(state, newState)) {
    dispatch('widget/tooltip/update', newState);
  }

  return newState;
};
