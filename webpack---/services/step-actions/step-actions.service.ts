import {
  appDefIds,
  getCurrentInstance,
  IViewMode,
} from '@wix/business-manager-api';
import { wixAxios } from '@src/services/wix-axios';

export const getSkipEndpoint = (stepId: string) =>
  `/_serverless/dashboard-setup/step/${stepId}/skip`;

export const getUnskipEndpoint = (stepId: string) =>
  `/_serverless/dashboard-setup/step/${stepId}/unskip`;

export const skip = (stepId: string, viewMode: IViewMode): Promise<void> => {
  const headers = {
    Authorization: getCurrentInstance(appDefIds.metaSite),
  };

  return wixAxios({
    method: 'POST',
    headers,
    params: {
      viewMode,
    },
    url: getSkipEndpoint(stepId),
  });
};

export const unskip = (stepId: string, viewMode: IViewMode): Promise<void> => {
  const headers = {
    Authorization: getCurrentInstance(appDefIds.metaSite),
  };

  return wixAxios({
    method: 'POST',
    headers,
    params: {
      viewMode,
    },
    url: getUnskipEndpoint(stepId),
  });
};
