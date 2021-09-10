import * as Sentry from '@sentry/browser';

const isDevelopment = process.env.NODE_ENV === 'development';

const isOwnArtifactEvent = ({event, ownArtifacts}) => {
  if (event.message && event.message[0] instanceof Error) {
    return true;
  }
  try {
    const { frames } = event.exception.values[0].stacktrace;
    return Boolean(frames.find(({filename}) => ownArtifacts
      .map(artifact => filename.includes(artifact))
      .some(didFoundOwnArtifact => didFoundOwnArtifact))
    );
  } catch (error) {
    return true;
  }
};

const getSentry = ({dsn, ownArtifacts}): Sentry.BrowserClient => {
  return new Sentry.BrowserClient({
    dsn: isDevelopment ? null : dsn,
    beforeSend: (event) => {
      return isOwnArtifactEvent({event, ownArtifacts}) ? event : null
    }
  });
};

export const getSentryHub = ({dsn, ownArtifacts, experiments, metaSiteId, userId, locale}) => {
  const sentryClient = getSentry({dsn, ownArtifacts});

  const hub = new Sentry.Hub(sentryClient);
  hub.configureScope(scope => {
    scope.setUser({id: userId});
    scope.setTags(experiments.experiments);
    scope.setTag('msid', metaSiteId);
    scope.setTag('locale', locale);
  });

  return hub;
};
