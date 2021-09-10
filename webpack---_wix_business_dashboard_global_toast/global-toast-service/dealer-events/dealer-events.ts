import {
  DealerOfferEventsService,
  EventType,
  ReportEventResponse,
} from '@wix/ambassador-dealer-offer-events-service/http';
import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';
import { DEALER_GLOBAL_TOASTS_REAL_ESTATE } from '../../consts';

export const DEALER_EVENTS_SERVICE_URL = '/_api/dealer-offer-events-service';

const dealerService = DealerOfferEventsService(DEALER_EVENTS_SERVICE_URL, {
  useRedaxios: true,
}).DealerOfferEventsService();

export const sendToastSeen =
  (offerId: string): (() => void) =>
  (): Promise<ReportEventResponse> =>
    dealerService({
      Authorization: getCurrentInstance(appDefIds.dashboard),
    }).reportEvent({
      event: {
        offerId,
        realEstateId: DEALER_GLOBAL_TOASTS_REAL_ESTATE,
        type: EventType.VIEW,
      },
    });

export const sendToastClicked =
  ({
    offerId,
    targetUrl,
  }: {
    offerId: string;
    targetUrl: string;
  }): (() => void) =>
  (): Promise<ReportEventResponse> =>
    dealerService({
      Authorization: getCurrentInstance(appDefIds.dashboard),
    }).reportEvent({
      event: {
        offerId,
        realEstateId: DEALER_GLOBAL_TOASTS_REAL_ESTATE,
        type: EventType.MAIN_CTA_CLICK,
        mainCtaClick: {
          targetUrl,
        },
      },
    });

export const sendToastClosed = (
  offerId: string,
): Promise<ReportEventResponse> =>
  dealerService({
    Authorization: getCurrentInstance(appDefIds.dashboard),
  }).reportEvent({
    event: {
      offerId,
      realEstateId: DEALER_GLOBAL_TOASTS_REAL_ESTATE,
      type: EventType.CLOSE,
    },
  });
