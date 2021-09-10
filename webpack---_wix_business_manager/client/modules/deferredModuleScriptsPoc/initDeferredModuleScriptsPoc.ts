import { getAllModules, ModuleId } from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import { loadModulesFiles } from './loadModulesFiles';
import { prefetchPageComponents } from '../prefetchPageComponentFiles/prefetchPageComponents';
import { initModules } from '../initModules';
import { buildModuleParams } from '../buildMapStateToPageComponentProps/buildModuleParams';
import { getModuleAppDefId, getModuleConfig } from '../../selectors/modulesSelectors';

// Modules needed before loading the BM app (header/sidebar components)
const bmServicesServiceIds = ['dashboard-setup-app', 'wix-new-releases-widget', 'business-dashboard-global-toast'];

// Modules needed for slots
const slotModuleServiceIds = ['demo-module-with-sidebar-config', 'admin-pages', 'etpa-container-v2', 'arena-biz-manager', 'wix-payments-balance', 'wix-ecommerce-storemanager']; // TODO: Remove ecom sidebar slot: explore-products-slot

// Modules for the front page (overlaps with `bmServicesServiceIds` see comment bellow)
const fastPathServiceIds = ['business-dashboard-app'];

// Rough dependency map for our main services
const dependenciesMap = {
  'arena-biz-manager': ['*'], // could try ['contacts-web', 'invoices-web'], but it's a vertical so won't all sites
  'wix-payments-balance': ['cashier-merchant-settings'],
  'dashboard-setup-app': [
    'business-dashboard-app', // calls registerWidget
    'features-wizard' // setup widget component dependency?
  ],
  'business-dashboard-app': [ // depends on all callers of `registerWidget`
    'bookings-dashboard-widgets',

    //'dashboard' // Replace all these with just this prefix?
    'dashboard-setup-app', // Already defined in reversed dependency, should not create a loop since we remove visited entries.
    'dashboard-more-than-website-app',
    'dashboard-sales-app',
    'dashboard-site-details-app',
    'dashboard-suggestions-app',
    'dashboard-welcome-video',
    'dashboard-smart-header',
    'dashboard-help',
    'business-dashboard-modals',

    'wixstores-dashboard-os-widgets',
    'wix-events-dashboard',

    'analytics-ng-bm',
  ],
  'business-dashboard-modals': ['dealer-lightbox'],
  'analytics-ng-bm': ['site-settings-manager']
};

export const initDeferredModuleScriptsPoc = (store) => {
  const state = store.getState();
  const initializedModuleIds: string[] = [];
  const initUninitializedModules = () => {
    const uninitializedModules = getAllModules().filter(({ moduleId }) => !initializedModuleIds.includes(moduleId));
    initModules(state, uninitializedModules);
    uninitializedModules.forEach(({ moduleId }) => initializedModuleIds.push(moduleId));
  };

  const loadModules = (moduleFiles: ModuleFiles[]) => {
    return loadModulesFiles(moduleFiles).then(initUninitializedModules);
  };

  type ModuleFiles = {
    url: string;
    crossOrigin: boolean;
  };
  let modulesFiles: ModuleFiles[] = window['__deferredModuleScriptsPoc__modulesFiles'];

  const extractModuleFiles = (serviceIds: string[] = ['*']): ModuleFiles[] => {
    return serviceIds.reduce<ModuleFiles[]>((extractedServiceModuleFiles, serviceId) => {
      let serviceModuleFiles = [];
      if (serviceId === '*') {
        // Load all services
        serviceModuleFiles = modulesFiles;
        modulesFiles = [];
      } else {
        serviceModuleFiles = modulesFiles.filter(({ url }) => url.includes(`/${serviceId}`));
        modulesFiles = modulesFiles.filter(moduleFile => !serviceModuleFiles.includes(moduleFile)); // Remove extracted
      }
      if (!serviceModuleFiles.length) {
        return extractedServiceModuleFiles; // Don't load deps if file is not loaded
      }
      extractedServiceModuleFiles.push(...serviceModuleFiles);

      if (serviceId in dependenciesMap) {
        extractedServiceModuleFiles.unshift(...extractModuleFiles(dependenciesMap[serviceId]));
      }
      return extractedServiceModuleFiles;
    }, []);
  };

  const bmServiceModuleFiles = extractModuleFiles(bmServicesServiceIds);
  const slotModuleFiles = extractModuleFiles(slotModuleServiceIds);

  // In practice, this list is empty because we bring the `dashboard-setup-app` module in `bmServiceModuleFiles` which also integrates with `business-dashboard-app` `registerWidget`
  // If `dashboard-setup-app` is separated it will help the BM app load faster.
  const fastPathModuleFiles = extractModuleFiles(fastPathServiceIds);
  const deferredModulesFiles = extractModuleFiles();

  console.log({ modulesFiles, bmServiceModuleFiles, slotModuleFiles, fastPathModuleFiles, deferredModulesFiles }); // tslint:disable-line:no-console

  let fastPathModulesFilesLoaded, slotModulesFilesLoaded, modulesFilesLoaded;

  window['__deferredModuleScriptsPoc__loadFastPathModulesFiles'] = () => {
    return fastPathModulesFilesLoaded || (fastPathModulesFilesLoaded = loadModules(fastPathModuleFiles));
  };

  window['__deferredModuleScriptsPoc__loadSlotModuleFilesUrls'] = () => {
    return slotModulesFilesLoaded || (slotModulesFilesLoaded = loadModules(slotModuleFiles));
  };

  window['__deferredModuleScriptsPoc__loadModulesFiles'] = () => {
    console.trace('__deferredModuleScriptsPoc__loadModulesFiles');
    if (modulesFilesLoaded) {
      return modulesFilesLoaded;
    }
    return modulesFilesLoaded = window['__deferredModuleScriptsPoc__loadFastPathModulesFiles']()
      .then(window['__deferredModuleScriptsPoc__loadSlotModuleFilesUrls'])
      .then(() => loadModules(deferredModulesFiles))
      .then(() => prefetchPageComponents(store));
  };

  // Super hack for `inbox-header-widget` that looks for moduleParams for data:
  // https://github.com/wix-private/inbox/blob/master/inbox-header-widget/src/services/BusinessManagerService.ts#L30
  ModuleRegistry.getModule = (moduleId: ModuleId) => {
    if (moduleId === ModuleId.Engage && !ModuleRegistry.modules[ModuleId.Engage]) {
      return {
        moduleParams: buildModuleParams(state, getModuleAppDefId(state, ModuleId.Engage), getModuleConfig(state, ModuleId.Engage))
      };
    }
    return ModuleRegistry.modules[moduleId];
  };

  return loadModules(bmServiceModuleFiles);
};
