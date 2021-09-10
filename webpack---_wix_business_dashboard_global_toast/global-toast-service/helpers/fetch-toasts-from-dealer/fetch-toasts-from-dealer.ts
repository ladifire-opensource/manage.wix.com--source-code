import { IToastOffer, IToastOfferPayload } from '../../types/global-toast';
import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';
import {
  DealerOffersServingService,
  ListOffersResponse,
} from '@wix/ambassador-dealer-offers-serving-service/http';
import {
  DEALER_API_URL,
  DEALER_GLOBAL_TOASTS_REAL_ESTATE,
} from '../../../consts';

const dealerService = DealerOffersServingService(DEALER_API_URL, {
  useRedaxios: true,
}).DealerOffersServing();

export interface IDealerOfferAsset {
  id: string;
  payloadJson: string;
}

export interface IDealerOffer {
  asset: IDealerOfferAsset;
  offerGuid: string;
  offerName: string;
  priority: number;
}

export interface IDealerResponse {
  data: {
    offers: IDealerOffer[];
  };
}

const mapDealerResponseToToastOffers = (
  response: ListOffersResponse,
): IToastOffer[] => {
  if (!response.offers?.length) {
    return [];
  }

  return response.offers.reduce((res: IToastOffer[], offer) => {
    const { offerGuid, offerName, asset } = offer;

    if (!offerGuid || !offerName || !asset?.payloadJson) {
      return res;
    }

    const payload: IToastOfferPayload = JSON.parse(asset.payloadJson);

    return res.concat({
      id: offerGuid,
      name: offerName,
      payload,
    });
  }, []);
};

export const fetchToastsFromDealer = async (): Promise<IToastOffer[]> => {
  try {
    const response = await dealerService({
      Authorization: getCurrentInstance(appDefIds.metaSite),
    }).listOffers({
      realEstateId: DEALER_GLOBAL_TOASTS_REAL_ESTATE,
    });

    return mapDealerResponseToToastOffers(response);
  } catch (err) {
    return [];
  }
};
