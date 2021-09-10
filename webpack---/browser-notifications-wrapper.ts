import { isCurrentDomainSupported } from './domain';
import { isFirebaseSupported } from './fcm/is-firebase-supported';
import { getBrowserNotificationsPermission, isSafari } from './safari/safari-utils';
import { BrowserNotificationsAPI, BrowserNotificationsConfig, BrowserNotificationsImplementationAPI, Handler, HandlersMap, PermissionChangeHandler, PermissionChangeHandlersMap } from './types';

export class BrowserNotificationsWrapper implements Omit<BrowserNotificationsAPI, keyof BrowserNotificationsImplementationAPI> {
  private readonly onPermissionRequestHandlers: HandlersMap = {};
  private readonly onPermissionResponseHandlers: HandlersMap = {};
  private readonly onPermissionChangeHandlers: PermissionChangeHandlersMap = {};
  private runningCounter = 0;
  private implementation: BrowserNotificationsImplementationAPI;

  constructor(protected readonly config: BrowserNotificationsConfig) {
  }

  isBrowserNotificationsSupported(): boolean {
    return isCurrentDomainSupported(this.config) && (isSafari() || isFirebaseSupported());
  }

  isServiceWorkerRequired(): boolean {
    return !isSafari();
  }

  getBrowserNotificationsPermission(): NotificationPermission {
    if (isSafari()) {
      return getBrowserNotificationsPermission();
    } else {
      return this.isBrowserNotificationsSupported() ? Notification.permission : 'denied';
    }
  }

  async getImplementation(): Promise<BrowserNotificationsImplementationAPI> {
    if (!this.implementation) {
      if (isSafari()) {
        const { SafariBrowserNotifications } = await import(/* webpackChunkName: "safari-browser-notifications" */ './safari/safari-browser-notifications');
        this.implementation = new SafariBrowserNotifications(this.config, this.onPermissionRequestHandlers, this.onPermissionResponseHandlers);
      } else {
        const { FcmBrowserNotifications } = await import(/* webpackChunkName: "fcm-browser-notifications" */ './fcm/fcm-browser-notifications');
        this.implementation = new FcmBrowserNotifications(this.config, this.onPermissionRequestHandlers, this.onPermissionResponseHandlers, this.onPermissionChangeHandlers);
      }
    }

    return this.implementation;
  }

  registerForBrowserPermissionChange(handler: PermissionChangeHandler): Handler {
    this.onPermissionChangeHandlers[++this.runningCounter] = handler;
    return () => delete this.onPermissionChangeHandlers[this.runningCounter];
  }

  registerForBrowserPermissionRequest(handler: Handler): Handler {
    this.onPermissionRequestHandlers[++this.runningCounter] = handler;
    return () => delete this.onPermissionRequestHandlers[this.runningCounter];
  }

  registerForBrowserPermissionResponse(handler: Handler): Handler {
    this.onPermissionResponseHandlers[++this.runningCounter] = handler;
    return () => delete this.onPermissionResponseHandlers[this.runningCounter];
  }
}
