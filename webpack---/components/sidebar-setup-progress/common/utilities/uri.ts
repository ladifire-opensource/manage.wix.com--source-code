import URI from 'urijs';
import { EReferralInfo } from '../../api';
import { ReferralInfo } from '../../../../services/navigation/navigation.service';

const META_SITE_ID_PARAM = '<meta-site-id>';

export const injectMetasiteIdIfNeeded = (url: string, metaSiteId: string) => {
  return url.replace(META_SITE_ID_PARAM, metaSiteId);
};

export const injectReferrerToNavigateTo = (
  navigateToConfig: any,
  fromProgressBar = false,
) => {
  return {
    ...navigateToConfig,
    contextData: {
      ...navigateToConfig.contextData,
      referrer: fromProgressBar
        ? ReferralInfo.SETUP_PROGRESS_BAR
        : EReferralInfo.OMNI_SETUP,
    },
  };
};

export const injectReferrerToUrl = (url: string) => {
  return new URI(url)
    .addQuery('referralAdditionalInfo', EReferralInfo.OMNI_SETUP)
    .toString();
};

export const formatExternalUrl = (url: string, metaSiteId: string) =>
  injectReferrerToUrl(injectMetasiteIdIfNeeded(url, metaSiteId));

export const fromSidebarProgress = (): boolean =>
  new URI(window.location.href).search(true).referralInfo ===
  ReferralInfo.SETUP_PROGRESS_BAR;

export const isInDashboard = (metaSiteId: string): boolean =>
  !!window.location.href.match(new RegExp(`${metaSiteId}/home`));
