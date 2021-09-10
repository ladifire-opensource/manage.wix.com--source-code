import { BrowserNotificationsWrapper } from './browser-notifications-wrapper';
import { BrowserNotificationsAPI, BrowserNotificationsConfig, BrowserNotificationsImplementationAPI, MODULE_REGISTRY_NAMESPACE } from './types';

export const registerBrowserNotificationsMethods = (config: BrowserNotificationsConfig) => {
  const browserNotificationsWrapper = new BrowserNotificationsWrapper(config);

  const wrapperMethodsToRegister: Exclude<keyof BrowserNotificationsAPI, keyof BrowserNotificationsImplementationAPI>[] = [
    'isBrowserNotificationsSupported',
    'getBrowserNotificationsPermission',
    'registerForBrowserPermissionChange',
    'registerForBrowserPermissionRequest',
    'registerForBrowserPermissionResponse',
  ];

  wrapperMethodsToRegister.forEach(methodName =>
    window['ModuleRegistry'].registerMethod(`${MODULE_REGISTRY_NAMESPACE}.${methodName}`, () =>
      browserNotificationsWrapper[methodName].bind(browserNotificationsWrapper)));

  const browserNotificationMethodsToRegister: (keyof BrowserNotificationsImplementationAPI)[] = [
    'isRegisteredForBrowserNotifications',
    'isRegisteredForBrowserNotificationsOnSite',
    'registerForBrowserNotifications',
    'registerAndTurnOnSite',
    'unregisterFromBrowserNotifications',
    'tentativelyMigrateFromOneSignal'
  ];

  browserNotificationMethodsToRegister.forEach(methodName =>
    window['ModuleRegistry'].registerMethod(`${MODULE_REGISTRY_NAMESPACE}.${methodName}`, () =>
      async (optionalMsid?: string) => {
        const implementation = await browserNotificationsWrapper.getImplementation();
        return methodName === 'registerForBrowserNotifications'
          ? implementation[methodName]()
          : implementation[methodName](optionalMsid);
      }));
};
