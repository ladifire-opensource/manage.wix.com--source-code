import { InjectedTranslateProps, translate } from 'react-i18next';
import { Subtract } from 'utility-types';
import React, { FC } from 'react';
import * as s from './NoPermissionsTab.scss';
import { Text } from 'wix-style-react';

interface NoPermissionsTabProps extends InjectedTranslateProps {}

const NoPermissionsTab: FC<NoPermissionsTabProps> = ({ t }) => {
  return (
    <div
      data-hook="no-permissions-tab-container"
      className={s.noPermissionsTabContent}
    >
      <div className={s.chatroomTitleContainer}>
        <Text
          size="small"
          secondary={true}
          weight="bold"
          dataHook="chatroom-list-title"
        >
          {t('chatroomlist.title')}
        </Text>
      </div>
      <div className={s.noPermissionsContainer}>
        <Text
          weight="bold"
          size="small"
          secondary={true}
          light={false}
          dataHook="no-permissions-title"
        >
          {t('no.permissions.tab.title')}
        </Text>
        <Text
          weight="thin"
          size="small"
          secondary={false}
          light={false}
          dataHook="no-permissions-text"
          className={s.noPermissionsText}
        >
          {t('no.permissions.tab.text')}
        </Text>
      </div>
    </div>
  );
};

export default translate()(NoPermissionsTab) as React.ComponentType<
  Subtract<NoPermissionsTabProps, InjectedTranslateProps>
>;
