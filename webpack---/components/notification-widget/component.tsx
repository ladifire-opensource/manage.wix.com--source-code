import React from 'react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import * as mobx from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Duplexer } from '@wix/duplexer-js';
import Experiments, { ExperimentsBag } from '@wix/wix-experiments';
import { parseTopic } from '@wix/notifications-topic-parser';
import { Notification } from '@wix/notifications-widget-common/types/notifications';
import { i18nClient } from '../../i18n';
import { BiLogger, LoggerProvider } from '../../services/bi-logger';
import { TimerProvider } from '../../services/timer/timer-provider';
import * as pingApi from '../../apis/ping-api';
import { DUPLEXER_SERVER_URL, PING_APP_DEF_ID } from '../../consts/duplexer';
import { Dropdown } from '../dropdown/component';
import { NotificationTrigger } from './notification-trigger/component';
import { NotificationsTabbedView } from './notification-tabbed-view/component';
import { allSitesFeedId, FeedId, metaSiteFeedId } from '../../utils/feed-id';
import { createNavigationToFunction, NavigateToFunction } from '../../utils/navigate-to';
import { Fedops } from '../../services/fedops/fedops';
import { createRenderMetaSiteNameFunction, MetaSiteNameSelector } from '../../utils/meta-site-name';
import { NotificationsFeedsStore } from '../../stores/notifications-feed';
import style from './style.scss';
import { FloatingFeedComponent } from './alerts/floating-feed/component';
import { BiLoggerType } from '../../services/bi-logger/types';
import { Loader, FontUpgrade } from 'wix-style-react';
import { GetUserSettingsResponse } from '@wix/notifications-widget-common/types/api';

type VirtualSocket = ReturnType<Duplexer['connect']>;
type Channel = ReturnType<VirtualSocket['subscribe']>;
type DuplexerOptions = ConstructorParameters<typeof Duplexer>[1];

export interface NotificationsWidgetProps {
  locale: string;
  metaSiteId?: string;
  origin?: string;
  onOpen?(): void;
  experiments?: ExperimentsBag;
  biLogger?: BiLoggerType;
}

export interface NotificationsWidgetState {
  isReady: boolean;
  isDialogOpen: boolean;
}

@observer
export class NotificationsWidget extends React.Component<NotificationsWidgetProps, NotificationsWidgetState> {
  private dropdownRef: Dropdown;
  private notificationsFeedsStore: NotificationsFeedsStore;
  private readonly logger: BiLoggerType;
  private readonly fedops = new Fedops();
  private readonly feeds: FeedId[] = [];
  private readonly duplexerSocket: VirtualSocket;
  private readonly experiments: Experiments;
  private readonly navigateTo: NavigateToFunction;
  private renderSiteName: MetaSiteNameSelector;
  private floatingFeed: FloatingFeedComponent;
  private readonly isInboxWidgetMigrationOn: boolean;
  private componentIsUnmounted: boolean;

  readonly state: NotificationsWidgetState = {
    isReady: false,
    isDialogOpen: false
  };

  static defaultProps: Partial<NotificationsWidgetProps> = {
    onOpen: () => null
  };

  constructor(props) {
    super(props);

    const { locale, origin, metaSiteId, experiments, biLogger } = props;
    this.logger = biLogger || new BiLogger(origin, metaSiteId);
    i18nClient({ locale }).then(t =>
      this.renderSiteName = createRenderMetaSiteNameFunction()
        .withMainMetaSiteId(metaSiteId)
        .withThisSiteTranslation(t('notifications.this_site'))
        .build());

    this.experiments = new Experiments({ experiments });
    this.isInboxWidgetMigrationOn = this.experiments.enabled('specs.chat.ShowInboxHeaderWidget');
    this.navigateTo =  createNavigationToFunction()
      .withCurrentMetaSite(this.props.metaSiteId)
      .withReferrer('notification-dialog')
      .withExperiments(this.experiments)
      .build();

    const options: DuplexerOptions = { instanceUpdater: { getInstance: () => '' } };
    this.duplexerSocket = new Duplexer(DUPLEXER_SERVER_URL, options).connect({ appDefId: PING_APP_DEF_ID });

    if (metaSiteId) {
      this.feeds.push(metaSiteFeedId(metaSiteId));
    } else {
      this.feeds.push(allSitesFeedId());
    }

    this.loadData(metaSiteId);
  }

