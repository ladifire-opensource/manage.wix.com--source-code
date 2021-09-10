import React, { useState } from 'react';
import { TFunction } from 'i18next';
import classNames from 'classnames';
import { Box, DropdownBase, TextButton, Tooltip, Text, TextWeight } from 'wix-style-react';
import More from 'wix-ui-icons-common/More';
import { Notification } from '@wix/notifications-widget-common/types/notifications';
import { SVGAsset } from '../../svg/component';
import { formatNotificationDate } from '../../../utils/format-notification-date';
import { invokeAndStopPropagation } from '../../../utils/stop-propagation';
import { MetaSiteNameSelector } from '../../../utils/meta-site-name';
import { MoreOptionsAction } from './component';
import style from './style.scss';

interface NotificationItemProps {
  notification: Notification;
  shouldHighlightNotification: boolean;
  moreOptionsActions: MoreOptionsAction[];
  selectNotification(notification: Notification);
  t: TFunction;
  locale: string;
  renderSiteName: MetaSiteNameSelector;
}

const highlightedFontWeights: { [text in 'message' | 'cta' | 'date']?: TextWeight } = {
  message: 'bold',
  cta: 'normal',
  date: 'normal',
};

export function NotificationItem({ notification, shouldHighlightNotification, moreOptionsActions, selectNotification, t, locale, renderSiteName }: NotificationItemProps) {
  const [moreOptionsIsOpen, setMoreOptionsIsOpen] = useState(false);

  const weights = shouldHighlightNotification ? highlightedFontWeights : {};

  const MoreOptionsButton = () => <TextButton
    skin="dark"
    onClick={invokeAndStopPropagation(() => setMoreOptionsIsOpen(!moreOptionsIsOpen))}
    dataHook={'more-options-dropdown-opener'}
  >
    <More/>
  </TextButton>;

  return (
    <span
      key={notification.id}
      className={classNames(style.notificationItem, { [style.highlight]: shouldHighlightNotification })}
      data-hook="notification-item"
      data-notification-id={notification.id}
      data-is-highlighted={shouldHighlightNotification}
      onClick={() => selectNotification(notification)}
    >
      <span className={style.imageArea}>
        <div className={style.imageContainer}>
          <SVGAsset dataHook="notification-image" className={style.imageContent} fillColor="#3899ec"
                    src={notification.image}/>
        </div>
      </span>
      <span className={style.contentArea}>
        <Text secondary size="small" weight={weights.message} dataHook="notification-message" className={style.message}>{notification.message}</Text>
        <Text size="small" weight={weights.cta} dataHook="notification-cta-text" className={style.ctaText}>{notification.actionText}</Text>
        <footer className={style.footer}>
          {notification.metaSiteName &&
            <Text secondary light={!shouldHighlightNotification} ellipsis size="tiny" weight="normal" dataHook="notification-meta-site-name">{renderSiteName(notification)}</Text>}
          {notification.metaSiteName &&
            <Text size="tiny" weight={weights.date} className={style.separator}>|</Text>}
          <Text secondary light={!shouldHighlightNotification} size="tiny" weight={weights.date} dataHook="notification-date-created"
                className={style.date}>{formatNotificationDate(notification.dateCreated, locale)}</Text>
        </footer>
      </span>
      <Box verticalAlign="middle">
        <span className={classNames(style.moreOptionsWrapper, { [style.isMoreOptionsOpen]: moreOptionsIsOpen })}>
          <DropdownBase
            dataHook="more-options-dropdown"
            placement="bottom-end"
            appendTo="window"
            dynamicWidth
            open={moreOptionsIsOpen}
            onClickOutside={() => setMoreOptionsIsOpen(false)}
            options={moreOptionsActions.map(({ id, getLabel }) => ({ id, value: <div className="MoreOptionsItemClassForNotCloseWidget">{getLabel(notification, t)}</div> }))}
            onSelect={({ id }) => {
              moreOptionsActions.find(action => action.id === id)?.onClick(notification);
              setMoreOptionsIsOpen(false);
            }}
            selectedId={''}
            zIndex={10000}
          >
            {
              moreOptionsIsOpen ? <MoreOptionsButton/> :
                <Tooltip size="small" content={t('notifications.more_options')}>
                  <MoreOptionsButton/>
                </Tooltip>
            }
          </DropdownBase>
        </span>
      </Box>
    </span>
  );
}
