import { BrowserClient } from '@sentry/browser';

export const sentryClient = new BrowserClient({
  dsn: 'https://6a3dc03c51084338865d313da7bd9751@sentry.wixpress.com/1070',
  attachStacktrace: true,
});
