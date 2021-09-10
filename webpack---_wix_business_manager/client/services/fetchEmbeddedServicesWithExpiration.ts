import { IState } from '../types/store';
import { axiosInstance } from '../utils/axiosInstance';
import { getHeaders } from '../utils/getHeaders';
import { IEmbeddedServicesMap } from '../../common/types/embedded-services';

type EmbeddedServicesAndExpirationResponse = {
  embeddedServices: IEmbeddedServicesMap,
  instancesExpirationTimeout: number
};

export const fetchEmbeddedServicesWithExpiration = (state: IState): Promise<EmbeddedServicesAndExpirationResponse> => {
  return axiosInstance.get(`/_api/business-manager/embeddedServicesWithExpiration`, {  headers: getHeaders(state) })
  .then(response => response.data);
};
