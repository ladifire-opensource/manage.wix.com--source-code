import * as React from 'react';
import HeaderChatList from '../HeaderChatList/HeaderChatList';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { Subtract } from 'utility-types';
import * as s from './ThisSiteTab.scss';
import {
  getInstanceId,
  navigateToChatroom,
} from '../../services/BusinessManagerService';
import { chatSdk } from '@wix/chat-sdk';
import {
  InjectedExperimentsProps,
  withExperiments,
} from '@wix/wix-experiments-react';
import {
  VisitorList,
  withVisitorsPresenceCapability,
  InjectedVisitorsPresenceProps,
} from '@wix/inbox-site-visitors';
import { onlineVisitorsReferralInfo } from '../../services/biLogger/biConstants';
import { IVisitor } from '../../types';
import {
  InjectedCloseWidgetProps,
  withClosingWidgetCapability,
} from '../CloseWidgetProvider/CloseWidgetProvider';
import { createBiLogForToggleVisitorsList } from '../../services/biLogger/biLogger';
import { Text } from 'wix-style-react';

interface ThisSiteTabProps
  extends InjectedTranslateProps,
    InjectedExperimentsProps {}

class ThisSiteTab extends React.PureComponent<ThisSiteTabProps> {
  async componentDidMount() {
    const { experiments } = this.props;
    if (experiments.enabled('specs.chat.UnseenChatroomCount')) {
      await chatSdk.unseenChatroom.markChatroomsAsSeen({
        participantId: getInstanceId(),
      });
    }
  }

  render() {
    const { t, experiments } = this.props;
    const shouldShowVisitorsPresence = experiments.enabled(
      'specs.chat.TopbarOnlineVisitors',
    );
    return (
      <div className={s.thisSiteTabContent}>
        {shouldShowVisitorsPresence && <OnlineVisitorsSection />}
        <div className={s.titleContainer}>
          <Text
            size="small"
            secondary={true}
            weight="bold"
            dataHook="chatroom-list-title"
          >
            {t('chatroomlist.title')}
          </Text>
        </div>
        <div className={s.chatroomListContainer}>
          <HeaderChatList
            key="main"
            isArchived={false}
            participantIds={[getInstanceId()]}
            participantType="business"
            scrollable={false}
          />
        </div>
      </div>
    );
  }
}

const OnlineVisitorsSection = translate()(
  withExperiments(
    withClosingWidgetCapability(
      withVisitorsPresenceCapability<
        InjectedTranslateProps &
          InjectedVisitorsPresenceProps &
          InjectedCloseWidgetProps &
          InjectedExperimentsProps
      >((props) => {
        const {
          t,
          onlineVisitorsAmount: onlineVisitorsCount,
          closeWidget,
          experiments,
        } = props;
        const onVisitorClicked = (visitor: IVisitor) => {
          const {} = props;
          navigateToChatroom(
            visitor.presence.derivedChatroomId,
            onlineVisitorsReferralInfo,
          );
          closeWidget();
        };

        const isEmptyState = onlineVisitorsCount === 0;
        const avoidOnlineVisitorsEmptyState =
          isEmptyState &&
          !experiments.enabled('specs.chat.ShowTopbarOnlineVisitorsEmptyState');

        return avoidOnlineVisitorsEmptyState ? null : (
          <>
            <div className={s.titleContainer}>
              <Text
                size="small"
                secondary={true}
                weight="bold"
                dataHook="online-visitors-title"
              >
                {isEmptyState
                  ? t('online.visitors.empty.state.title')
                  : t('online.visitors.title', {
                      onlineVisitorsCount,
                    })}
              </Text>
            </div>
            {isEmptyState ? (
              <div className={s.visitorsEmptyStateBodyWrapper}>
                <Text
                  weight="normal"
                  size="small"
                  secondary
                  dataHook="online-visitors-empty-state-body"
                >
                  {t('online.visitors.empty.state.body')}
                </Text>
              </div>
            ) : (
              <VisitorList
                minimizedViewLimit={2}
                onVisitorClicked={onVisitorClicked}
                onViewChanged={({ currentView }) => {
                  createBiLogForToggleVisitorsList(
                    currentView === 'minimized' ? 'more' : 'less',
                    onlineVisitorsCount,
                  );
                }}
              />
            )}
          </>
        );
      }),
    ),
  ),
);

export default withExperiments(
  translate()(ThisSiteTab) as React.ComponentType<
    Subtract<ThisSiteTabProps, InjectedTranslateProps>
  >,
);
