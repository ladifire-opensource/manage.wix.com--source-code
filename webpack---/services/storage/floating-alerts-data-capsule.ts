import { CapsuleItems, getDataCapsule, migrateData } from '../../utils/data-capsule';

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export class FloatingAlertsDataCapsule {
  private isPostponedAlertsReady = false;
  private postponedAlerts: {[alertId: string]: number} = {};

  async init() {
    await this.fetchPostponedItems();
    await this.updateStaleItems();
    this.isPostponedAlertsReady = true;
  }

  isReady() {
    return this.isPostponedAlertsReady;
  }

  private storePostponedItems() {
    return getDataCapsule().setItem(CapsuleItems.floatingAlertsPostponedItems, this.postponedAlerts);
  }

  private async fetchPostponedItems() {
    await migrateData(CapsuleItems.floatingAlertsPostponedItems);
    this.postponedAlerts = await getDataCapsule().getItem(CapsuleItems.floatingAlertsPostponedItems).catch(() => ({})) || {};
  }

  private updateStaleItems() {
    const now = new Date().getTime();
    Object.keys(this.postponedAlerts).forEach(alertId => {
      if (now > this.postponedAlerts[alertId] + TWENTY_FOUR_HOURS) {
        delete this.postponedAlerts[alertId];
      }
    });
    return this.storePostponedItems();
  }

  postponeAlert(alertId: string) {
    this.postponedAlerts[alertId] = new Date().getTime();
    this.storePostponedItems();
  }

  isAlertPostponed(alertId: string) {
    const lastPostponedDate = this.postponedAlerts[alertId];

    if (!lastPostponedDate) {
      return false;
    }

    let now = new Date().getTime();
    if (now > lastPostponedDate + TWENTY_FOUR_HOURS) {
      delete this.postponedAlerts[alertId];
      this.storePostponedItems();
      return false;
    }

    return true;
  }

  getPostponedAlertIds() {
    return Object.keys(this.postponedAlerts);
  }

  getPostponedAlerts() {
    return this.postponedAlerts;
  }
}
