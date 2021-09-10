import { DataCapsule, LocalStorageCachedCapsule, WixStorageStrategy } from 'data-capsule';

let _dataCapsule: DataCapsule;
export function getDataCapsule() {
  if (!_dataCapsule) {
    _dataCapsule = LocalStorageCachedCapsule({
      remoteStrategy: new WixStorageStrategy(),
      namespace: 'notifications-widget-component',
    });
  }

  return _dataCapsule;
}

export async function migrateData(item: CapsuleItems) {
  const oldValue = window.localStorage.getItem(item);
  if (oldValue) {
    await getDataCapsule().setItem(item, JSON.parse(oldValue));
    window.localStorage.removeItem(item);
  }
}

export enum CapsuleItems {
  browserNotificationBannerDismissedSites = 'browser-notification-banner-dismissed-sites',
  floatingAlertsPostponedItems = 'floating-alerts-postponed-items',
}
