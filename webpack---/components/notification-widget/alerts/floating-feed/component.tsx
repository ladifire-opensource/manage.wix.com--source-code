import React from 'react';
import { Notification } from '@wix/notifications-widget-common/types/notifications';
import { AlertsFeedComponent } from '../feed/component';
import { InjectedBiLoggerProps } from '../../../../services/bi-logger/types';
import Experiments from '@wix/wix-experiments';

export interface FloatingFeedComponentProps {
  alerts: Notification[];
  onSelectAlert: (alert: Notification) => void;
  onCloseAlert: (alert: Notification) => void;
  isDialogOpen: boolean;
  experiments: Experiments;
}

export interface FloatingFeedComponentState {
  shouldShow: boolean;
}

export class FloatingFeedComponent extends React.Component<FloatingFeedComponentProps & InjectedBiLoggerProps, FloatingFeedComponentState> {
  readonly state: FloatingFeedComponentState = {
    shouldShow: true
  };

  private readonly isAutomation = document.cookie.split(/;\s*/).some(s => s.startsWith('automation='));
  private readonly isShowAlertsInTestsEnabled = this.props.experiments?.enabled('specs.ping.showAlertsInTests');

  getDisplayedAlerts(): Notification[] {
    const { alerts } = this.props;
    return alerts.slice(0, 3);
  }

  showFeed(shouldShow: boolean): void {
    this.setState({ shouldShow });
  }

  render() {
    const { onSelectAlert, biLogger, alerts, isDialogOpen, onCloseAlert } = this.props;
    const { shouldShow } = this.state;

    return shouldShow && !isDialogOpen && (!this.isAutomation || this.isShowAlertsInTestsEnabled) &&
      <AlertsFeedComponent
        biLogger={biLogger}
        onSelect={onSelectAlert}
        onClose={onCloseAlert}
        isFloating
        alerts={alerts.slice(0, 3)}
        biFeedName={'Float'}
      />;
  }
}
