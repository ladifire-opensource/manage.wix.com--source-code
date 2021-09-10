import React from 'react';
import style from './ChatroomListEntry.scss';
import classNames from 'classnames';
import _get from 'lodash/get';
import { ChatRoom, chatSdk } from '@wix/chat-sdk';
import { InjectedTranslateProps, translate } from 'react-i18next';
import {
  getInstanceId,
  navigateToChatroom,
  redirectToChatroomOnDifferentSite,
} from '../../services/BusinessManagerService';
import {
  InjectedCloseWidgetProps,
  withClosingWidgetCapability,
} from '../CloseWidgetProvider/CloseWidgetProvider';
import { Text, CounterBadge } from 'wix-style-react';
import {
  withExperiments,
  InjectedExperimentsProps,
} from '@wix/wix-experiments-react';
import { AvatarWrapper, getLocalizedFullName } from '@wix/chat-web';

interface ChatroomListEntryProps
  extends InjectedTranslateProps,
    InjectedCloseWidgetProps,
    InjectedExperimentsProps {
  room: ChatRoom;
  showSiteName?: boolean;
}

class ChatroomListEntry extends React.Component<ChatroomListEntryProps> {
  constructor(props: ChatroomListEntryProps) {
    super(props);
    this.onEntryClicked = this.onEntryClicked.bind(this);
  }

  onEntryClicked() {
    const { room, closeWidget } = this.props;
    const { participantId: instanceId, id: chatroomId } = room;

    const currentSiteClicked = () => {
      navigateToChatroom(chatroomId);
      closeWidget();
    };

    const otherSiteClicked = () => {
      redirectToChatroomOnDifferentSite(instanceId, chatroomId);
      closeWidget();
    };

    if (room.participantId === getInstanceId()) {
      currentSiteClicked();
    } else if (
      ['contactId', 'ascendBotId'].includes(room.clientReferenceType)
    ) {
      otherSiteClicked();
    }
  }

  render() {
    const { room, t } = this.props;
    const isMessageFromUser =
      _get(room, 'lastMessage.sender.userId') === chatSdk.getUserId();

    const badgeClassName = getChatroomBadgeClassName(room);
    const isUnread = room.count > 0;
    return (
      <div
        data-hook="chatroom-list-entry"
        className={classNames(style.root)}
        onClick={this.onEntryClicked}
      >
        <div className={style.thumbnail} data-hook="contact-avatar">
          <AvatarWrapper
            dataHook="chat-list-entry-avatar"
            size="size48"
            presence={room.online ? 'online' : undefined}
            name={getLocalizedFullName(room, t)}
            imgProps={{ src: room.thumbnail }}
            customIndication={
              badgeClassName ? <div className={badgeClassName} /> : undefined
            }
          />
        </div>

        <div data-hook="room-text-details" className={style.roomTextDetails}>
          <div className={style.nameRow}>
            <div className={style.nameWrapper}>
              <Text size="small" weight="bold" dataHook="name">
                {getLocalizedFullName(room, t)}
              </Text>
            </div>
            <Text
              weight="normal"
              size="tiny"
              secondary={true}
              light={true}
              dataHook="timestamp"
            >
              {room.timestamp}
            </Text>
          </div>

          <div className={style.textRow}>
            <div className={style.message}>
              {isMessageFromUser && (
                <div className={style.prefixWrapper}>
                  <Text
                    weight="normal"
                    size="small"
                    secondary={true}
                    light={true}
                    dataHook="prefix"
                  >
                    {`${t('last.message.summary.prefix')}`}
                  </Text>
                </div>
              )}
              <div className={style.textWrapper}>
                {isUnread ? (
                  <Text
                    weight="bold"
                    size="small"
                    secondary={false}
                    light={false}
                    dataHook="text"
                  >
                    {room.text}
                  </Text>
                ) : (
                  <Text
                    weight="normal"
                    size="small"
                    secondary={true}
                    light={true}
                    dataHook="text"
                  >
                    {room.text}
                  </Text>
                )}
              </div>
            </div>
            {room.count > 0 && (
              <span className={style.unreadMessagesPimple}>
                <CounterBadge skin="standard" dataHook="unread-messages-pimple">
                  {room.count <= 99 ? room.count : 99}
                </CounterBadge>
              </span>
            )}
          </div>
          {this.props.showSiteName && (
            <div className={style.siteNameWrapper}>
              <Text
                weight="normal"
                size="tiny"
                secondary={true}
                light={false}
                dataHook="site-name"
              >
                {room.participantId !== getInstanceId()
                  ? room.siteName
                  : t('chatroomlist.entry.current.site')}
              </Text>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const enum OFFLINE_CHANNELS {
  Facebook = 'Facebook',
  SMS = 'SMS',
  Whatsapp = 'Whatsapp',
}

const getChatroomBadgeClassName = (room: ChatRoom) => {
  const offlineChannelsToClassMap = {
    [OFFLINE_CHANNELS.SMS]: style.sms_wsr,
    [OFFLINE_CHANNELS.Facebook]: style.facebook_wsr,
    [OFFLINE_CHANNELS.Whatsapp]: style.whatsapp_wsr,
  };
  return offlineChannelsToClassMap[room.offlineChannel];
};

export default translate()(
  withClosingWidgetCapability(withExperiments(ChatroomListEntry)),
);
