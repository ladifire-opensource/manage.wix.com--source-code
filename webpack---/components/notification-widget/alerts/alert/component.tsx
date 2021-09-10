import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { TextButton, Text, Button } from 'wix-style-react';
import X from 'wix-ui-icons-common/X';
import { Notification } from '@wix/notifications-widget-common/types/notifications';
import style from '../style.scss';
import { SVGAsset } from '../../../svg/component';
import { ReactComponent as InfoAlertIcon } from '../../../../assets/images/info-alert-icon.svg';
import { ReactComponent as WarningAlertIcon } from '../../../../assets/images/warning-alert-icon.svg';
import { invokeAndStopPropagation } from '../../../../utils/stop-propagation';

export interface AlertProps {
  notification: Notification;
  onSelect: () => void;
  onClose: () => void;
  floating?: boolean;
  showArrowOnTop?: boolean;
}

@observer
export class Alert extends React.Component<AlertProps> {
  onCloseClicked = invokeAndStopPropagation(this.props.onClose);

  renderContent() {
    const { notification, floating } = this.props;
    let AlertIcon = null;
    switch (notification.notificationType) {
      case 'ALERT_INFO' :
        AlertIcon = InfoAlertIcon;
        break;
      case 'ALERT_WARNING' :
        AlertIcon = WarningAlertIcon;
        break;
      default:
        break;
    }
    return <div className={style.content}>
      <span className={style.header}>
        <span className={style.imageContainer}>
          {AlertIcon ?
            <AlertIcon data-hook="notification-image" className={style.imageContent} /> :
            <SVGAsset dataHook="notification-image" className={style.imageContent} src={notification.image}/>
          }
        </span>
        <Text weight="normal" light size="small">{notification.title}</Text>
      </span>
      <span data-hook="alert-close-button" className={style.x} onClick={this.onCloseClicked}>
        <X size="18px" style={{ color: 'white' }}/>
      </span>
      <span>
        <Text dataHook="notification-message" light size="small">
          {notification.message}
          {!floating && <TextButton as="span" skin="light" size="small" underline="always" dataHook="notification-cta-text">{notification.actionText}</TextButton>}
        </Text>
        {floating && <div className={style.buttonWrapper}>
          <Button as="div" priority="secondary" size="small" skin="light">{notification.actionText}</Button>
        </div>}
      </span>
    </div>;
  }

  render() {
    const { notification, onSelect, floating, showArrowOnTop } = this.props;
    return (
      <div
        className={style.notification}
        data-hook="alert-item"
        data-notification-id={notification.id}
        onClick={() => onSelect()}
      >
        {floating && <div className={classNames(style.arrow, { [style.transparent]: !showArrowOnTop })}/>}
        {this.renderContent()}
      </div>
    );
  }
}
