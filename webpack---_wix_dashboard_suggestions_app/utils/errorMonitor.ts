import { ViewType } from '@src/common/types';
import type { ErrorMonitor } from '@wix/yoshi-flow-bm';

export const createErrorReporter = (
  errorMonitor: ErrorMonitor,
  view: ViewType,
): ((e: Error) => void) => {
  return (e: Error) => errorMonitor.captureException(e, { tags: { view } });
};
