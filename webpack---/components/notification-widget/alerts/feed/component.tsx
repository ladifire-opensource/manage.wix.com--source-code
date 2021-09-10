import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Notification } from '@wix/notifications-widget-common/types/notifications';
import { InjectedBiLoggerProps } from '../../../../services/bi-logger/types';
import { Alert } from '../alert/component';
import style from '../style.scss';

export interface AlertsFeedProps {
  alerts: Notification[];
  onClose: (notification: Notification) => void;
  onSelect: (notification: Notification) => void;
  isFloating?: boolean;
  biFeedName: string;
}

@observer
export class AlertsFeedComponent extends React.Component<AlertsFeedProps & InjectedBiLoggerProps> {
  lastReportedAlertIds: string[];

  onNotificationSelect = async ( notification: Notification ) => {
    const { biLogger, onSelect, biFeedName } = this.props;
    biLogger.reportAlertClicked(notification.metaSiteId, notification.id, biFeedName);
    onSelect(notification);
  }

  onNotificationClose = ( notification: Notification) => {
    const { biLogger, onClose, biFeedName } = this.props;
    biLogger.reportAlertClosed(notification.metaSiteId, notification.id, biFeedName);
    onClose(notification);
  }

  reportNotificationsShown() {
    const { biLogger, alerts, biFeedName } = this.props;
    const newAlerts = alerts.filter(it => !this.lastReportedAlertIds || !this.lastReportedAlertIds.includes(it.id));
    const newAlertIds = newAlerts.map(it => it.id);
    if (newAlertIds.length !== 0) {
      biLogger.reportAlertsShown(newAlertIds.join(','), biFeedName);
      this.lastReportedAlertIds = newAlertIds;
    }
  }

  componentDidMount() {
    this.reportNotificationsShown();
  }

  componentDidUpdate(): void {
    this.reportNotificationsShown();
  }

  render() {
    const { alerts, isFloating } = this.props;
    return (
      <div className={
        classNames({
          [style.alertsFeed] : true,
          [style.notEmpty]: alerts.length !== 0,
          [style.floatingFeed]: isFloating,
        })}
           data-hook={`alerts-feed${isFloating ? '-floating' : ''}`}>
        <TransitionGroup>
          {
            alerts.map((notification, index) =>
              <CSSTransition
                key={notification.id}
                timeout={300}
                classNames={{
                  enter: style.transitionEnter,
                  enterActive: style.transitionEnterActive,
                  appear: style.transitionEnter,
                  appearActive: style.transitionEnterActive,
                  exit: style.transitionExit,
                  exitActive: style.transitionExitActive,
                }}>
                <Alert
                    notification={notification}
                    floating={isFloating}
                    onClose={() => this.onNotificationClose(notification)}
                    onSelect={() => this.onNotificationSelect(notification)}
                    showArrowOnTop={index === 0}
                  />
              </CSSTransition>
            )
          }
        </TransitionGroup>
      </div>
    );
  }
}
