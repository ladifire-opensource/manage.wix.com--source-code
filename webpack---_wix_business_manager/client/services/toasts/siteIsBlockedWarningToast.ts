import { showToast, ToastPriority, ToastScope, ToastTimeout, ToastType } from '@wix/business-manager-api';
import { getIsBlockedSite, getMetaSiteId } from '../../selectors/siteMetaDataSelectors';
import { DataCapsule, LocalStorageStrategy } from 'data-capsule';

export const CONTACT_US_URL = 'https://www.wix.com/contact?nodeId=OUWEMf1hGw5UwU7WDGT5&referral=legalcontentinfrigement';
const DAY_IN_SECONDS = 60 * 60 * 24;

export async function showWarningToastIfSiteIsBlocked(t, state) {
  if (getIsBlockedSite(state)) {
     await performShowSiteIsBlockedWarningToast(t, getMetaSiteId(state));
  }
}

const performShowSiteIsBlockedWarningToast  = async (t, siteId) => {
  const dataCapsule = new DataCapsule({
    strategy: new LocalStorageStrategy(),
    namespace: 'wix-business-manager'
  });
  const lastClosedStorageItemKey = `business-manager.site-is-blocked.last-closed-${siteId}`;
  const itemInLocalStorage = await dataCapsule.getItem(lastClosedStorageItemKey).catch(() => null);

  const notificationRecentlyClosed = !!itemInLocalStorage;

  const setTimestampToLocalStorage = () => {
    dataCapsule.setItem(lastClosedStorageItemKey, 'true', { expiration: DAY_IN_SECONDS });
  };

  if (!notificationRecentlyClosed) {
    showToast({
        message: t('site-is-blocked-warning-toast.text'),
        biName: 'business-manager.site-is-blocked-warning',
        type: ToastType.WARNING,
        scope: ToastScope.DASHBOARD,
        timeout: ToastTimeout.NONE,
        priority: ToastPriority.HIGH,
        action: {
          text: t('site-is-blocked-warning-toast.cta'),
          removeToastOnClick: false,
          navigationTarget: {
            url: CONTACT_US_URL
          }
        },
       onCloseClick: setTimestampToLocalStorage
      });
  }
};
