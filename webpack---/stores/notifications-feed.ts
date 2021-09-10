import { observable, action, computed, IObservableArray } from 'mobx';
import { Notification } from '@wix/notifications-widget-common/types/notifications';
import * as pingApi from '../apis/ping-api';
import { FeedId, allSitesFeedId, getMetaSiteFromFeedId } from '../utils/feed-id';
import { findMatchingSequenceInTailAndHead } from '../utils/array-utils';
import { FloatingAlertsDataCapsule } from '../services/storage/floating-alerts-data-capsule';

export interface NotificationsFeedStoreMigrations {
  inboxWidget: boolean;
}

export class NotificationsFeedsStore {
  @observable errorState: boolean = false;
  @observable feeds: FeedsMap = {};
  @observable alertsFeed: Notification[] = observable([]);
  @observable postponedAlertIds: string[] = observable([]);
  @observable newNotificationArrived: boolean = false;
  readonly isSupportUser: boolean;
  private readonly localPostponedAlertsStorage = new FloatingAlertsDataCapsule();
  private readonly migrations: NotificationsFeedStoreMigrations;

  constructor(feedIds: FeedId[], isSupportUser = false, migrations: NotificationsFeedStoreMigrations = { inboxWidget: false }) {
    feedIds.forEach(feedId => {
      this.feeds[feedId] = { notifications: [], unseenCount: 0, cursor: null, page: 0 };
    });
    this.isSupportUser = isSupportUser;
    this.migrations = migrations;
  }

  @computed
  get isErrorState() {
    return this.errorState;
  }

  @computed
  get feedIds() {
    return Object.keys(this.feeds);
  }

  @computed
  get nonPostponedAlerts() {
    if (!this.localPostponedAlertsStorage.isReady()) {
      return [];
    }

    const postponedAlertIds = this.postponedAlertIds;
    const alerts = this.alertsFeed;
    return alerts.filter(alert => !postponedAlertIds.includes(alert.id));
  }

  @computed
  get combinedUnseenCount() {
    const feedIds = this.feedIds;
    if (feedIds.includes(allSitesFeedId())) {
      return this.feeds[allSitesFeedId()].unseenCount;
    } else {
      return feedIds
        .reduce((unseenCount, nextFeedId) =>
          unseenCount + this.feeds[nextFeedId].unseenCount, 0);
    }
  }

  @action
  setErrorState() {
    this.errorState = true;
  }

  @action
  clearErrorState() {
    this.errorState = false;
  }

  @action
  init() {
    return Promise.all(
      [
        this.localPostponedAlertsStorage.init(),
        ...this.feedIds.map(feedId => this.fetchFirstPageForFeed(feedId)),
        this.fetchAlerts()]
    ).then(() => {
      this.postponedAlertIds = observable(this.localPostponedAlertsStorage.getPostponedAlertIds());
    }).catch((e) => {
      this.setErrorState();
    });
  }

  @action
  async fetchFirstPageForFeed(feedId: FeedId) {
    const migrations = this.migrations.inboxWidget ? 'inbox-widget' : null;

    if (feedId !== allSitesFeedId()) {
      const metaSiteId = getMetaSiteFromFeedId(feedId);
      const { notifications, unseenCount, cursor } = await pingApi.getNotificationsForMetaSite(metaSiteId, { migrations });
      this.feeds[feedId] = { notifications, unseenCount, cursor, page: 1 };
    } else {
      const { notifications, unseenCount, cursor } = await pingApi.getNotificationsForAllSites({ migrations });
      this.feeds[feedId] = { notifications, unseenCount, cursor, page: 1 };
    }
  }

  @action
  async fetchNextPageForFeed(feedId: FeedId) {
    const feed = this.feeds[feedId];
    const requestCursor = feed.cursor;
    const migrations = this.migrations.inboxWidget ? 'inbox-widget' : null;

    if (!requestCursor) {
      return;
    }

    const nextPage = feedId !== allSitesFeedId() ?
      await pingApi.getNotificationsForMetaSite(getMetaSiteFromFeedId(feedId), { cursor: requestCursor, migrations }) :
      await pingApi.getNotificationsForAllSites({ cursor: requestCursor, migrations });

    if (feed.cursor === requestCursor) {
      feed.page += 1;
      feed.cursor = nextPage.cursor;
      feed.notifications.push(...nextPage.notifications);
    }
  }

