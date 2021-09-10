import { ActionTargetType, CTA } from '@wix/dashboard-setup-common';
import { ModuleRegistry } from 'react-module-container';

const META_SITE_ID_PARAM = '<meta-site-id>';

export const injectMetasiteIdIfNeeded = (url: string, metaSiteId: string) => {
  return url.replace(META_SITE_ID_PARAM, metaSiteId);
};

export enum ReferralInfo {
  DASHBOARD_SETUP = 'dashboard-setup',
  SETUP_PROGRESS_BAR = 'setup-progress-bar',
}

export const navigateToCTA = (
  item: CTA,
  metaSiteId: string,
  referralInfo: ReferralInfo,
): void => {
  switch (item.type) {
    case ActionTargetType.externalUrl: {
      const externalUrl: URL = new URL(item.value.value);
      externalUrl.searchParams.set('referralInfo', referralInfo);

      window.open(
        injectMetasiteIdIfNeeded(decodeURI(externalUrl.toString()), metaSiteId),
      );
      break;
    }
    case ActionTargetType.bizMgrNavigation: {
      const navigationData = {
        ...item.value.value,
        contextData: {
          ...item.value.value.contextData,
          referrer: referralInfo,
        },
      };

      ModuleRegistry.invoke('businessManager.navigateTo', navigationData);
      break;
    }
    default:
      throw new Error('Unexpected action type');
  }
};
