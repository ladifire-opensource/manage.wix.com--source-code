import {
  DealerOfferEventsService,
  EventType,
  OfferEvent,
  ReportEventRequest,
  ReportEventResponse,
} from '@wix/ambassador-dealer-offer-events-service/http';
import { scopedSentry, getAuthorizationHeader } from '@src/utils';
import { SentryHub } from '@wix/yoshi-flow-bm';
import { DealerEventError } from '@src/common/errors';

export const DEALER_EVENTS_API_BASE_URL = '/_api/dealer-offer-events-service';
const service = DealerOfferEventsService(DEALER_EVENTS_API_BASE_URL).DealerOfferEventsService();

export interface DealerEventSpec extends Pick<OfferEvent, 'offerId' | 'realEstateId'> {}

export interface ErrorHanlding {
  sentry: SentryHub;
  metaSiteId: string;
  userId: string;
}

export const fireBannerViewedEvent = async (
  { offerId, realEstateId }: DealerEventSpec,
  { sentry, metaSiteId, userId }: ErrorHanlding,
) => {
  try {
    await fireDealerEvent({
      event: {
        offerId,
        realEstateId,
        type: EventType.VIEW,
      },
    });
  } catch (e) {
    scopedSentry({ metaSiteId, userId, sentry }).captureException(
      new DealerEventError(offerId!, 'view'),
    );
  }
};

export interface DealerEventMainCTASpec extends DealerEventSpec {
  url: string;
}

export const fireBannerClickEvent = async (
  { offerId, realEstateId, url }: DealerEventMainCTASpec,
  { sentry, metaSiteId, userId }: ErrorHanlding,
) => {
  const request: ReportEventRequest = {
    event: {
      offerId,
      realEstateId,
      type: EventType.MAIN_CTA_CLICK,
      mainCtaClick: { targetUrl: url },
    },
  };

  try {
    await fireDealerEvent(request);
  } catch (e) {
    scopedSentry({ metaSiteId, userId, sentry }).captureException(
      new DealerEventError(offerId!, 'click'),
    );
  }
};

export const fireDealerEvent = async (request: ReportEventResponse) =>
  service(getAuthorizationHeader()).reportEvent(request);
