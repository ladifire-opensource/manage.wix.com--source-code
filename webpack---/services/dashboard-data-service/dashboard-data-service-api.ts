import { fedopsInteractions, fedopsPhases } from '@consts';
import { failedToLoadLayoutFromCache, failedToLoadLayoutFromDealer } from '@services/sentry';
import { DashboardData } from '@types';
import type { FlowAPIBase, FlowAPIInstances, FlowAPILocalInstances } from 'yoshi-flow-bm-runtime';
import { getDashboardData } from '../../api';
import { loadAndShowError } from './error-loader';
import { mapDashboardData } from './helpers/map-dashboard-data';
import { getLayoutFromCache, setCachedLayout } from './sources/cache';
import { generateFallbackDashboardData } from './sources/fallback';

export interface FetchDashboardDataParams {
  metaSiteId: string;
  userId: string;
  userPermissions: string[];
  fedopsLogger: FlowAPILocalInstances['fedopsLogger'];
  sentry: FlowAPIBase['sentry'];
  biLogger: FlowAPIInstances['biLogger'];
  isNonPermittedExperimentOn: boolean;
  httpClient: FlowAPIBase['httpClient'];
  i18n: FlowAPIInstances['i18n'];
}

export const loadDashboardData = async ({
  metaSiteId,
  userId,
  userPermissions,
  fedopsLogger,
  sentry,
  biLogger,
  httpClient,
  isNonPermittedExperimentOn,
  i18n,
}: FetchDashboardDataParams): Promise<DashboardData> => {
  const sentryMetaData = {
    userId,
    metaSiteId,
  };

  try {
    fedopsLogger.appLoadingPhaseStart(fedopsPhases.LOAD_DASHBOARD_DATA);
    fedopsLogger.interactionStarted(fedopsInteractions.HTTP2_ERROR);
    const dashboardData: DashboardData = await httpClient.request(getDashboardData)();

    fedopsLogger.appLoadingPhaseFinish(fedopsPhases.LOAD_DASHBOARD_DATA);
    setCachedLayout(metaSiteId, dashboardData).catch();

    return mapDashboardData({
      sentry,
      sentryMetaData,
      dashboardData,
      userPermissions,
      isNonPermittedExperimentOn,
    });
  } catch (e) {
    try {
      if (!e.response?.status && e.message === 'Failed to fetch') {
        fedopsLogger.interactionEnded(fedopsInteractions.HTTP2_ERROR);
      }

      failedToLoadLayoutFromDealer(sentry, e, sentryMetaData);
      const cachedDashboardData = await getLayoutFromCache(metaSiteId);

      if (cachedDashboardData) {
        biLogger
          .dashboardFetchDealerLayoutFailed({
            msid: metaSiteId,
            type: 'cached',
            dashboard_type: 'new',
          })
          .catch();

        return mapDashboardData({
          sentry,
          sentryMetaData,
          dashboardData: cachedDashboardData,
          userPermissions,
          isNonPermittedExperimentOn,
        });
      }
    } catch (cacheError) {
      failedToLoadLayoutFromCache(sentry, cacheError, sentryMetaData);
    }
  }

  biLogger
    .dashboardFetchDealerLayoutFailed({
      msid: metaSiteId,
      type: 'fallback',
      dashboard_type: 'new',
    })
    .catch();
  loadAndShowError(i18n);

  return generateFallbackDashboardData();
};
