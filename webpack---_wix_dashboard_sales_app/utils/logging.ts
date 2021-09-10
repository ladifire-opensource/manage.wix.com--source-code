import { SentryHub } from '@wix/yoshi-flow-bm';

export const scopedSentry = ({
  metaSiteId,
  userId,
  sentry,
}: {
  metaSiteId: string;
  userId: string;
  sentry: SentryHub;
}): SentryHub => {
  sentry.setTags({ metaSiteId, userId });
  return sentry;
};
