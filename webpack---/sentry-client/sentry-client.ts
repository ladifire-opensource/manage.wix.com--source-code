import * as Sentry from '@sentry/browser';
import { TModuleParams } from '@wix/business-manager-api';
import { ExperimentsBag } from '@wix/wix-experiments';

const isDevelopment = process.env.NODE_ENV === 'development';
const dsn = 'https://f415438fff5c4260acdd14d849301464@sentry.wixpress.com/286';
const ownArtifacts = ['smart-actions-web', 'triggers-statics', 'send-mail-action-client', 'zapier-action-client'];

const isOwnArtifactEvent = event => {
  if (event.message && event.message[0] instanceof Error) {
    return true;
  }
  try {
    const [{ stacktrace: { frames } }] = event.exception.values;

    const ownArtifact = frames.find(({ filename }) => ownArtifacts.find(artifact => filename.includes(artifact)));
    return ownArtifact ? event : null;

  } catch {
    return event;
  }
};

export const getSentryHub = ({ experiments, userId: id, metaSiteId, locale }: Partial<TModuleParams> & { experiments: ExperimentsBag }) => {
  const sentryClient = new Sentry.BrowserClient({
    dsn: isDevelopment ? null : dsn,
    beforeSend: isOwnArtifactEvent
  });

  const hub = new Sentry.Hub(sentryClient);
  const crmExperiments = Object.fromEntries(
    Object.entries(experiments)
      .filter(([key]) => key.startsWith('specs.crm'))
      .map(([key, value]) => [key, `${value}`]));

  hub.configureScope(scope => {
    scope.setUser({ id });
    scope.setTags(crmExperiments);
    scope.setTag('msid', metaSiteId);
    scope.setTag('locale', locale);
  });

  return hub;
};