  componentDidMount() {
    this.fedops.appLoaded();
  }

  private closeDuplexer = () => this.duplexerSocket.disconnect();

  componentWillUnmount() {
    this.closeDuplexer();
    this.componentIsUnmounted = true;
  }

  private subscribeToDuplexer(): Channel {
    return this.duplexerSocket.subscribeToUserChannel();
  }

  subscribeToNotificationsPushChannel(): void {
    this.subscribeToDuplexer()
      .on('new-notification', this.onNewNotificationPushed)
      .on('new-alert', this.onNewAlertPushed)
      .on('alert-resolved', this.onAlertResolved)
      .on('@duplexer:subscription_failed', this.closeDuplexer);
  }

  setFloatingFeedRef = (floatingFeedRef) => {
    this.floatingFeed = floatingFeedRef;
  }

  onAlertResolved = ({ notificationId }) => {
    this.notificationsFeedsStore.markAlertAsResolved(notificationId);
  }

  onNewAlertPushed = () => {
    this.notificationsFeedsStore.fetchAlerts();
    this.floatingFeed?.showFeed(true);
  }

  onNewNotificationPushed = ({ topic }) => {
    try {
      const metaSiteId = parseTopic(topic).values.site;
      if (metaSiteId) {
        this.notificationsFeedsStore.fetchUpdatesForFeed(metaSiteFeedId(metaSiteId));
      }
      this.notificationsFeedsStore.fetchUpdatesForFeed(allSitesFeedId()).then(() => {
        this.notificationsFeedsStore.newNotificationArrived = true;
      });
    } catch (err) {
      // do nothing
    }
  }

  onClickFloatingAlert = (notification: Notification) => {
    this.notificationsFeedsStore.postponeAlert(notification);
    this.navigateTo(notification.actionLink, notification.metaSiteId);
  }

  onClickSettings = () => {
    this.goToSettingsPage();
    this.closeDropdown();
  }

  onDialogOpen = () => {
    if (this.floatingFeed)  {
      if (this.notificationsFeedsStore && !this.notificationsFeedsStore.isSupportUser) {
        this.floatingFeed.getDisplayedAlerts().forEach(alert => this.notificationsFeedsStore.postponeAlert(alert));
      }
      this.floatingFeed.showFeed(false);
    }
    this.setState({ isDialogOpen: true });
    this.fedops.started.widgetOpen();
    const { onOpen } = this.props;
    this.logger.reportFeedOpened();
    if (this.notificationsFeedsStore) {
      this.notificationsFeedsStore.newNotificationArrived = false;
    }
    onOpen();
  }

  onRefresh = () => this.loadData(this.props.metaSiteId);

  onDialogClose = () => {
    this.logger.reportFeedClosed();
    this.setState({ isDialogOpen: false });
  }

  goToSettingsPage() {
    const { metaSiteId } = this.props;
    const settingsPageDeepLink = {
      module: {
        pageComponentId: 'ping-settings-lazy-page-component-id',
        contextData: {}
      }
    };

    this.navigateTo(settingsPageDeepLink, metaSiteId);
  }

  private closeDropdown = () => this.dropdownRef?.close();

