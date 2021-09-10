import * as React from 'react';
import {
  isExternalNavigationTarget,
  isInternalNavigationTarget,
  NavigationTarget,
  ToastAction,
  ToastActionUiType,
  ToastTimeout,
  ToastType,
  TPageLinkBuilder,
  navigateTo
} from '@wix/business-manager-api';
import {
  Notification,
  NotificationTheme,
  NotificationType,
  ActionButtonProps,
  TextLinkActionButton,
  ButtonActionButtonProps,
  FontUpgrade
} from 'wix-style-react';
import { ToastEntry } from '../../types/toasts';
import { RemoveToastActionCreator } from '../../actions/toastActions';
import { flashingDataHook, globalDataHook } from './dataHooks';
import * as css from './Toast.scss';
import * as Sentry from '@sentry/browser';

export type ToastProps = {
  globalToast: ToastEntry;
  flashingToast: ToastEntry;
  removeToast: RemoveToastActionCreator;
  buildPageComponentLink: TPageLinkBuilder;
  reportToastViewed(toast: ToastEntry): void;
  reportToastCloseClicked(toast: ToastEntry): void;
  reportToastActionClicked(toast: ToastEntry): void;
};

type BuildNotificationParams = {
  className?: string;
  toast: ToastEntry;
  dataHook: string;
};

type ActionClickHandler = (event: React.SyntheticEvent<HTMLAnchorElement | HTMLButtonElement>) => void;

type BuildActionButtonParams = {
  action: ToastAction;
  handleClick: ActionClickHandler;
  linkUrl: string;
};

const enum WSR_NOTIFICATION_CLOSE_REASON {
  TIMER = 'hide-by-timer',
  CLICK = 'hide-by-close-click'
}

const themeMap: { [type: string]: NotificationTheme } = {
  [ToastType.STANDARD]: 'standard',
  [ToastType.PREMIUM]: 'premium',
  [ToastType.SUCCESS]: 'success',
  [ToastType.WARNING]: 'warning',
  [ToastType.ERROR]: 'error'
};

export const timeoutValueMap = {
  [ToastTimeout.NONE]: 0,
  [ToastTimeout.NORMAL]: 6000
};

const navigate = (navigationTarget: NavigationTarget) => {
  if (isInternalNavigationTarget(navigationTarget)) {
    navigateTo(navigationTarget.navigateToConfig);
  } else if (isExternalNavigationTarget(navigationTarget)) {
    if (navigationTarget.openInNewTab) {
      window.open(navigationTarget.url);
    } else {
      window.location.href = navigationTarget.url;
    }
  }
};

export const Toast = ({
                        globalToast,
                        flashingToast,
                        removeToast,
                        buildPageComponentLink,
                        reportToastViewed,
                        reportToastCloseClicked,
                        reportToastActionClicked
                      }: ToastProps) => {
  const buildLinkUrl = (action: ToastAction): string => {
    const { navigationTarget } = action;

    if (navigationTarget) {
      if (isExternalNavigationTarget(navigationTarget)) {
        return navigationTarget.url;
      }
      if (isInternalNavigationTarget(navigationTarget)) {
        const { navigateToConfig } = navigationTarget;
        return buildPageComponentLink(navigateToConfig.pageComponentId, navigateToConfig.contextData);
      }
    }

    return ' ';
  };

  const buildHandleClick = (toast: ToastEntry, hide: Function): ActionClickHandler => {
    const { action } = toast.config;
    const { removeToastOnClick, onClick, navigationTarget } = action;

    return (event: React.SyntheticEvent<HTMLAnchorElement>) => {
      // Untested
      if (event.defaultPrevented) {
        return;
      }
      event.preventDefault();

      reportToastActionClicked(toast);

      if (removeToastOnClick) {
        hide();
      }

      if (onClick) {
        onClick();
      }

      if (navigationTarget) {
        navigate(navigationTarget);
      }
    };
  };

  const buildLinkProps = ({ navigationTarget, handleClick, linkUrl }): TextLinkActionButton => {
    const shouldOpenInNewTab = navigationTarget && isExternalNavigationTarget(navigationTarget) && navigationTarget.openInNewTab;
    const targetProp = shouldOpenInNewTab ? { target: '_blank' } : null;
    return {
      type: 'textLink',
      onClick: handleClick,
      link: linkUrl,
      ...targetProp
    };
  };

  const buildButtonProps = ({ handleClick }): ButtonActionButtonProps => {
    return {
      type: 'button',
      onClick: handleClick
    };
  };

  const buildActionButton = ({ action, handleClick, linkUrl }: BuildActionButtonParams): React.ReactElement<typeof Notification.ActionButton> => {
    const { text, uiType, navigationTarget } = action;
    const props: ActionButtonProps = uiType === ToastActionUiType.BUTTON ?
      buildButtonProps({ handleClick }) :
      buildLinkProps({ navigationTarget, handleClick, linkUrl });

    return (
      <Notification.ActionButton
        {...props}
      >
        {text}
      </Notification.ActionButton>
    );
  };

  const buildNotification = ({ className = '', toast, dataHook }: BuildNotificationParams): React.ReactElement<'div'> => {
    const toastConfig = toast.config;
    const { action, onCloseClick, onToastSeen } = toastConfig;
    const timeout = timeoutValueMap[toastConfig.timeout];
    const hide = () => removeToast(toast.id);
    const handleClose = (hideType: string) => {
      if (hideType === WSR_NOTIFICATION_CLOSE_REASON.CLICK) {
        reportToastCloseClicked(toast);
        if (onCloseClick) {
          onCloseClick();
        }
      }
      hide();
    };
    const buildProps = () => {
      const type: NotificationType = timeout ? 'local' : 'global';
      return {
        autoHideTimeout: timeout,
        dataHook,
        show: true,
        onClose: handleClose,
        type,
        theme: themeMap[toastConfig.type]
      };
    };

    reportToastViewed(toast);
    if (onToastSeen) {
      try {
        onToastSeen();
      } catch (error) {
        Sentry.captureException(error);
      }
    }

    return (
      <div className={className}>
        <Notification{...buildProps()}>
          <Notification.TextLabel>{toastConfig.message}</Notification.TextLabel>
          {action && buildActionButton({
            action,
            handleClick: buildHandleClick(toast, hide),
            linkUrl: buildLinkUrl(action)
          })}
          <Notification.CloseButton/>
        </Notification>
      </div>
    );
  };

  return (
    <FontUpgrade>
      <div className={css.toastContainer}>
        {globalToast && buildNotification({
          toast: globalToast,
          dataHook: globalDataHook
        })}
        {flashingToast && buildNotification({
          className: css.flashingToast,
          toast: flashingToast,
          dataHook: flashingDataHook
        })}
      </div>
    </FontUpgrade>
  );
};
