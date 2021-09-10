import * as React from 'react';
import { Popover, CounterBadge } from 'wix-style-react';
import * as s from './Widget.scss';
import { InjectedGlobalUnreadProps } from '@wix/chat-web/dist/src/components/withGlobalUnread/withGlobalUnread';
import classNames from 'classnames';
import SiteLevelWidgetContent from '../SiteLevelWidgetContent/SiteLevelWidgetContent';
import CloseWidgetProvider from '../CloseWidgetProvider/CloseWidgetProvider';
import { createBiLogForToggleWidget } from '../../services/biLogger/biLogger';
import { WidgetView } from '../WidgetLoader/WidgetLoader';
import AccountLevelWidgetContentComponent from '../AccountLevelWidgetContent/AccountLevelWidgetContent';
import { InjectedUnseenCountProps, withUnseenCount } from '@wix/chat-web';
import {
  InjectedExperimentsProps,
  withExperiments,
} from '@wix/wix-experiments-react';
import {
  VisitorsPresenceProvider,
  Avatars,
  withVisitorsPresenceCapability,
  InjectedVisitorsPresenceProps,
} from '@wix/inbox-site-visitors';
import {
  getInstance,
  getInstanceId,
  getMetasiteId,
} from '../../services/BusinessManagerService';
import {
  getContactInfo,
  getBatchContactInfo,
} from '../../services/serverApi/serverApi';
import Chat from 'wix-ui-icons-common/Chat';

interface WidgetProps
  extends InjectedExperimentsProps,
    InjectedVisitorsPresenceProps {
  view: WidgetView;
}

interface WidgetState {
  isOpen: boolean;
}

class Widget extends React.Component<WidgetProps, WidgetState> {
  constructor(props: WidgetProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.openWidget = this.openWidget.bind(this);
    this.closeWidget = this.closeWidget.bind(this);
  }

  openWidget() {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
      createBiLogForToggleWidget(true, this.props.view);
    }
  }

  closeWidget() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
      createBiLogForToggleWidget(false, this.props.view);
    }
  }

  render() {
    const { view, experiments } = this.props;
    const { isOpen } = this.state;

    const shouldShowVisitorsPresence =
      view === 'site_level' &&
      experiments.enabled('specs.chat.TopbarOnlineVisitors');

    const widgetPopoverComponent = (
      <Popover
        dataHook="inbox-widget-popover"
        placement="bottom"
        style={{ display: 'block' }}
        moveBy={{ y: 15 }}
        moveArrowTo={190}
        onClickOutside={this.closeWidget}
        showArrow
        shown={isOpen}
        onClick={isOpen ? this.closeWidget : this.openWidget}
        appendTo={'window'}
        fixed
        flip={false}
      >
        <Popover.Element>
          <WidgetIcon view={view} isWidgetOpen={isOpen} />
        </Popover.Element>
        <Popover.Content>
          <CloseWidgetProvider closeWidget={this.closeWidget}>
            {view === 'account_level' ? (
              <AccountLevelWidgetContentComponent />
            ) : (
              <SiteLevelWidgetContent />
            )}
          </CloseWidgetProvider>
        </Popover.Content>
      </Popover>
    );

    return shouldShowVisitorsPresence ? (
      <VisitorsPresenceProvider
        instance={getInstance()}
        instanceId={getInstanceId()}
        groupId={
          experiments.enabled('specs.chat.PresenceNewConvention')
            ? getMetasiteId()
            : undefined
        }
        getOrCreateContactInfo={getContactInfo}
        getBatchContactInfo={getBatchContactInfo}
      >
        {widgetPopoverComponent}
      </VisitorsPresenceProvider>
    ) : (
      widgetPopoverComponent
    );
  }
}

interface WidgetIconProps
  extends InjectedGlobalUnreadProps,
    InjectedUnseenCountProps,
    InjectedExperimentsProps,
    InjectedVisitorsPresenceProps {
  view: WidgetView;
  isWidgetOpen: boolean;
}

const WidgetIcon = withExperiments(
  withVisitorsPresenceCapability(
    withUnseenCount(
      (props: WidgetIconProps) => {
        const { view, experiments, isWidgetOpen } = props;
        const getBadgeElement = () => {
          const { unreadCount, unseenCount } = props;

          const count = experiments.enabled('specs.chat.UnseenChatroomCount')
            ? unseenCount
            : unreadCount;

          if (!count) {
            return null;
          }

          return (
            <div data-hook="new-message-badge" className={s.unreadBadge}>
              <CounterBadge
                dataHook="new-message-badge-count"
                className={s.unreadText}
                skin="danger"
              >
                {count}
              </CounterBadge>
            </div>
          );
        };

        const shouldShowVisitorsPresence =
          view === 'site_level' &&
          experiments.enabled('specs.chat.TopbarOnlineVisitors');

        const shouldShowVisitorsAvatars =
          shouldShowVisitorsPresence &&
          experiments.enabled('specs.chat.TopbarVisitorsAvatars');

        const badgeElement = getBadgeElement();

        return (
          <div className={s.iconContainer}>
            <div
              className={classNames(
                s.pointer,
                {
                  [s.avatarsContainer]:
                    shouldShowVisitorsAvatars && props.onlineVisitorsAmount > 0,
                },
                {
                  [s.avatarsContainerBackground]: isWidgetOpen,
                },
              )}
            >
              {shouldShowVisitorsAvatars && <Avatars limit={2} />}
              <div className={s.iconAndBadge}>
                <Chat data-hook="inbox-widget-icon" className={s.widgetIcon} />
                {badgeElement}
              </div>
            </div>
          </div>
        );
      },
      { participantType: 'business' },
    ),
  ),
);

export default withVisitorsPresenceCapability(withExperiments(Widget));
