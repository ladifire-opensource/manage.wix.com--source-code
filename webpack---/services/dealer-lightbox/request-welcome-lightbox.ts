import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';

export const BIZ_MANAGER_HOME_LB = 'BIZ_MANAGER_HOME_LB';

export const requestWelcomeLightbox = async (
  translationsUrl: string,
  accountLanguage: string,
  viewerUrl: string,
  metasiteGuid: string,
) => {
  const dealerLightboxApi = new window.wixDealerLightbox.DealerLightboxApi();
  dealerLightboxApi.initLightbox({
    translationsUrl,
    locale: accountLanguage,
    viewerUrl,
    location: BIZ_MANAGER_HOME_LB,
    metasiteGuid,
    signedInstance: getCurrentInstance(appDefIds.metaSite),
  });
};
