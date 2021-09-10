import * as Sentry from '@sentry/browser';

export const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://1c4f457a9a4c41c681250303bcb160ac@sentry.wixpress.com/23',
});
