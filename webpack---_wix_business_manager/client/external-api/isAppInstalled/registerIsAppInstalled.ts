import { IEmbeddedServicesMap } from '../../../common/types/embedded-services';
import { Store } from 'redux';
import { IState } from '../../types/store';
import { ModuleRegistry } from 'react-module-container';
import {
  AppToCoreService,
  buildAppToCoreService,
  isAppInstalled
} from '../../../common/isAppInstalled/isAppInstalled';
import { IS_APP_INSTALLED } from '@wix/business-manager-api';
import { getModulesInfo } from '../../selectors/modulesSelectors';
import { ModulesInfo } from '../../../server/config/configuration-types';
import { experimentsSelectors } from '../../services/essentials';

function isAppInstalledBuilder(embeddedServices: IEmbeddedServicesMap, appToCoreService: AppToCoreService) {
  return (appDefId: string): boolean => isAppInstalled(appDefId, embeddedServices, appToCoreService);
}

export const registerIsAppInstalled = (store: Store<IState>) => {
  const state = store.getState();
  const modulesInfo: ModulesInfo = getModulesInfo(state);
  const experiments = experimentsSelectors(state);
  const appToCoreService = buildAppToCoreService(experiments, Object.values(modulesInfo));

  return ModuleRegistry.registerMethod(IS_APP_INSTALLED,
    () => isAppInstalledBuilder(state.embeddedServices, appToCoreService));
};
