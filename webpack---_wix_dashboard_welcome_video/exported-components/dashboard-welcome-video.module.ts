import { ResolveFn } from '@wix/yoshi-flow-bm';
import { ResolvedProps } from '@src/types';
import { getVideoData } from '@src/services/dealer-offers.service';
import { localVideo } from '@src/local-video';

export const resolve: ResolveFn<ResolvedProps> = async ({
  httpClient,
  sentry,
  getExperiments,
}) => {
  const isFetchFromDealerEnabled = (await getExperiments()).enabled(
    'specs.wos1.welcomeVideoFetchFromDealer',
  );

  return {
    video: isFetchFromDealerEnabled
      ? await getVideoData(httpClient, sentry)
      : localVideo,
  };
};
