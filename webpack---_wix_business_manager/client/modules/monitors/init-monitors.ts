import * as Sentry from '@sentry/browser';
import { Event, EventHint, Severity } from '@sentry/browser';
import { initSentryRouter, registerSentryClient, registerErrorMonitor } from '@wix/sentry-router';
import { ModuleRegistry } from 'react-module-container';
import {
  PageComponentId,
  REGISTER_PAGE_COMPONENT_MONITORS,
  RegisterPageComponentMonitorsOptions
} from '@wix/business-manager-api';
import { createFedopsLogger } from '../../services/essentials';
import { createGetCurrentPageComponentId } from '../../services/create-get-current-page-component-id';

const getCurrentlyLoadedScriptUrls = () => Array.from(document.scripts)
  .map(script => script.src)
  .filter(src => Boolean(src));

export const initMonitors = () => {
  const untrackedClient = new Sentry.BrowserClient({
    dsn: 'https://27654e0310ee4353a0963af55cd6bd51@sentry.wixpress.com/194'
  });
  const excludedFilenames = getCurrentlyLoadedScriptUrls();
  const getCurrentClientId = createGetCurrentPageComponentId();
  initSentryRouter({ untrackedClient, excludedFilenames, getCurrentClientId });

  ModuleRegistry.registerMethod(REGISTER_PAGE_COMPONENT_MONITORS, () => (pageComponentId: PageComponentId, options: RegisterPageComponentMonitorsOptions) => {
    if (options?.sentryClient) {
      const sentryBrowserClient: Sentry.BrowserClient = options.sentryClient;
      const ignoredSeverityLevels = [Severity.Log, Severity.Debug, Severity.Info, Severity.Warning];

      const fedopsLogger = createFedopsLogger(pageComponentId);
      const originalClientBeforeSend = sentryBrowserClient.getOptions().beforeSend;

      sentryBrowserClient.getOptions().beforeSend = (event: Event, hint: EventHint) => {
        if (!ignoredSeverityLevels.includes(event.level)) {
          fedopsLogger.reportErrorThrownOncePerFlow();
        }

        return originalClientBeforeSend ? originalClientBeforeSend(event, hint) : event;
      };

      registerSentryClient(pageComponentId, sentryBrowserClient);
    }

    if (options?.errorMonitor) {
      registerErrorMonitor(pageComponentId, options.errorMonitor);
    }
  });
};
