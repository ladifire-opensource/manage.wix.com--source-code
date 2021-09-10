import {BrowserClient, Scope} from '@sentry/browser';
import {IBMModuleParams} from 'yoshi-flow-bm-runtime';

/* istanbul ignore next */
export const createErrorReporter = (sentry: BrowserClient, moduleParams: IBMModuleParams): ((e: Error) => void) => {
  const {metaSiteId, userId} = moduleParams;
  const scope = new Scope().setTags({metaSiteId, userId});
  return (e: Error) => sentry.captureException(e, undefined, scope);
};
