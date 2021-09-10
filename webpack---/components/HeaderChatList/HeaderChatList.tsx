import React from 'react';
import ChatroomListEntry from './ChatroomListEntry';
import { withChatrooms } from '@wix/chat-web';
import AnimatedPlaceholderChatroomList from '@wix/chat-web/dist/src/components/AnimatedPlaceholder/AnimatedPlaceholderChatroomList'; //todo: change import
import { ChatRoom } from '@wix/chat-sdk';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { Subtract } from 'utility-types';
import ChatroomListEmptyState from './ChatroomListEmptyState/ChatroomListEmptyState';

export interface HeaderChatListProps extends InjectedTranslateProps {
  chatrooms: ChatRoom[];
  isFetchingChatrooms: boolean;
  isFirstLoading: boolean;
  showSiteName?: boolean;
}

class HeaderChatList extends React.Component<HeaderChatListProps> {
  render() {
    const { chatrooms, isFirstLoading, showSiteName } = this.props;
    return (
      <div>
        {isFirstLoading ? (
          <div data-hook="chatroom-list">
            <AnimatedPlaceholderChatroomList />
          </div>
        ) : chatrooms && chatrooms.length ? (
          <div data-hook="chatroom-list">
            {chatrooms.map((room) => (
              <ChatroomListEntry
                key={room.id}
                room={room}
                showSiteName={showSiteName}
              />
            ))}
          </div>
        ) : (
          <ChatroomListEmptyState />
        )}
      </div>
    );
  }
}

export default withChatrooms(
  translate()(HeaderChatList) as React.ComponentType<
    Subtract<HeaderChatListProps, InjectedTranslateProps>
  >,
);
