import { CapsuleItems, getDataCapsule, migrateData } from '../../utils/data-capsule';

export class BrowserNotificationsBannerDataCapsule {
  private dismissedSites: {[metaSiteId: string]: boolean};

  async init() {
    await migrateData(CapsuleItems.browserNotificationBannerDismissedSites);
    this.dismissedSites = await getDataCapsule().getItem(CapsuleItems.browserNotificationBannerDismissedSites).catch(() => ({})) || {};
  }

  dismissSiteBanner(metaSiteId: string): Promise<void> {
    this.dismissedSites[metaSiteId] = true;
    return getDataCapsule().setItem(CapsuleItems.browserNotificationBannerDismissedSites, this.dismissedSites);
  }

  isSiteBannerDismissed(metaSiteId: string): boolean {
    return Boolean(this.dismissedSites[metaSiteId]);
  }
}
