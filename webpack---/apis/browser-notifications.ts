import { ModuleRegistry } from 'react-module-container';
import { BrowserNotificationsAPI, getModuleRegistryMethodName } from '@wix/browser-notifications-client/types';

export const isBrowserNotificationsSupported: BrowserNotificationsAPI['isBrowserNotificationsSupported'] =
  () => ModuleRegistry.invoke(getModuleRegistryMethodName('isBrowserNotificationsSupported'));

export const getBrowserNotificationsPermission: BrowserNotificationsAPI['getBrowserNotificationsPermission'] =
  () => ModuleRegistry.invoke(getModuleRegistryMethodName('getBrowserNotificationsPermission'));

export const isRegisteredForBrowserNotifications: BrowserNotificationsAPI['isRegisteredForBrowserNotifications'] =
  () => ModuleRegistry.invoke(getModuleRegistryMethodName('isRegisteredForBrowserNotifications'));

export const registerAndTurnOnSite: BrowserNotificationsAPI['registerAndTurnOnSite'] =
  metaSiteId => ModuleRegistry.invoke(getModuleRegistryMethodName('registerAndTurnOnSite'), metaSiteId);

export const registerForBrowserPermissionChange: BrowserNotificationsAPI['registerForBrowserPermissionChange'] =
  handler => ModuleRegistry.invoke(getModuleRegistryMethodName('registerForBrowserPermissionChange'), handler);

export const registerForBrowserPermissionRequest: BrowserNotificationsAPI['registerForBrowserPermissionRequest'] =
  handler => ModuleRegistry.invoke(getModuleRegistryMethodName('registerForBrowserPermissionRequest'), handler);

export const registerForBrowserPermissionResponse: BrowserNotificationsAPI['registerForBrowserPermissionResponse'] =
  handler => ModuleRegistry.invoke(getModuleRegistryMethodName('registerForBrowserPermissionResponse'), handler);
