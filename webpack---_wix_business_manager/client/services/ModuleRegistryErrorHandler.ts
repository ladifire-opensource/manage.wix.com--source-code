import { ModuleRegistry } from 'react-module-container';
import * as Sentry from '@sentry/browser';

type InitModuleRegistryErrorListenerParams = {
  isDebug: boolean;
  deferredModuleScriptsPocEnabled: boolean;
};

export const initModuleRegistryErrorListener = ({ isDebug, deferredModuleScriptsPocEnabled }: InitModuleRegistryErrorListenerParams): void => {

  if (deferredModuleScriptsPocEnabled) {
    const bmSentryClient: Sentry.BrowserClient = Sentry.getCurrentHub().getClient();

    ModuleRegistry.addListener('reactModuleContainer.error', (error) => {
      console.error(error); // tslint:disable-line: no-console
      bmSentryClient.captureException(error);
    });
  } else {
    ModuleRegistry.addListener('reactModuleContainer.error', (error) => {
      if (isDebug) {
        console.error(error); // tslint:disable-line: no-console
      }
    });
  }
};