  private async loadData(metaSiteId: string) {
    this.notificationsFeedsStore?.clearErrorState();
    this.setState({ isReady: false });
    const { hasManySites, isSupportUser } = await pingApi.getUserSettings().catch(() => ({} as GetUserSettingsResponse));
    if (this.componentIsUnmounted) {
      return;
    }

    const allSitesFeedIsNotTheDefaultFeed = Boolean(metaSiteId);
    if (hasManySites && allSitesFeedIsNotTheDefaultFeed) {
      this.feeds.push(allSitesFeedId());
    }

    this.notificationsFeedsStore = new NotificationsFeedsStore(this.feeds, Boolean(isSupportUser), { inboxWidget: this.isInboxWidgetMigrationOn });

    this.subscribeToNotificationsPushChannel();
    await this.notificationsFeedsStore.init();

    this.setState({ isReady: true });
  }

  renderContent() {
    const { locale, metaSiteId } = this.props;
    const { isDialogOpen, isReady } = this.state;
    const isInBusinessManager = Boolean(metaSiteId);
    const thisSiteFeed = metaSiteId && this.notificationsFeedsStore && this.notificationsFeedsStore.feeds[metaSiteFeedId(metaSiteId)];
    const thisSiteHasNotifications = thisSiteFeed && thisSiteFeed.notifications && thisSiteFeed.notifications.length > 0;
    const hasAlerts = this.notificationsFeedsStore && this.notificationsFeedsStore.alertsFeed && this.notificationsFeedsStore.alertsFeed.length > 0;

    return (
      <span className={classNames({ [style.contentContainer]: true, [style.loading]: !isReady })}>
        {isReady ?
          <NotificationsTabbedView
            locale={locale}
            feeds={this.feeds}
            thisSiteMetaSiteId={metaSiteId}
            notificationsFeedStore={this.notificationsFeedsStore}
            fedops={this.fedops}
            defaultFeed={this.feeds[0]}
            navigateTo={this.navigateTo}
            renderSiteName={this.renderSiteName}
            visible={isDialogOpen}
            showSettingsButton={isInBusinessManager}
            showBrowserNotificationsBanner={thisSiteHasNotifications && !hasAlerts}
            onSelectNotification={this.closeDropdown}
            onClickSettings={this.onClickSettings}
            onRefresh={this.onRefresh}
          /> :
          <Loader/>
        }
      </span>
    );
  }

  render() {
    const badgeValue = this.notificationsFeedsStore ? this.notificationsFeedsStore.combinedUnseenCount : 0;
    const hasAlerts = this.notificationsFeedsStore && (this.notificationsFeedsStore.alertsFeed.length > 0);
    const newNotificationArrived = this.notificationsFeedsStore && this.notificationsFeedsStore.newNotificationArrived;
    const { isReady, isDialogOpen } = this.state;

    return <FontUpgrade dataHook="font-upgrade"><div>
      <I18nextProvider i18n={i18n}>
        <LoggerProvider logger={this.logger}>
          <TimerProvider>
            <Dropdown ref={ref => this.dropdownRef = ref}
                      onOpen={this.onDialogOpen}
                      onClose={this.onDialogClose}
                      positionOffset={{ x: 0, y: 0 }}
                      excludeClass="MoreOptionsItemClassForNotCloseWidget"
                      hideInsteadOfUnmounting
                      content={this.renderContent()}>
              <NotificationTrigger badgeValue={badgeValue} shouldIndicateAlert={hasAlerts} newNotificationArrived={newNotificationArrived}/>
            </Dropdown>
          </TimerProvider>
        </LoggerProvider>
      </I18nextProvider>
      {
        isReady &&
        <FloatingFeedComponent
          ref={this.setFloatingFeedRef}
          isDialogOpen={isDialogOpen}
          biLogger={this.logger}
          experiments={this.experiments}
          alerts={this.notificationsFeedsStore.nonPostponedAlerts}
          onSelectAlert={this.onClickFloatingAlert}
          onCloseAlert={notification => this.notificationsFeedsStore.postponeAlert(notification)}/>
      }
    </div></FontUpgrade>;
  }
}

mobx.configure({ isolateGlobalState: true });
