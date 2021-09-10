import 'es6-shim';
import biLogger from '@wix/web-bi-logger';
import { BiEvents, BiSelectors } from '../../consts/bi';
import { BiLoggerType } from './types';

class BiLogger implements BiLoggerType {
  private biLogger;
  readonly metaSiteId: string;
  readonly origin: string;

  constructor(origin?, metaSiteId?, logger = biLogger) {
    this.biLogger = logger
      .factory({ endpoint: 'dash' })
      .updateDefaults({ src: 5 })
      .logger();

    this.metaSiteId = metaSiteId;
    this.origin = origin;
  }

  logEvent(eventId: number, extraParameters: any = {}) {
    return this.biLogger.log({ evid: eventId, ...extraParameters });
  }

  reportFeedClosed() {
    return this.logEvent(BiEvents.CLOSE_DIALOG_CLICK, {
      msid: this.metaSiteId,
      view: 'notifications',
      page_view: BiSelectors.pageView(this.origin),
      origin: 'header'
    });
  }

  reportFeedOpened() {
    return this.logEvent(BiEvents.OPEN_DIALOG_CLICK, {
      msid: this.metaSiteId,
      view: 'notifications',
      page_view: BiSelectors.pageView(this.origin),
      origin: 'header'
    });
  }

  reportBadgeShow(badgeValue: number, isOnLoad: boolean) {
    return this.logEvent(BiEvents.NOTIFICATION_BADGE_SHOWN, {
      origin: this.origin,
      num_of_new: badgeValue,
      on_page_load: isOnLoad });
  }

  reportMarkAllAsRead(unreadCount: number) {
    return this.logEvent(BiEvents.MARK_ALL_READ, {
      num_of_unread: unreadCount,
      channel: 'Web',
      origin: this.origin });
  }

  reportNotificationClicked(notificationMetaSiteId: string, notificationId: string, feedName: string, groupedNotifications?: string[]) {
    return this.logEvent(BiEvents.NOTIFICATION_CLICKED, {
      channel: 'Web',
      click_type: 'click',
      feed_name: BiSelectors.getFeedName(feedName),
      is_high_priority: false,
      msid: notificationMetaSiteId,
      notificationid: notificationId,
      origin: this.origin,
      grouped_notifications: groupedNotifications && groupedNotifications.join(',')
    });
  }

  reportAlertClicked(notificationMetaSiteId: string, notificationId: string, feedName: string) {
    return this.logEvent(BiEvents.NOTIFICATION_CLICKED, {
      channel: 'Web',
      click_type: 'click',
      feed_name: BiSelectors.getFeedName(feedName),
      is_high_priority: true,
      msid: notificationMetaSiteId,
      notificationid: notificationId,
      origin: this.origin
    });
  }

  reportNotificationRead(notificationMetaSiteId: string, notificationId: string, feedName: string) {
    return this.logEvent(BiEvents.NOTIFICATION_CLICKED, {
      channel: 'Web',
      click_type: 'mark read',
      feed_name: BiSelectors.getFeedName(feedName),
      is_high_priority: false,
      msid: notificationMetaSiteId,
      notificationid: notificationId,
      origin: this.origin
    });
  }

  reportNotificationUnread(notificationMetaSiteId: string, notificationId: string, feedName: string) {
    return this.logEvent(BiEvents.NOTIFICATION_CLICKED, {
      channel: 'Web',
      click_type: 'mark unread',
      feed_name: BiSelectors.getFeedName(feedName),
      is_high_priority: false,
      msid: notificationMetaSiteId,
      notificationid: notificationId,
      origin: this.origin
    });
  }

  reportNotificationDelete(notificationMetaSiteId: string, notificationId: string, feedName: string) {
    return this.logEvent(BiEvents.NOTIFICATION_CLICKED, {
      channel: 'Web',
      click_type: 'delete',
      feed_name: BiSelectors.getFeedName(feedName),
      is_high_priority: false,
      msid: notificationMetaSiteId,
      notificationid: notificationId,
      origin: this.origin
    });
  }

  reportClickedFeedTab(feedName: string) {
    return this.logEvent(BiEvents.CLICK_FEED_TAB, {
      origin: this.origin,
      feed_name: BiSelectors.getFeedName(feedName)
    });
  }

  reportNotificationsShown(notifications: string, pageNumber: number, feedName: string) {
    return this.logEvent(BiEvents.NOTIFICATIONS_SHOWN, {
      channel: 'Web',
      feed_name: BiSelectors.getFeedName(feedName),
      is_high_priority: false,
      notification_ids: notifications,
      origin: this.origin,
      page_number: pageNumber});
  }

  reportGroupedNotificationShown(notificationId: string, groupedNotificationIds: string[], pageNumber: number, feedName: string) {
    return this.logEvent(BiEvents.GROUP_NOTIFICATION_DISPLAYED, {
      channel: 'Web',
      feed_name: BiSelectors.getFeedName(feedName),
      is_high_priority: false,
      notification_id_shown: notificationId,
      notification_ids: groupedNotificationIds.join(','),
      origin: this.origin,
      page_number: pageNumber});
  }

  reportAlertsShown(notifications: string, feedName: string) {
    return this.logEvent(BiEvents.NOTIFICATIONS_SHOWN, {
      channel: 'Web',
      feed_name: BiSelectors.getFeedName(feedName),
      is_high_priority: true,
      notification_ids: notifications,
      origin: this.origin,
      page_number: -1,
    });
  }

  reportAlertClosed(notificationMetaSiteId: string, notificationId: string, feedName: string) {
    return this.logEvent(BiEvents.ALERT_CLOSED, {
      channel: 'Web',
      feed_name: BiSelectors.getFeedName(feedName),
      msid: notificationMetaSiteId,
      notificationid: notificationId,
      origin: this.origin
    });
  }

  reportEnableBrowserNotifications(notificationMetaSiteId: string, feedName: string) {
    return this.logEvent(BiEvents.ENABLE_BROWSER_NOTIFICATIONS, {
      feed_name: BiSelectors.getFeedName(feedName),
      origin: notificationMetaSiteId
    });
  }

  reportAskForBrowserNotificationsPermission(notificationMetaSiteId: string, feedName: string, permission: NotificationPermission) {
    return this.logEvent(BiEvents.ASK_FOR_BROWSER_NOTIFICATIONS_PERMISSION, {
      feed_name: BiSelectors.getFeedName(feedName),
      origin: notificationMetaSiteId,
      permission_type: permission,
    });
  }

  reportBannerShown(notificationMetaSiteId: string, feedName: string) {
    return this.logEvent(BiEvents.BANNER_DISPLAYED, {
      feed_name: BiSelectors.getFeedName(feedName),
      origin: notificationMetaSiteId
    });
  }

  reportBannerClosed(notificationMetaSiteId: string, feedName: string) {
    return this.logEvent(BiEvents.BANNER_CLOSED, {
      feed_name: BiSelectors.getFeedName(feedName),
      origin: notificationMetaSiteId
    });
  }
}

export { BiLogger };
