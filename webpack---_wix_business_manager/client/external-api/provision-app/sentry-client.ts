import * as Sentry from '@sentry/browser';

let sentryClient;

export const getSentryClient = () => {
  if (!sentryClient) {
    try {
      sentryClient = new Sentry.BrowserClient({
        dsn: 'https://221c371a627141ac981c81bbb6c1e08a@sentry.wixpress.com/193'
      });
    } catch (e) {
      //ignore
    }
  }
  return sentryClient;
};
