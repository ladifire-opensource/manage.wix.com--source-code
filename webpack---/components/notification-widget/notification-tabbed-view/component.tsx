import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Tabs } from 'wix-style-react';
import { observer } from 'mobx-react';
import { Notification } from '@wix/notifications-widget-common/types/notifications';
import { provideLogger } from '../../../services/bi-logger';
import { InjectedBiLoggerProps } from '../../../services/bi-logger/types';
import { NavigateToFunction } from '../../../utils/navigate-to';
import { FeedId, allSitesFeedId, getMetaSiteFromFeedId } from '../../../utils/feed-id';
import { InjectedFedopsProps } from '../../../services/fedops/types';
import { MetaSiteNameSelector } from '../../../utils/meta-site-name';
import { NotificationsFeedsStore } from '../../../stores/notifications-feed';
import { NotificationsFeed } from '../notification-feed/component';
import { NotificationsHeader } from '../notification-header/component';
import style from './style.scss';

export interface NotificationsTabbedViewProps {
  locale: string;
  feeds: FeedId[];
  thisSiteMetaSiteId: string;
  notificationsFeedStore: NotificationsFeedsStore;
  defaultFeed: FeedId;
  visible: boolean;
  showSettingsButton: boolean;
  showBrowserNotificationsBanner: boolean;
  navigateTo: NavigateToFunction;
  renderSiteName: MetaSiteNameSelector;
  onSelectNotification: () => void;
  onClickSettings: () => void;
  onRefresh: () => Promise<void>;
}

export interface NotificationsTabbedViewState {
  selectedFeed: FeedId;
}

@observer
export class NotificationsTabbedViewComponent extends React.Component<NotificationsTabbedViewProps & InjectedBiLoggerProps & WithTranslation & InjectedFedopsProps, NotificationsTabbedViewState> {
  readonly state: NotificationsTabbedViewState = {
    selectedFeed: this.props.defaultFeed
  };

  selectFeed(selectedFeed: FeedId) {
    this.setState({
      selectedFeed
    });
  }

  onClickingMarkFeedAsRead = async (feedId: FeedId) => {
    const { notificationsFeedStore, fedops } = this.props;
    fedops.started.markAllAsRead();
    await notificationsFeedStore.markFeedAsRead(feedId);
    fedops.ended.markAllAsRead();
  }

  onShowingFeed = async (feedId: FeedId) => {
    const { notificationsFeedStore } = this.props;
    notificationsFeedStore.markFeedAsSeen(feedId);
  }

  onClickingTab = (tab) => {
    const { biLogger } = this.props;
    this.selectFeed(tab.id);
    biLogger.reportClickedFeedTab(tab.id);
  }

  onSelectNotification = (notification: Notification) => {
    const { onSelectNotification, navigateTo } = this.props;
    navigateTo(notification.actionLink, notification.metaSiteId);
    onSelectNotification();
  }

  componentDidUpdate(oldProps: NotificationsTabbedViewProps, oldState: NotificationsTabbedViewState) {
    const { visible } = this.props;
    const { selectedFeed } = this.state;
    const userOpenedFeed = visible && !oldProps.visible;
    const userSwitchedActiveFeedTab = selectedFeed !== oldState.selectedFeed;

    if (userOpenedFeed) {
      this.props.fedops.ended.widgetOpen();
    }

    if (userOpenedFeed || userSwitchedActiveFeedTab) {
      this.onShowingFeed(selectedFeed);
    }
  }

  renderTabsIfNeeded() {
    const { feeds, notificationsFeedStore, t } = this.props;
    const errorState = notificationsFeedStore.isErrorState;
    if (feeds.length > 1) {
      const { selectedFeed } = this.state;
      return (
        <div className={style.tabsContainer}>
          {!errorState && <Tabs
            dataHook="notifications-widget-tabs"
            activeId={selectedFeed}
            onClick={this.onClickingTab}
            hasDivider={false}
            items={
              feeds.map(feedId => {
                const tabTitle = feedId === allSitesFeedId() ? t('notifications.all_sites') : t('notifications.this_site');
                const unseenCount = notificationsFeedStore.feeds[feedId].unseenCount;
                const unseenCountIndicationText = unseenCount > 0 ? ` (${unseenCount})` : '';
                return {
                  id: feedId,
                  dataHook: `${feedId}-tab`,
                  title: `${tabTitle}${unseenCountIndicationText}`
                };
              })
            }
          />
          }
        </div>
      );
    } else {
      return <div className={style.separator}/>;
    }
  }

  renderHeader() {
    const { showSettingsButton, onClickSettings, notificationsFeedStore } = this.props;
    const { selectedFeed } = this.state;
    const { notifications } = notificationsFeedStore.feeds[selectedFeed];
    const errorState = notificationsFeedStore.isErrorState;
    const metaSiteId = getMetaSiteFromFeedId(selectedFeed);
    const unreadCount = notifications.filter(notification => !notification.isRead).length;
    const markAllAsRead = () => this.onClickingMarkFeedAsRead(selectedFeed);
    return <NotificationsHeader
      metaSiteId={metaSiteId}
      unreadCount={unreadCount}
      hasNotifications={notifications.length > 0}
      showSettingsButton={showSettingsButton}
      errorState={errorState}
      onMarkAllAsRead={markAllAsRead}
      onClickSettings={onClickSettings}
    />;
  }

  renderFeed(feedId: FeedId) {
    const { locale, notificationsFeedStore, showBrowserNotificationsBanner, thisSiteMetaSiteId, onRefresh } = this.props;
    const { renderSiteName } = this.props;
    return <NotificationsFeed
      key={feedId}
      locale={locale}
      notificationsFeedsStore={notificationsFeedStore}
      showBrowserNotificationsBanner={showBrowserNotificationsBanner}
      thisSiteMetaSiteId={thisSiteMetaSiteId}
      feedId={feedId}
      renderSiteName={renderSiteName}
      onSelectNotification={this.onSelectNotification}
      onRefresh={onRefresh}
    />;
  }

  render() {
    const { visible } = this.props;
    const { selectedFeed } = this.state;
    if (visible) {
      return (
        <span data-hook="notifications-widget">
          {this.renderHeader()}
          {this.renderTabsIfNeeded()}
          {this.renderFeed(selectedFeed)}
        </span>
      );
    } else {
      return null;
    }
  }
}

export const NotificationsTabbedView: React.ComponentType<NotificationsTabbedViewProps & InjectedFedopsProps> =
  withTranslation()(
    provideLogger(
      NotificationsTabbedViewComponent));
