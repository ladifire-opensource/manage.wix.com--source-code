import axios from 'axios';
import {
  DealerOffersServingService,
  ListOffersResponse,
} from '@wix/ambassador-dealer-offers-serving-service/http';
import { splitUrl } from './splitUrl';
import { DealerOfferDetails, OfferDealerParams } from './types';
import { originToRealEstateIdMap, DEALER_URL } from './constants';
import type { SupportChatOrigins } from '../types';

export const getFirstOffer = async (
  params: OfferDealerParams,
): Promise<DealerOfferDetails | undefined> => {
  const realEstateId = getRealEstateId(params);
  if (!realEstateId) {
    throw new Error('realEstateId is missing');
  }

  try {
    const dealer = getDealerOfferApi(params);
    const offerParams = getOfferParams(realEstateId, params);
    const listOffersResponse = await dealer({
      Authorization: params.authorizationToken,
    }).listOffers(offerParams);
    return getFirstOfferData(listOffersResponse);
  } catch (e) {
    throw new Error(`dealer.listOffers RPC failure: ${e.message}`);
  }
};

const getFirstOfferData = (
  listOffersResponse: ListOffersResponse,
): DealerOfferDetails | undefined => {
  const firstOffer = Array.isArray(listOffersResponse.offers)
    ? listOffersResponse.offers[0]
    : null;

  const payloadString = firstOffer?.asset?.payloadJson || '';

  if (!payloadString) {
    return undefined;
  }

  try {
    return {
      guid: firstOffer?.offerGuid,
      payload: JSON.parse(payloadString),
    };
  } catch (e) {
    throw new Error(`Failed to parse payload string: ${e.message}`);
  }
};

function getDealerOfferApi(params: OfferDealerParams) {
  const instance = axios.create({
    baseURL: params.dealerBaseUrl || DEALER_URL,
    withCredentials: !params.withoutCredentials,
  });
  return DealerOffersServingService(DEALER_URL, {
    axiosInstance: instance,
  }).DealerOffersServing();
}

function getOfferParams(realEstateId: string, params: OfferDealerParams) {
  const customParams = [
    {
      key: 'url',
      values: [window.location.href],
    },
    {
      key: 'urlChunks',
      values: splitUrl(window.location.href),
    },
  ];

  if (params.pageName) {
    customParams.push({
      key: 'page',
      values: [params.pageName],
    });
  }
  return {
    realEstateId,
    limit: 1,
    customParams,
  };
}

export function getRealEstateId(params: OfferDealerParams): string | null {
  if (params.testMode) {
    return originToRealEstateIdMap.test;
  }
  return originToRealEstateIdMap[params.origin as SupportChatOrigins];
}
