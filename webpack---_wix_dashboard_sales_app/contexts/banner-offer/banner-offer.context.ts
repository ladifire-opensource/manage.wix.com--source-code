import { createContext, useContext } from 'react';
import { BannerOffer, PromoteTemplateData, SaleTemplateData } from '@types';

export const BannerOfferContext = createContext({} as BannerOffer);

export const useBannerOffer = () => useContext(BannerOfferContext);

export const usePromoteBannerOfferData = () =>
  useContext(BannerOfferContext).data as PromoteTemplateData;
export const useSalesBannerOfferData = () =>
  useContext(BannerOfferContext).data as SaleTemplateData;
