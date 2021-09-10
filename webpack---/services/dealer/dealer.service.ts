import {
  Offer,
  DealerOffersServingService,
} from '@wix/ambassador-dealer-offers-serving-service/http';
import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';
import { FormattedOffer } from '@types';
import { REAL_ESTATE_ID } from '@consts';

export const DEALER_SERVICE_URL = '/_api/dealer-offers-serving-service';

export const formatOffers = (offers: Offer[]): FormattedOffer[] =>
  offers.map((offer) => {
    const parseData = JSON.parse(offer.asset?.payloadJson || '{}');
    const { title, description, icon, url, isExternal, bizMgrNavigation } = parseData;

    return {
      id: offer.offerGuid!,
      title,
      description,
      icon,
      isExternal,
      url,
      bizMgrNavigation: bizMgrNavigation?.value
    };
  });

export const getOffers = async (): Promise<FormattedOffer[]> => {
  const dealerService = DealerOffersServingService(DEALER_SERVICE_URL, {
    useRedaxios: true,
  }).DealerOffersServing();

  const response = await dealerService({
    Authorization: getCurrentInstance(appDefIds.dashboard),
  }).listOffers({
    realEstateId: REAL_ESTATE_ID,
  });

  return formatOffers(response.offers || []);
};
