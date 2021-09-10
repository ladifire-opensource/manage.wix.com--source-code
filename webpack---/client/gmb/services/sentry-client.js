import * as Sentry from '@sentry/browser';

export const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://9a35dcb70bbe4cdc8d40270380c818b0@sentry.wixpress.com/36',
});
