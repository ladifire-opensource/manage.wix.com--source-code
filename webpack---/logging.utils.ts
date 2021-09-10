import { Scope } from '@sentry/browser';

export const buildSentryScope = ({ metaSiteId, userId }: { metaSiteId: string; userId: string }) =>
  new Scope().setTags({ metaSiteId, userId });
