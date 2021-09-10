import { allSitesFeedId, FeedId, getMetaSiteFromFeedId } from '../utils/feed-id';

export const BiEvents = {
  MARK_ALL_READ: 253,
  NOTIFICATION_BADGE_SHOWN: 254,
  CLICK_FEED_TAB: 256,
  NOTIFICATIONS_SHOWN: 271,
  NOTIFICATION_CLICKED: 272,
  ENABLE_BROWSER_NOTIFICATIONS: 273,
  ASK_FOR_BROWSER_NOTIFICATIONS_PERMISSION: 274,
  ALERT_CLOSED: 279,
  BANNER_DISPLAYED: 280,
  BANNER_CLOSED: 281,
  CLOSE_DIALOG_CLICK: 301,
  OPEN_DIALOG_CLICK : 303,
  GROUP_NOTIFICATION_DISPLAYED: 387,
};

export const BiSelectors = {
  getFeedName: (feedId: FeedId): string => {
    if (feedId === allSitesFeedId()) {
      return 'All Sites';
    } else if (getMetaSiteFromFeedId(feedId)) {
      return 'This Site';
    } else {
      return feedId;
    }
  },
  pageView: (origin: string) =>
    origin === 'my-sites' ? 'my-sites' : 'dashboard'
};
