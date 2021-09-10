import { IHttpClient } from '@wix/yoshi-flow-bm';
import {
  listOffers,
  Offer,
} from '@wix/ambassador-dealer-v1-serving-offer/http';
import { Video } from '@src/types';
import { REALESTATE_ID } from '@src/consts';

export const getVideoData = async (
  httpClient: IHttpClient,
  sentry: any,
): Promise<Video> => {
  let response: any;

  try {
    response = await httpClient.request(
      listOffers({
        realEstateId: REALESTATE_ID,
      }),
    );
  } catch (error) {
    sentry.captureException(`Failed to fetch dealer offers ${error}`);
  }

  return parseOffers(response?.data.offers[0] || {});
};

const parseOffers = (offer: Offer): Video => {
  const parseData = JSON.parse(offer.asset?.payloadJson || '{}');
  const {
    title,
    description,
    thumbnailUrl,
    actionTarget: {
      value: { youtubeIdbyLanguage },
    },
    videoLength,
  } = parseData;

  return {
    offerId: offer.offerGuid!,
    offerName: offer.offerName!,
    title,
    description,
    thumbnailUrl,
    languageToUrl: youtubeIdbyLanguage,
    videoLength,
  };
};
