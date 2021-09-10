import { BrowserClient, Scope } from '@sentry/browser';
import { IBMModuleParams } from 'yoshi-flow-bm-runtime';

export interface SentryMetaData {
  userId: string;
  metaSiteId: string;
}

export const captureException = (
  sentry: BrowserClient,
  error: Error,
  moduleParams: IBMModuleParams,
) => {
  sentry.captureException(error, undefined, createSentryScope(moduleParams));
};

const createSentryScope = (moduleParams: IBMModuleParams): Scope => {
  const { userId, metaSiteId } = moduleParams;
  return new Scope().setTags({ userId, metaSiteId });
};
