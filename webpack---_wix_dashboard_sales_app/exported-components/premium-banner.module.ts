import { ResolveFn } from '@wix/yoshi-flow-bm';
import { getInitialData } from '@services/banner-initial-data/banner-initial-data.service';
import { BannerInitialData } from '@types';

export const resolve: ResolveFn<BannerInitialData> = async ({
  moduleParams: { accountLanguage, config, metaSiteId },
  errorMonitor,
  httpClient,
}) => {
  try {
    return getInitialData({
      translationUrl: config.topology.dashboardSalesTranslationsStaticsUrl,
      accountLanguage,
      httpClient,
    });
  } catch (error) {
    errorMonitor.captureException(error);
    throw error;
  }
};