  @action
  async fetchUpdatesForFeed(feedId: FeedId) {
    if (!this.feedIds.includes(feedId)) {
      return;
    }

    const metaSiteId = getMetaSiteFromFeedId(feedId);
    const migrations = this.migrations.inboxWidget ? 'inbox-widget' : null;
    const updates = metaSiteId ?
      await pingApi.getNotificationsForMetaSite(metaSiteId, { migrations }) :
      await pingApi.getNotificationsForAllSites({ migrations });

    const notificationsHaveSameId = (a, b) => a.id === b.id;
    const overlappingNotifications = findMatchingSequenceInTailAndHead(updates.notifications, this.feeds[feedId].notifications, notificationsHaveSameId);

    if (overlappingNotifications.length > 0) {
      this.feeds[feedId].notifications = [...updates.notifications, ...this.feeds[feedId].notifications.slice(overlappingNotifications.length)];
      this.feeds[feedId].unseenCount = updates.unseenCount;
    } else {
      this.feeds[feedId].notifications = updates.notifications;
      this.feeds[feedId].unseenCount = updates.unseenCount;
      this.feeds[feedId].cursor = updates.cursor;
      this.feeds[feedId].page = 1;
    }
  }

  @action
  async fetchAlerts() {
    const response = await pingApi.getAlertsForAllSites();
    (this.alertsFeed as IObservableArray<Notification>).replace(response.notifications);
  }

  @action
  async markNotificationAsRead(notificationId: string) {
    this.feedIds
      .forEach(feedId =>
        this.feeds[feedId].notifications.forEach(notificationInFeed =>
          notificationInFeed.id === notificationId && (notificationInFeed.isRead = true)));

    if (!this.isSupportUser) {
      await pingApi.markNotificationAsRead(notificationId);
    }
  }

  @action
  async markNotificationAsUnread(notificationId: string) {
    this.feedIds
      .forEach(feedId =>
        this.feeds[feedId].notifications.forEach(notificationInFeed =>
          notificationInFeed.id === notificationId && (notificationInFeed.isRead = false)));

    if (!this.isSupportUser) {
      await pingApi.markNotificationAsUnread(notificationId);
    }
  }

  @action
  async markFeedAsSeen(feedId: FeedId) {
    const amountOfUnseenNotificationsInCurrentFeed = this.feeds[feedId].unseenCount;

    if (amountOfUnseenNotificationsInCurrentFeed > 0 && this.feeds[feedId].notifications.length > 0) {
      this.feeds[feedId].unseenCount = 0;

      if (getMetaSiteFromFeedId(feedId)) {
        if (allSitesFeedId() in this.feeds) {
          this.feeds[allSitesFeedId()].unseenCount -= amountOfUnseenNotificationsInCurrentFeed;
        }
        if (!this.isSupportUser) {
          await pingApi.markSiteNotificationsAsSeen(getMetaSiteFromFeedId(feedId), this.feeds[feedId].notifications[0].id);
        }
      } else {
        this.feedIds.forEach(feedId => this.feeds[feedId].unseenCount = 0);
        if (!this.isSupportUser) {
          await pingApi.markAllSitesNotificationsAsSeen(this.feeds[feedId].notifications[0].id);
        }
      }
    }
  }

  @action
  async markFeedAsRead(feedId: FeedId) {
    if (this.feeds[feedId].notifications.length === 0) {
      return;
    }

    const fromNotification = this.feeds[feedId].notifications[0];
    const unreadNotificationIds = this.feeds[feedId].notifications
      .filter(notification => !notification.isRead)
      .map(notification => notification.id);

    if (unreadNotificationIds.length > 0) {
      this.feedIds
        .forEach(feedId =>
          this.feeds[feedId].notifications.forEach(notification =>
            unreadNotificationIds.includes(notification.id) && (notification.isRead = true)));
    }

    if (!this.isSupportUser) {
      const metaSiteId = getMetaSiteFromFeedId(feedId);

      if (metaSiteId) {
        await pingApi.markAllSiteNotificationsAsRead(metaSiteId, fromNotification.id);
      } else {
        await pingApi.markAllNotificationsAsRead(fromNotification.id);
      }
    }
  }

  @action
  async dismissAlert(alert: Notification) {
    const index = this.alertsFeed.findIndex(notification => alert.id === notification.id);
    if (index >= 0) {
      this.alertsFeed.splice(index, 1);
      await pingApi.dismissAlert(alert.id);
    }
  }

  @action
  postponeAlert(alert: Notification) {
    this.localPostponedAlertsStorage.postponeAlert(alert.id);
    (this.postponedAlertIds as IObservableArray<string>).replace(this.localPostponedAlertsStorage.getPostponedAlertIds());
  }

  @action
  markAlertAsResolved(notificationId: string) {
    const index = this.alertsFeed.findIndex(notification => notification.id === notificationId);
    if (index >= 0) {
      this.alertsFeed.splice(index, 1);
    }
  }

  @action
  async deleteNotification(notificationId: string) {
    this.feedIds.forEach(feedId => {
      const index = this.feeds[feedId].notifications.findIndex(notification => notification.id === notificationId);
      if (index >= 0) {
        this.feeds[feedId].notifications.splice(index, 1);
      }
    });
    await pingApi.deleteNotification(notificationId);
  }
}

export interface FeedsMap {
  [feedId: string]: FeedState;
}

export interface FeedState {
  notifications: Notification[];
  unseenCount: number;
  cursor: string;
  page: number;
}
