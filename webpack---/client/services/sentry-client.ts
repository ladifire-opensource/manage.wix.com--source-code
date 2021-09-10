import * as Sentry from '@sentry/browser';

export const sentryClient: Sentry.BrowserClient = new Sentry.BrowserClient({
  dsn: 'https://252fda4c5e0447649cee374d809d2d52@sentry.wixpress.com/213',
});
