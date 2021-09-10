import * as Sentry from '@sentry/browser';
import { TModuleParams } from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { isDevelopment, isProduction } from '../config/statics';

const ARTIFACT_BUNDLE_FILE_NAME = 'cashier-merchant-settings';

const getVersionFromUrl = staticsUrl => {
  const versionMatches = staticsUrl.match(/1.\d+.0/);
  return (versionMatches && versionMatches[0]) || null;
};

const isArtifactEvent = (event: Sentry.Event) => {
  try {
    const { frames } = event.exception.values[0].stacktrace;

    return Boolean(frames.find(({ filename }) => filename.includes(ARTIFACT_BUNDLE_FILE_NAME)));
  } catch (error) {
    return false;
  }
};

export const initSentryHub = (moduleParams: TModuleParams) => {
  const sentryClient = new Sentry.BrowserClient({
    dsn: 'https://fc5949c32d6a43b294d8b8336eb3a9ca@sentry.wixpress.com/40',
    release: getVersionFromUrl(moduleParams.config.topology.cashierStaticsUrl),
    beforeSend: event => {
      if (isDevelopment) {
        console.error('SentryEvent', event);
      } else if (isProduction && isArtifactEvent(event)) {
        return event;
      }
      return null;
    },
  });

  Sentry.setTags({ msid: moduleParams.metaSiteId });

  const hub = new Sentry.Hub(sentryClient);

  hub.configureScope(scope => {
    scope.setUser({ id: moduleParams.userId });
    scope.setExtra('msid', moduleParams.metaSiteId);
    scope.setTag('viewMode', moduleParams.viewMode);
    scope.setTag('locale', moduleParams.accountLanguage);
  });

  return hub;
};

export const captureException = error => {
  const hub = ModuleRegistry.invoke('cashier.getSentryHub');
  return hub && hub.captureException(error);
};
