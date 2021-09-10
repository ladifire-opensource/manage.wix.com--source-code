import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { InjectedBiLoggerProps } from '../../../services/bi-logger/types';
import { provideLogger } from '../../../services/bi-logger';
import style from './style.scss';
import { Text, Heading, TextButton, Box } from 'wix-style-react';

export interface NotificationsHeaderComponentProps {
  metaSiteId: string;
  unreadCount: number;
  showSettingsButton: boolean;
  hasNotifications: boolean;
  errorState: boolean;
  onMarkAllAsRead(): void;
  onClickSettings(): void;
}

export class NotificationsHeaderComponent extends React.PureComponent<NotificationsHeaderComponentProps & WithTranslation & InjectedBiLoggerProps> {
  markAllAsRead = () => {
    const { biLogger, onMarkAllAsRead, unreadCount } = this.props;
    biLogger.reportMarkAllAsRead(unreadCount);
    onMarkAllAsRead();
  }

  render() {
    const { showSettingsButton, onClickSettings, hasNotifications, errorState, t } = this.props;
    return (
      <div data-hook="notifications-header" className={style.notificationsHeader}>
        <Heading appearance="H3">{t('notifications.title')}</Heading>
        <Box marginTop="5px" verticalAlign="middle">
        {!errorState && hasNotifications &&
          <TextButton as="button" size="small" dataHook="notifications-mark-all-as-read" onClick={this.markAllAsRead}>{t('notifications.mark_all_as_read')}</TextButton>
        }
        {!errorState && showSettingsButton && [
          hasNotifications && <span key="divider" className={style.divider}/> ,
          <TextButton as="button" size="small" key="settings-link" dataHook="notifications-settings-button" onClick={onClickSettings}>{t('notifications.settings')}</TextButton>
        ]}
        </Box>
      </div>
    );
  }
}

export const NotificationsHeader = withTranslation()(provideLogger(NotificationsHeaderComponent));
