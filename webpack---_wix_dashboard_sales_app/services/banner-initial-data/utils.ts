import { BannerOffer, BannerOfferType, PromoteTemplateData, SaleTemplateData } from '@types';
import { SITE_NAME_PLACEHOLDER, DOMAIN_NAME_PLACEHOLDER } from '@consts';
import { Messages } from '@wix/yoshi-flow-bm';
import { InitialDataResponse } from '@src/api';

export const isSiteNameNeeded = (bannerOffer: BannerOffer, translations: Messages): boolean =>
  isPlaceholderExist(bannerOffer, translations, SITE_NAME_PLACEHOLDER);

export const isDomainNameNeeded = (bannerOffer: BannerOffer, translations: Messages): boolean =>
  isPlaceholderExist(bannerOffer, translations, DOMAIN_NAME_PLACEHOLDER);

const isPlaceholderExist = (
  bannerOffer: BannerOffer,
  translations: Messages,
  placeholderName: string,
): boolean => {
  const translationIncludesPlaceholder = (placeholder: string, titleKey?: string) =>
    !!titleKey && translations[titleKey]?.includes(`{${placeholder}}`);

  if (bannerOffer.type === BannerOfferType.PROMOTE) {
    const { titleBefore, titleAfter } = bannerOffer.data as PromoteTemplateData;
    return (
      translationIncludesPlaceholder(placeholderName, titleBefore?.titleKey) ||
      translationIncludesPlaceholder(placeholderName, titleAfter?.titleKey)
    );
  }

  if (bannerOffer.type === BannerOfferType.SALE) {
    const { title, subtitleBefore, subtitleAfter } = bannerOffer.data as SaleTemplateData;
    return (
      translationIncludesPlaceholder(placeholderName, title?.titleKey) ||
      translationIncludesPlaceholder(placeholderName, subtitleBefore?.titleKey) ||
      translationIncludesPlaceholder(placeholderName, subtitleAfter?.titleKey)
    );
  }

  return false;
};

export const parseStringDates = (initialDataResponse: InitialDataResponse): InitialDataResponse => {
  if (!initialDataResponse.bannerOffer) {
    return initialDataResponse;
  }

  const { counter } = initialDataResponse.bannerOffer.data as SaleTemplateData;
  if (counter?.endDate) {
    counter!.endDate = new Date(counter!.endDate);
  }

  const { legalNote } = initialDataResponse.bannerOffer.data as SaleTemplateData;
  if (legalNote?.datetime) {
    legalNote!.datetime = new Date(legalNote!.datetime!);
  }

  return initialDataResponse;
};
