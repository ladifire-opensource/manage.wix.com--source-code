import * as Sentry from '@sentry/browser';
import {isDevelopment, isProduction, sentryDsn} from '../../utils/config';
import {TModuleParams} from '@wix/business-manager-api';

const isArtifactEvent = (event: Sentry.Event) => {
  try {
    const {frames} = event.exception.values[0].stacktrace;

    return Boolean(frames.find(({filename}) => filename.includes('bm-client')));
  } catch (error) {
    return false;
  }
};

export const bmInitSentryHub = (moduleParams: TModuleParams) => {
  const sentryClient = new Sentry.BrowserClient({
    dsn: sentryDsn,
    beforeSend: (event) => {
      if (isDevelopment) {
        console.error('SentryEvent', event);
      } else if (isProduction && isArtifactEvent(event)) {
        return event;
      }

      return null;
    },
  });

  const hub = new Sentry.Hub(sentryClient);

  hub.configureScope((scope) => {
    scope.setUser({id: moduleParams.userId});
    scope.setExtra('msid', moduleParams.metaSiteId);
    scope.setTag('viewMode', moduleParams.viewMode);
    scope.setTag('locale', moduleParams.locale);
    scope.setTag('environment', 'BusinessManager');
  });

  return hub;
};
