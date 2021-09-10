import { axiosInstance } from '../utils/axiosInstance';
import * as types from '../actionTypes/embeddedServicesActionTypes';
import { IEmbeddedService, IEmbeddedServicesMap } from '../../common/types/embedded-services';
import { getHeaders } from '../utils/getHeaders';
import { IState } from '../types/store';
import { experimentsSelectors } from '../services/essentials';

export function fetchEmbeddedServicesSuccess(embeddedServices: IEmbeddedServicesMap) {
  return {
    type: types.FETCH_EMBEDDED_SERVICES_SUCCESS,
    embeddedServices
  };
}

function fetchEmbeddedServiceSuccess(embeddedService: IEmbeddedService) {
  return {
    type: types.FETCH_EMBEDDED_SERVICE_SUCCESS,
    embeddedService
  };
}

export const fetchEmbeddedService = (appDefId: string) => (dispatch, getState): Promise<IEmbeddedService> => {
  return axiosInstance.get(`/_api/business-manager/embeddedService/${appDefId}`, { headers: getHeaders(getState()) })
    .then(response => response.data)
    .then(embeddedService => {
      dispatch(fetchEmbeddedServiceSuccess(embeddedService));
      return embeddedService;
    });
};

export const provisionApp = (state: IState, appDefinitionId: string, metaSiteId: string, useSignedRequest: boolean) => {
  const deprecateOldProvisionApi = experimentsSelectors(state).enabled('specs.wosbm.deprecateProvisionApiWithMetaSiteIdInUrl');
  if (useSignedRequest || deprecateOldProvisionApi) {
    return axiosInstance.post(`/_api/business-manager/embeddedService/${appDefinitionId}`, {}, {  headers: getHeaders(state) });
  } else {
    return axiosInstance.post(`/_api/business-manager/site/${metaSiteId}/embeddedService/${appDefinitionId}`);
  }
};
