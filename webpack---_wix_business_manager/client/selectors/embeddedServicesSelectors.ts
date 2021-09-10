import { IState } from '../types/store';
import { IEmbeddedService, IEmbeddedServicesMap } from '../../common/types/embedded-services';
import { appDefIds } from '@wix/business-manager-api';

export const getEmbeddedServicesIds = (state: IState): string[] => Object.keys(state.embeddedServices);

export const getEmbeddedServiceById = (state: IState, appDefinitionId: string): IEmbeddedService => {
  const embeddedServices: IEmbeddedServicesMap = state.embeddedServices;
  return (embeddedServices && embeddedServices[appDefinitionId]) ? embeddedServices[appDefinitionId] : {}; // TODO: return null when embedded service not found
};

export const isAppInstalled = (state: IState, appDefinitionId: string): boolean => {
  return !!state.embeddedServices[appDefinitionId];
};

export const getIsInExpertsDashboard = (state: IState): boolean => isAppInstalled(state, appDefIds.wixExpertsDashboard);
