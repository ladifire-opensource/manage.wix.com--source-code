import * as Sentry from '@sentry/browser';
import { isProduction, getAppVersion } from './app-utils';
import _ from 'lodash';

const ignoreErrors = ['There are multiple, different versions of MobX active'];

export const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://f0bd8161b8664ef6a7df4de384225a34@sentry.wixpress.com/126',
  release: getAppVersion(),
  beforeSend: (event) => {
    const message = _.get(event, 'exception.values[0].value');
    const shouldIgnoreError = _.some(ignoreErrors, (error) =>
      _.includes(message, error),
    );
    if (shouldIgnoreError || !isProduction()) {
      return null;
    }
    return event;
  },
});
