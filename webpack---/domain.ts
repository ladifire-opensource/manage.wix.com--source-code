import { BrowserNotificationsConfig } from './types';

export const isCurrentDomainSupported = (config: BrowserNotificationsConfig): boolean =>
  config.allowedUrlPrefixes.some(prefix => config.locationHref.startsWith(prefix));
