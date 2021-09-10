import {
  appDefIds,
  getCurrentInstance,
  IViewMode,
} from '@wix/business-manager-api';
import { wixAxios } from '@src/services/wix-axios';
import { DashboardWidgetData } from '@wix/dashboard-setup-common';

export const WIDGET_DATA_ENDPOINT = '/_serverless/dashboard-setup/widget-data';

export const fetchDashboardWidgetData = async (
  viewMode: IViewMode,
): Promise<DashboardWidgetData> => {
  const headers = {
    Authorization: getCurrentInstance(appDefIds.metaSite),
  };

  return (
    await wixAxios.get(`${WIDGET_DATA_ENDPOINT}/?viewMode=${viewMode}`, {
      headers,
    })
  ).data;
};
