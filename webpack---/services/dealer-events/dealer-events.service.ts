import { EventType } from '@wix/ambassador-dealer-offer-events-service/types';
import { DealerOfferEventsService } from '@wix/ambassador-dealer-offer-events-service/http';
import { DASHBOARD_SETUP_REAL_ESTATE } from '../../consts';

export const DEALER_EVENTS_API_BASE_URL = '/_api/dealer-offer-events-service';
const dealerService = DealerOfferEventsService(
  DEALER_EVENTS_API_BASE_URL,
).DealerOfferEventsService();

export const sendDealerViewEvent = async (
  authorization: string,
  offerId: string,
) =>
  dealerService({
    authorization,
  })
    .reportEvent({
      event: {
        offerId,
        realEstateId: DASHBOARD_SETUP_REAL_ESTATE,
        type: EventType.VIEW,
      },
    })
    .catch();

export const sendDealerClickEvent = async (
  authorization: string,
  offerId: string,
) => {
  dealerService({
    authorization,
  })
    .reportEvent({
      event: {
        offerId,
        realEstateId: DASHBOARD_SETUP_REAL_ESTATE,
        type: EventType.MAIN_CTA_CLICK,
        mainCtaClick: {},
      },
    })
    .catch();
};
