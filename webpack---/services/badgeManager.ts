import {
  showBadge,
  hideBadge,
  BadgeType,
  CountBadgeSkin,
  onNavigationCompleted,
} from '@wix/business-manager-api';
import { getUnreadCount } from './inboxModuleApi';

const INBOX_URL_INDICATION = '/inbox';

export class BadgeManager {
  private isShown: Boolean;

  constructor() {
    this.isShown = false;
  }

  showBadge = async () => {
    if (this.isShown) {
      return;
    }

    this.isShown = true;
    const unreadCount = await getUnreadCount();
    if (!this.isShown) {
      return;
    }

    showBadge({
      itemId: 'inbox',
      type: BadgeType.COUNT,
      skin: CountBadgeSkin.SUCCESS,
      count: unreadCount.chatroomCount,
    });
  };

  hideBadge = () => {
    if (this.isShown) {
      hideBadge({
        itemId: 'inbox',
        type: BadgeType.COUNT,
      });
    }
    this.isShown = false;
  };

  showOrHide = () => {
    const isInInbox = window.location.pathname.includes(INBOX_URL_INDICATION);
    isInInbox ? this.hideBadge() : this.showBadge();
  };

  initialize = () => {
    //on load
    this.showOrHide();
    //backward navigations
    window.addEventListener('popstate', this.showOrHide);
    //forward navigations
    onNavigationCompleted(this.showOrHide);
  };
}

export const badgeManagerService = new BadgeManager();
