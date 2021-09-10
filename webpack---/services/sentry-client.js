import * as Sentry from '@sentry/browser';

export const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://17530440a9e74db38e8fd90582b445b3@sentry.wixpress.com/189',
});
