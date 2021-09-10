import React from 'react';
import { TFunction } from 'i18next';
import { withTranslation, WithTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Waypoint } from 'react-waypoint';
import { Notification } from '@wix/notifications-widget-common/types/notifications';
import { ReactComponent as BlueBellWithClouds } from '../../../assets/images/blue-bell-with-clouds.svg';
import { InjectedBiLoggerProps } from '../../../services/bi-logger/types';
import { provideLogger } from '../../../services/bi-logger';
import { BiSelectors } from '../../../consts/bi';
import { MetaSiteNameSelector } from '../../../utils/meta-site-name';
import { FeedId } from '../../../utils/feed-id';
import { findMatchingHeads } from '../../../utils/array-utils';
import { NotificationsFeedsStore } from '../../../stores/notifications-feed';
import { AlertsFeedComponent } from '../alerts/feed/component';
import { BrowserNotificationsBanner } from '../browser-notifications-banner/component';
import { ErrorState } from '../error-state/component';
import style from './style.scss';
import { NotificationItem } from './NotificationItem';
import { Text, Heading } from 'wix-style-react';

export interface NotificationsFeedComponentProps {
  feedId: FeedId;
  notificationsFeedsStore: NotificationsFeedsStore;
  thisSiteMetaSiteId: string;
  showBrowserNotificationsBanner: boolean;
  locale: string;
  renderSiteName?: MetaSiteNameSelector;
  onSelectNotification(notification: Notification): void;
  onRefresh: () => Promise<void>;
}

export interface MoreOptionsAction {
  id: string;
  getLabel(notification: Notification, t: TFunction): string;
  onClick(notification: Notification): void;
}

@observer
export class NotificationsFeedComponent extends React.Component<NotificationsFeedComponentProps & WithTranslation & InjectedBiLoggerProps> {
  private currentlyDisplayedNotificationIds: string[] = [];
  private currentlyDisplayedPage: number = 0;

  static defaultProps: Partial<NotificationsFeedComponentProps> = {
    renderSiteName: (notification) => notification.metaSiteName
  };

  reportNotificationsShownIfNeeded(notifications: Notification[], page: number, feedId: FeedId) {
    const notificationIds = notifications.map(n => n.id);
    const newNotificationsContainAllTheCurrentlyDisplayedOnes =
      findMatchingHeads(this.currentlyDisplayedNotificationIds, notificationIds).length === this.currentlyDisplayedNotificationIds.length;
    const thereAreNewNotifications = !newNotificationsContainAllTheCurrentlyDisplayedOnes || notificationIds.length !== this.currentlyDisplayedNotificationIds.length;

    if (page === this.currentlyDisplayedPage + 1 && newNotificationsContainAllTheCurrentlyDisplayedOnes) {
      const newNotificationIds = notificationIds.slice(this.currentlyDisplayedNotificationIds.length);
      this.reportPagedNotificationsShown(notifications, newNotificationIds, page, feedId);
    } else if (page !== this.currentlyDisplayedPage || thereAreNewNotifications) {
      this.reportPagedNotificationsShown(notifications, notificationIds, page, feedId);
    }
  }

  reportPagedNotificationsShown(notifications: Notification[], pageNotificationIds: string[], page: number, feedId: string) {
    const { biLogger } = this.props;
    biLogger.reportNotificationsShown(pageNotificationIds.join(','), page, feedId);
    notifications.filter(it => it.groupedNotificationIds && it.groupedNotificationIds.length && pageNotificationIds.includes(it.id)).forEach(notification => {
      biLogger.reportGroupedNotificationShown(notification.id, notification.groupedNotificationIds, page, feedId);
    });
  }

  reportAlertsShownIfNeeded() {
    const { biLogger, notificationsFeedsStore, feedId } = this.props;
    const { alertsFeed } = notificationsFeedsStore;
    if (alertsFeed.length > 0) {
      biLogger.reportAlertsShown(alertsFeed.map(it => it.id ).join(','), feedId);
    }
  }

  onReachedEndOfScroll = () => {
    const { feedId, notificationsFeedsStore } = this.props;
    notificationsFeedsStore.fetchNextPageForFeed(feedId);
  }

  markAsRead(notification: Notification) {
    const { biLogger, notificationsFeedsStore, feedId } = this.props;
    biLogger.reportNotificationRead(notification.metaSiteId, notification.id, feedId);
    notificationsFeedsStore.markNotificationAsRead(notification.id);
  }

  markAsUnread(notification: Notification) {
    const { biLogger, notificationsFeedsStore, feedId } = this.props;
    biLogger.reportNotificationUnread(notification.metaSiteId, notification.id, feedId);
    notificationsFeedsStore.markNotificationAsUnread(notification.id);
  }

