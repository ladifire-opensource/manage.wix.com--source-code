import * as React from 'react';
import HeaderChatList from '../HeaderChatList/HeaderChatList';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { Subtract } from 'utility-types';
import * as s from './AllSitesTab.scss';
import { chatSdk } from '@wix/chat-sdk';
import {
  InjectedExperimentsProps,
  withExperiments,
} from '@wix/wix-experiments-react';
import { Text } from 'wix-style-react';

interface AllSitesTabProps
  extends InjectedTranslateProps,
    InjectedExperimentsProps {}

class AllSitesTab extends React.PureComponent<AllSitesTabProps> {
  async componentDidMount() {
    const { experiments } = this.props;
    if (experiments.enabled('specs.chat.UnseenChatroomCount')) {
      await chatSdk.unseenChatroom.markChatroomsAsSeen({
        participantType: 'business',
      });
    }
  }

  render() {
    return (
      <div className={s.allSitesTabContent}>
        <div className={s.titleContainer}>
          <Text
            size="small"
            secondary={true}
            weight="bold"
            dataHook="chatroom-list-title"
          >
            {this.props.t('chatroomlist.title')}
          </Text>
        </div>
        <div className={s.chatroomListContainer}>
          <HeaderChatList
            key="main"
            isArchived={false}
            showSiteName={true}
            participantType="business"
          />
        </div>
      </div>
    );
  }
}

export default withExperiments(
  translate()(AllSitesTab) as React.ComponentType<
    Subtract<AllSitesTabProps, InjectedTranslateProps>
  >,
);
