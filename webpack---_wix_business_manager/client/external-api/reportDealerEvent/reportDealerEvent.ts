import { axiosInstance } from '../../utils/axiosInstance';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import { TIPS_DEALER_PROJECT_GUID } from '../show-tip/getTipFromRemote';

export const DEALER_EVENT_REPORT_TYPE_VIEW = 'VIEW';
export const DEALER_EVENT_REPORT_TYPE_CLICK = 'MAIN_CTA_CLICK';
export const DEALER_OFFER_EVENTS_SERVICE_API = '/_api/dealer-offer-events-service/v1/dealer-offer-events/';

export const reportDealerEventView = async(offerId: string) => {
  const url = `${DEALER_OFFER_EVENTS_SERVICE_API}${offerId}`;
  const data = {
    event: {
      offerId,
      type: DEALER_EVENT_REPORT_TYPE_VIEW,
      realEstateId: TIPS_DEALER_PROJECT_GUID
    }
  };
  const headers = { Authorization: getCurrentInstance(appDefIds.metaSite) };
  await axiosInstance.post(url, data, { headers });
};

export const reportDealerEventMainCtaClicked = async(offerId: string, targetUrl: string) => {
  const url = `${DEALER_OFFER_EVENTS_SERVICE_API}${offerId}`;
  const data = {
    event: {
      offerId,
      type: DEALER_EVENT_REPORT_TYPE_CLICK,
      realEstateId: TIPS_DEALER_PROJECT_GUID,
      mainCtaClick: {
        targetUrl
      }
    }
  };
  const headers = { Authorization: getCurrentInstance(appDefIds.metaSite) };
  await axiosInstance.post(url, data, { headers });
};
