import React from 'react';
import { observer } from 'mobx-react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Modal, Text, TextButton } from 'wix-style-react';
import XIcon from 'wix-ui-icons-common/X';
import { Animator } from 'wix-animations';
import { PingSettingsAPI } from '../../../apis/ping-settings';
import {
  getBrowserNotificationsPermission,
  isBrowserNotificationsSupported,
  isRegisteredForBrowserNotifications,
  registerAndTurnOnSite,
  registerForBrowserPermissionChange,
  registerForBrowserPermissionRequest,
  registerForBrowserPermissionResponse
} from '../../../apis/browser-notifications';
import { InjectedBiLoggerProps } from '../../../services/bi-logger/types';
import { BrowserNotificationsBannerDataCapsule } from '../../../services/storage/browser-notifications-banner-data-capsule';
import { provideLogger } from '../../../services/bi-logger';
import style from './style.scss';

export interface BrowserNotificationsBannerComponentProps {
  metaSiteIdToActivate: string;
  biFeedName: string;
}

interface BrowserNotificationsBannerComponentState {
  shouldBeDisplayed: boolean | null;
  showPermissionOverlay: boolean;
}

@observer
export class BrowserNotificationsBannerComponent extends React.Component<BrowserNotificationsBannerComponentProps & WithTranslation & InjectedBiLoggerProps, BrowserNotificationsBannerComponentState> {
  readonly state: BrowserNotificationsBannerComponentState = {
    shouldBeDisplayed: null,
    showPermissionOverlay: false,
  };
  private storage: BrowserNotificationsBannerDataCapsule;
  private componentIsUnmounted = false;

  constructor(props) {
    super(props);
    this.initDataCapsule();
    registerForBrowserPermissionChange(() => this.checkShouldBeDisplayed());
  }

  componentWillUnmount() {
    this.componentIsUnmounted = true;
  }

  private async initDataCapsule() {
    this.storage = new BrowserNotificationsBannerDataCapsule();
    await this.storage.init();
    this.checkShouldBeDisplayed();
  }

  reportPermissionDialog() {
    const { biLogger, biFeedName, metaSiteIdToActivate } = this.props;
    const permission: NotificationPermission = getBrowserNotificationsPermission();
    biLogger.reportAskForBrowserNotificationsPermission(metaSiteIdToActivate, biFeedName, permission);
  }

  turnOnSite = async () => {
    const { biLogger, biFeedName, metaSiteIdToActivate } = this.props;
    const unregisterRequestHandler = registerForBrowserPermissionRequest(() => {
      this.setState({ showPermissionOverlay: true });
    });
    const unregisterResponseHandler = registerForBrowserPermissionResponse(() => {
      this.setState({ showPermissionOverlay: false });
      this.reportPermissionDialog();
    });

    try {
      biLogger.reportEnableBrowserNotifications(metaSiteIdToActivate, biFeedName);
      await registerAndTurnOnSite(metaSiteIdToActivate);
    } catch (e) {
      const permission: NotificationPermission = getBrowserNotificationsPermission();
      if (permission === 'denied') {
        this.reportPermissionDialog();
      } else {
        throw e;
      }
    } finally {
      this.checkShouldBeDisplayed();
      this.setState({ showPermissionOverlay: false });
      unregisterRequestHandler();
      unregisterResponseHandler();
    }
  }

  onCloseClicked = () => {
    const { biLogger, biFeedName, metaSiteIdToActivate } = this.props;
    biLogger.reportBannerClosed(metaSiteIdToActivate, biFeedName);
    this.storage.dismissSiteBanner(this.props.metaSiteIdToActivate);
    this.checkShouldBeDisplayed();
  }

  async checkShouldBeDisplayed(): Promise<void> {
    const shouldBeDisplayed = await this.shouldBeDisplayed();
    if (!this.componentIsUnmounted) {
      this.setState((state, props) => {
        if (shouldBeDisplayed && !state.shouldBeDisplayed) {
          const { biLogger, metaSiteIdToActivate, biFeedName } = props;
          biLogger.reportBannerShown(metaSiteIdToActivate, biFeedName);
        }
        return { shouldBeDisplayed };
      });
    }
  }

  async shouldBeDisplayed(): Promise<boolean> {
    const { metaSiteIdToActivate } = this.props;

    if (this.storage.isSiteBannerDismissed(metaSiteIdToActivate)) {
      return false;
    }

    const isSupported = isBrowserNotificationsSupported();
    if (!isSupported) {
      return false;
    }

    const permission = getBrowserNotificationsPermission();
    switch (permission) {
      case 'denied': return false;
      case 'granted': {
        const metaSiteSettings = await new PingSettingsAPI().getSettings(`root.site=${metaSiteIdToActivate}`, 'BROWSER');
        if (!metaSiteSettings.subscribed) {
          return true;
        }

        const userHasMuted = metaSiteSettings.settingsData && metaSiteSettings.settingsData.mute;
        if (userHasMuted) {
          return false;
        }

        const isUserAlreadyRegistered = await isRegisteredForBrowserNotifications();
        return !isUserAlreadyRegistered;
      }
      default:
        return true;
    }
  }

  render() {
    const { t } = this.props;
    const { shouldBeDisplayed, showPermissionOverlay } = this.state;

    return (<Animator show={shouldBeDisplayed || false} opacity height={77} className={style.animator} timing="large">
          <div data-hook="browser-notifications-banner" className={style.banner}>
            <span>
              <Text size="small">{t('notifications.browser_notification_banner')}</Text>
              <TextButton underline="always" skin="dark" size="small" dataHook="browser-notifications-banner-action-link" className={style.action} onClick={this.turnOnSite}>
                {t('notifications.browser_notification_banner_action')}
              </TextButton>
            </span>
            <span data-hook="browser-notifications-banner-close-button" className={style.xIcon} onClick={this.onCloseClicked}>
              <XIcon size="16px"/>
            </span>
            <Modal dataHook="browser-notifications-banner-alert-modal" isOpen={showPermissionOverlay} zIndex={2100} contentLabel="desktop notifications alert" />
          </div>
          <div className={style.spacer}/>
        </Animator>);
  }
}

export const BrowserNotificationsBanner = withTranslation()(provideLogger(BrowserNotificationsBannerComponent));
