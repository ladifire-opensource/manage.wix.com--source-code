import * as Sentry from '@sentry/browser';

export const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://01b03816577a4f15bc440b9221f1f211@sentry.wixpress.com/212',
});
