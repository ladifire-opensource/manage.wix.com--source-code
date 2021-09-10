import { getDashboardDataCapsule } from '../../data-capsule';
import { DashboardData } from '@types';

const getCacheKey = (metaSiteId: string) => `${metaSiteId}-dashboard-data`;

export const getLayoutFromCache = async (metaSiteId: string): Promise<DashboardData> =>
  getDashboardDataCapsule().getItem(getCacheKey(metaSiteId));

export const setCachedLayout = (metaSiteId: string, dashboardData: DashboardData): Promise<void> =>
  getDashboardDataCapsule().setItem(getCacheKey(metaSiteId), dashboardData, {
    category: 'functional',
  });
