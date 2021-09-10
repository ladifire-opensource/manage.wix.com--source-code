import * as Sentry from '@sentry/browser';

export const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://7e61964747a0411d8f9eb9411e0f0513@sentry.wixpress.com/129',
});
