import * as Sentry from '@sentry/browser';

export const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://8964cd1c99714398870ae409312aa00c@sentry.wixpress.com/955',
});
