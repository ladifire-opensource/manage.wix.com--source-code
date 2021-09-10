import React from 'react';
import classNames from 'classnames';
import { InjectedBiLoggerProps } from '../../../services/bi-logger/types';
import { InjectedTimerProps } from '../../../services/timer/types';
import { provideLogger } from '../../../services/bi-logger';
import { provideTimer } from '../../../services/timer/timer-provider';
import style from './style.scss';
import Notification from 'wix-ui-icons-common/Notification';
import { Text } from 'wix-style-react';

interface NotificationTriggerProps {
  badgeValue: number;
  shouldIndicateAlert: boolean;
  newNotificationArrived: boolean;
}

export class NotificationTriggerComponent extends React.PureComponent<NotificationTriggerProps & InjectedBiLoggerProps & InjectedTimerProps> {
  render() {
    const { badgeValue, biLogger, shouldIndicateAlert, timer, newNotificationArrived } = this.props;
    const shouldShowAlert = shouldIndicateAlert && !newNotificationArrived;
    const shouldShowBadge = !shouldShowAlert && (badgeValue > 0);
    const isOnLoad = timer.measureMilliseconds() < 5000;
    const isBadgeExtended = badgeValue >= 10;

    if (shouldShowBadge) {
      biLogger.reportBadgeShow(badgeValue, isOnLoad);
    }
    return (
      <span data-hook="notification-trigger-button" className={style.selectArea}>
        <span className={style.triggerIcon}><Notification /></span>
        { shouldShowAlert &&
          <div className={classNames(style.badge, style.alertsBadge)} data-hook="alerts-badge" >
            <svg className={style['alerts-icon']} viewBox="0 0 2 10" fill="currentColor" width="2" height="10">
              <path d="M1.727.273A.94.94 0 0 1 2 1v4a.94.94 0 0 1-1 1 .94.94 0 0 1-1-1V1a.94.94 0 0 1 1-1 .94.94 0 0 1 .727.273zm0 8A.94.94 0 0 1 2 9a.94.94 0 0 1-1 1 .94.94 0 0 1-1-1 .94.94 0 0 1 1-1 .94.94 0 0 1 .727.273z"/>
            </svg>
          </div> }
        <span key="badge"
              className={
                classNames(style.badge, {
                  [style.hidden]: !shouldShowBadge,
                  [style.extended]: isBadgeExtended,
                  [style.plus]: badgeValue >= 100,
                })}
              data-hook="notification-count-badge"
              data-is-hidden={!shouldShowBadge}
              data-is-extended={isBadgeExtended}>
          <Text weight="bold" className={style.badgeValue}>{(badgeValue > 99) ? '99+' : badgeValue}</Text>
        </span>
      </span>
    );
  }
}

export const NotificationTrigger: React.ComponentClass<NotificationTriggerProps> =
  provideLogger(
    provideTimer(
      NotificationTriggerComponent)) as any;
