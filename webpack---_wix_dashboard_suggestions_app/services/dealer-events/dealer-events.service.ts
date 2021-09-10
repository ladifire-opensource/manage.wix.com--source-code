import {
  DealerOfferEventsService,
  EventType,
  OfferEvent,
  ReportEventRequest,
  ReportEventResponse,
} from '@wix/ambassador-dealer-offer-events-service/http';
import { getAuthorizationHeader } from '@src/utils';
import { CTA, ActionTargetType } from '@src/common/types';

export const DEALER_EVENTS_API_BASE_URL = '/_api/dealer-offer-events-service';
const service = DealerOfferEventsService(DEALER_EVENTS_API_BASE_URL).DealerOfferEventsService();

export interface DealerEventsService {
  fireSuggestionMainCTAClickedEvent(spec: DealerEventMainCTASpec): void;
  fireSuggestionSecondaryCTAClickedEvent(spec: DealerEventSecondaryCTASpec): void;
  fireSuggestionViewedEvent(spec: DealerEventSpec): void;
  fireSuggestionSkippedEvent(spec: DealerEventSpec): Promise<void>;
  fireSuggestionShowLaterEvent(spec: DealerEventSpec): Promise<void>;
}

export interface DealerEventSpec extends Pick<OfferEvent, 'offerId' | 'realEstateId'> {}

const fireSuggestionViewedEvent = async ({ offerId, realEstateId }: DealerEventSpec) => {
  await fireDealerEvent({
    event: {
      offerId,
      realEstateId,
      type: EventType.VIEW,
    },
  });
};

const fireSuggestionShowLaterEvent = async ({ offerId, realEstateId }: DealerEventSpec) => {
  await fireDealerEvent({
    event: {
      offerId,
      realEstateId,
      type: EventType.SHOW_LATER,
    },
  });
};

const fireSuggestionSkippedEvent = async ({ offerId, realEstateId }: DealerEventSpec) => {
  await fireDealerEvent({
    event: {
      offerId,
      realEstateId,
      type: EventType.SKIP,
    },
  });
};

export interface DealerEventMainCTASpec extends DealerEventSpec {
  cta: CTA;
}

const fireSuggestionMainCTAClickedEvent = async ({
  offerId,
  realEstateId,
  cta,
}: DealerEventMainCTASpec) => {
  const request: ReportEventRequest = {
    event: {
      offerId,
      realEstateId,
      type: EventType.MAIN_CTA_CLICK,
      mainCtaClick: { targetUrl: cta.type === ActionTargetType.externalUrl ? cta.params.url : '' },
    },
  };

  await fireDealerEvent(request);
};

export interface DealerEventSecondaryCTASpec extends DealerEventSpec {
  url: string;
}

const fireSuggestionSecondaryCTAClickedEvent = async ({
  offerId,
  realEstateId,
  url,
}: DealerEventSecondaryCTASpec) => {
  const request: ReportEventRequest = {
    event: {
      offerId,
      realEstateId,
      type: EventType.SECONDARY_CTA_CLICK,
      secondaryCtaClick: { targetUrl: url },
    },
  };

  await fireDealerEvent(request);
};

const fireDealerEvent = async (request: ReportEventResponse) => {
  try {
    await service(getAuthorizationHeader()).reportEvent(request);
  } catch (e) {
    throw e;
  }
};

export const dealerEventsService: DealerEventsService = {
  fireSuggestionViewedEvent,
  fireSuggestionMainCTAClickedEvent,
  fireSuggestionSecondaryCTAClickedEvent,
  fireSuggestionSkippedEvent,
  fireSuggestionShowLaterEvent,
};
