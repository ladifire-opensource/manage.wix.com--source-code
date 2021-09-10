import { BadgeType } from '@wix/business-manager-api';
import { Badges } from '../types/Badge';
import { ModuleRegistry } from 'react-module-container';
import {
  HIDE_CONNECT_PAYMENT_NOTIFICATION_METHOD_NAME,
  SHOW_CONNECT_PAYMENT_NOTIFICATION_METHOD_NAME
} from '@wix/business-manager-settings-api';

export const ACCEPT_PAYMENTS_ITEM_ID = 'accept-payments-item';

export class BadgeHandler {
  private badges: Badges = {};

  init() {
    this.registerConnectPaymentNotificationTriggered();
    this.registerConnectPaymentNotificationHidden();
  }

  public getBadges() {
    return this.badges;
  }

  private registerConnectPaymentNotificationTriggered = () => {
    ModuleRegistry.registerMethod(SHOW_CONNECT_PAYMENT_NOTIFICATION_METHOD_NAME, () => ({ tooltip }) => {
      this.badges[ACCEPT_PAYMENTS_ITEM_ID] = {
        itemId: ACCEPT_PAYMENTS_ITEM_ID,
        type: BadgeType.NOTIFICATION,
        tooltip
      };
    });
  }

  private registerConnectPaymentNotificationHidden = () => {
    ModuleRegistry.registerMethod(HIDE_CONNECT_PAYMENT_NOTIFICATION_METHOD_NAME, () => () => {
      this.badges[ACCEPT_PAYMENTS_ITEM_ID] = undefined;
    });
  }
}
