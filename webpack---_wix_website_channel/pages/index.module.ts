import { ResolveFn } from '@wix/yoshi-flow-bm';
import { getInitialData } from '@services/initial-data';
import { ResolvedProps } from '@common/types';
import { MoreTools } from '@common/more-tools';

export const resolve: ResolveFn<ResolvedProps> = async ({
  errorMonitor,
  httpClient,
}) => {
  try {
    const data = await getInitialData({ httpClient });
    return { data };
  } catch (e) {
    errorMonitor.captureException(
      new Error(`initial-data failed to resolve >>> ${e}`),
    );
    return {
      error: true,
      data: {
        moreTools: {
          data: MoreTools,
        },
      },
    };
  }
};
