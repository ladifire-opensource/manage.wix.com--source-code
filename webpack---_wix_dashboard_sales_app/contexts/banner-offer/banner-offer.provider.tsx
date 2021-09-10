import React, { useState, FunctionComponent } from 'react';
import { BannerOffer } from '@types';
import { BannerOfferContext } from './banner-offer.context';

interface BannerOfferProviderProps {
  bannerOffer: BannerOffer;
}

export const BannerOfferProvider: FunctionComponent<BannerOfferProviderProps> = ({
  bannerOffer,
  children,
}) => {
  const [data] = useState(bannerOffer);

  return <BannerOfferContext.Provider value={data}>{children}</BannerOfferContext.Provider>;
};
