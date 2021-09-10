import * as Sentry from '@sentry/browser';
import _ from 'lodash';
import { CustomError } from '../errors';

const isNewSentry = Sentry.SDK_VERSION.startsWith('5');

const ignoreErrors = [
  'ModuleRegistry.invoke ascend.getVendorProductId',
  'There are multiple, different versions of MobX active',
];

export const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://ecc6db7b8f064c4ebef7f673814d7b70@sentry.wixpress.com/61',
  beforeSend: (event: Sentry.Event, hint: Sentry.EventHint) => {
    const message = _.get(event, 'exception.values[0].value');

    event.fingerprint = [message];

    const shouldIgnoreError = _.some(ignoreErrors, (err) =>
      _.includes(message, err),
    );

    if (shouldIgnoreError) {
      return null;
    }

    if (!event.extra) {
      event.extra = {};
    }

    if (hint && hint.originalException) {
      const originalException = hint.originalException as any;

      if (originalException && originalException.isCustomError) {
        const customError = originalException as CustomError;
        event.extra.request = customError.originalException.request;
        event.extra.response = customError.originalException.response;
        event.fingerprint = [customError.message];
      }
    }

    return event;
  },
});

const hubClient = new Sentry.Hub(sentryClient);

export default {
  addBreadcrumb: (payload) => {
    if (isNewSentry) {
      return hubClient.addBreadcrumb(payload);
    }

    return (sentryClient as any).addBreadcrumb(payload);
  },
  captureException: (payload) => {
    if (isNewSentry) {
      return hubClient.captureException(payload);
    }

    return sentryClient.captureException(payload);
  },
};
