import { ResolveFn } from '@wix/yoshi-flow-bm';
import { getInitialData } from '../services/initial-data/initial-data.service';
import { ResolvedProps } from '../common/types/types';
import { createErrorReporter } from '@src/utils';
import { ViewType } from '@src/common/types';

export const resolve: ResolveFn<ResolvedProps> = async ({
  moduleParams,
  errorMonitor,
  httpClient,
}) => {
  const view = ViewType.SECTION;

  return getInitialData({
    view,
    translationUrl: moduleParams.config.topology.dashboardSuggestionsTranslations,
    accountLanguage: moduleParams.accountLanguage,
    reportError: createErrorReporter(errorMonitor, view),
    httpClient,
  });
};
