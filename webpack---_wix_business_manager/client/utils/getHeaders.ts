import { appDefIds } from '@wix/business-manager-api';
import { getEmbeddedServiceById } from '../selectors/embeddedServicesSelectors';

export const getHeaders = (state) => ({ Authorization: getEmbeddedServiceById(state, appDefIds.metaSite).instance });