  async selectNotification(notification: Notification) {
    const { biLogger, onSelectNotification, notificationsFeedsStore, feedId } = this.props;
    const isGrouped  = notification.groupedNotificationIds && notification.groupedNotificationIds.length;
    const groupedNotificationIds = isGrouped ? notification.groupedNotificationIds : null;
    biLogger.reportNotificationClicked(notification.metaSiteId, notification.id, feedId, groupedNotificationIds);
    notificationsFeedsStore.markNotificationAsRead(notification.id);
    onSelectNotification(notification);
  }

  dismissAlert(notification: Notification) {
    const { notificationsFeedsStore } = this.props;
    notificationsFeedsStore.dismissAlert(notification);
  }

  deleteNotification(notification: Notification) {
    const { biLogger, notificationsFeedsStore, feedId } = this.props;
    biLogger.reportNotificationDelete(notification.metaSiteId, notification.id, feedId);
    notificationsFeedsStore.deleteNotification(notification.id);
  }

  renderBrowserNotificationsBannerIfNeeded() {
    const { feedId, showBrowserNotificationsBanner, thisSiteMetaSiteId } = this.props;
    return showBrowserNotificationsBanner &&
      <BrowserNotificationsBanner metaSiteIdToActivate={thisSiteMetaSiteId} biFeedName={BiSelectors.getFeedName(feedId)}/>;
  }

  renderEmptyState() {
    const { t } = this.props;
    return (
      <div data-hook="notifications-empty-container" className={style.notificationsEmptyContainer}>
        <BlueBellWithClouds className={style.noNotificationsIcon}/>
        <Heading appearance="H3" className={style.noNotificationsTitle}>{t('notifications.get_notified_here')}</Heading>
        <Text secondary className={style.noNotificationsText}>{t('notifications.this_is_where_youll_see_notifications')}</Text>
      </div>
    );
  }

  renderFeed() {
    const { notificationsFeedsStore, feedId, biLogger, onSelectNotification,
      t, locale, renderSiteName} = this.props;
    const { notifications, page } = notificationsFeedsStore.feeds[feedId];
    const alerts = notificationsFeedsStore.alertsFeed.slice(0, 3);

    this.reportNotificationsShownIfNeeded(notifications, page, feedId);
    this.reportAlertsShownIfNeeded();

    this.currentlyDisplayedNotificationIds = notifications.map(n => n.id);
    this.currentlyDisplayedPage = page;

    return (
      <div className={style.notificationsList}>
        {this.renderBrowserNotificationsBannerIfNeeded()}
        <AlertsFeedComponent
          alerts={alerts}
          onSelect={notification => onSelectNotification(notification)}
          onClose={notification => this.dismissAlert(notification)}
          biLogger={biLogger}
          biFeedName={BiSelectors.getFeedName(feedId)}/>
        {notifications.map(notification =>
          <NotificationItem notification={notification}
                            shouldHighlightNotification={!notification.isRead}
                            key={notification.id}
                            moreOptionsActions={this.moreOptionsActions}
                            selectNotification={notification => this.selectNotification(notification)}
                            t={t}
                            locale={locale}
                            renderSiteName={renderSiteName} />)
        }
        <Waypoint onEnter={this.onReachedEndOfScroll}/>
      </div>
    );
  }

  moreOptionsActions: MoreOptionsAction[] = [{
    id: 'read-unread',
    getLabel: (notification, t) => notification.isRead ? t('notifications.mark_as_unread') : t('notifications.mark_as_read'),
    onClick: notification => notification.isRead ? this.markAsUnread(notification) : this.markAsRead(notification),
  }, {
    id: 'delete',
    getLabel: (_, t) => t('notifications.delete_notification'),
    onClick: notification => this.deleteNotification(notification),
  }];

  render() {
    const { notificationsFeedsStore, feedId, onRefresh } = this.props;
    const errorState = notificationsFeedsStore.isErrorState;
    const hasNotifications = notificationsFeedsStore.feeds[feedId].notifications.length > 0;
    const hasAlerts = notificationsFeedsStore.alertsFeed.length > 0;
    return (
      <section data-hook="notifications-feed" className={style.notificationsFeed}>
        <div className={style.notificationsContentArea}>
          {
            errorState ?
              <div data-hook="error-state" className={style.notificationsErrorState}>
                <ErrorState onRefresh={onRefresh}/>
              </div> :
            (hasNotifications || hasAlerts) ?
              this.renderFeed() :
              this.renderEmptyState()
          }
        </div>
      </section>
    );
  }
}

export const NotificationsFeed: React.ComponentClass<NotificationsFeedComponentProps> =
  withTranslation()(
    provideLogger(
      NotificationsFeedComponent)) as any;
