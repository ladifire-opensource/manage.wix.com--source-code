import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import * as s from './ChatroomListEmptyState.scss';
import { Text } from 'wix-style-react';

interface ChatroomListEmptyStateProps extends InjectedTranslateProps {}

const ChatroomListEmptyState = (props: ChatroomListEmptyStateProps) => {
  return (
    <div data-hook="chatroom-list-empty-state" className={s.emptyStateRoot}>
      <div className={s.titleWrapper}>
        <Text weight="bold" size="small" dataHook="empty-state-title">
          {props.t('chatroomlist.empty.state.title')}
        </Text>
      </div>
      <div className={s.bodyWrapper}>
        <Text size="small" dataHook="empty-state-body">
          {props.t('chatroomlist.empty.state.body')}
        </Text>
      </div>
    </div>
  );
};

export default translate()(ChatroomListEmptyState);
