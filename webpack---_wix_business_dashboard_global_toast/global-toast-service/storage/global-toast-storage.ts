import { DataCapsule, WixStorageStrategy } from 'data-capsule';
import {
  IDismissedToast,
  IGlobalToastSiteData,
  IDismissedToasts,
} from '../types/storage';
import { IToastOffer } from '../types/global-toast';

const capsule = new DataCapsule({
  strategy: new WixStorageStrategy(),
  namespace: 'global-toast-site-data',
});

const fetchDismissedToasts = async (
  siteId: string,
): Promise<IGlobalToastSiteData> => {
  const siteData: IGlobalToastSiteData = await capsule
    .getItem(siteId)
    .catch((err) => null);

  if (!siteData || !siteData.dismissedToasts) {
    return { dismissedToasts: {} };
  }

  return siteData;
};

export const generateDismissedId = (offer: IToastOffer) => {
  return offer.payload.groupLabel || offer.id;
};

export const setDismissedToast = async (
  siteId: string,
  item: IDismissedToast,
) => {
  const siteData = await fetchDismissedToasts(siteId);
  siteData.dismissedToasts[item.id] = item;

  await capsule.setItem(siteId, siteData);
};

export const getDismissedToasts = async (
  siteId: string,
): Promise<IDismissedToasts> => {
  const siteData = await fetchDismissedToasts(siteId);

  return siteData.dismissedToasts;
};
