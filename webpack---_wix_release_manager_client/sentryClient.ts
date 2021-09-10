import Sentry from '@sentry/browser';

export const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://d24c2cfdd14f470d8704847cecda8152@sentry.wixpress.com/242',
});
