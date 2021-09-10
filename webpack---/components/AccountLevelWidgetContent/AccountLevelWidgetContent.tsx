import * as React from 'react';
import * as s from './AccountLevelWidgetContent.scss';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { createBiLogForMarkAllAsRead } from '../../services/biLogger/biLogger';
import { chatSdk } from '@wix/chat-sdk';
import HeaderChatList from '../HeaderChatList/HeaderChatList';
import {
  InjectedExperimentsProps,
  withExperiments,
} from '@wix/wix-experiments-react';

import { Heading, TextButton } from 'wix-style-react';

interface AccountLevelWidgetContentProps
  extends InjectedTranslateProps,
    InjectedExperimentsProps {}

class AccountLevelWidgetContentComponent extends React.Component<AccountLevelWidgetContentProps> {
  async componentDidMount() {
    const { experiments } = this.props;
    if (experiments.enabled('specs.chat.UnseenChatroomCount')) {
      await chatSdk.unseenChatroom.markChatroomsAsSeen({
        participantType: 'business',
      });
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className={s.widgetContent} data-hook="inbox-header-widget-content">
        <div data-hook="widget-headline" className={s.headline}>
          <Heading appearance="H3" dataHook="widget-title">
            {t('widget.title')}
          </Heading>
          <div className={s.links}>
            <TextButton
              dataHook="mark-all-as-read-link"
              size="small"
              onClick={async () => {
                await chatSdk.setAllRoomsAsRead({
                  isArchived: false,
                  participantType: 'business',
                });
                createBiLogForMarkAllAsRead('sites_list');
              }}
            >
              {t('widget.mark.all.as.read')}
            </TextButton>
          </div>
        </div>
        <div className={s.separator} />
        <div className={s.content}>
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

export default translate()(withExperiments(AccountLevelWidgetContentComponent));
