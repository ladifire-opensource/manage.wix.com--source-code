import './public-path'; // Must be first import!
import { render } from 'react-dom';
import { useBasename } from 'history';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { configureStore } from './store/configureStore';
import { configureWixAxiosInstance } from './utils/axiosInstance';
import { initPauseNavigationListener } from './external-api/pause-navigation/pause-navigation';
import { configureSidebar, FOOTER_CONTAINER_ID } from '@wix/business-manager-sidebar-client';
import { buildApp } from './buildApp';
import { configureMediaManager } from './external-api/media-manager/mediaManager';
import { initNavigationCompletedListener } from './external-api/navigation-completed/navigation-completed';
import { IState } from './types/store';
import { initInstancesHandler } from './services/instancesHandler';
import { initSessionBi } from './services/initSessionBi/initSessionBi';
import { getCurrentUserLanguage } from './selectors/currentUserSelectors';
import { initModuleRegistryErrorListener } from './services/ModuleRegistryErrorHandler';
import { initLifeCycleActionsDispatcher } from './modules/dispatchLifecycleActions/initLifeCycleActionsDispatcher';
import { initShowToastApi } from './external-api/show-toast/showToast';
import { initMonitors } from './modules/monitors/init-monitors';
import { initShowTipApi } from './external-api/show-tip/showTip';
import { registerGetMandatoryBIFields } from './external-api/getMandatoryBIFields/getMandatoryBIFields';
import { registerIsAppInstalled } from './external-api/isAppInstalled/registerIsAppInstalled';
import { getIsInEditor } from './selectors/viewModeSelector';
import { initHostingApi } from './external-api/hosting/hosting';
import { registerRefreshAppMessage } from './services/Editor/EditorIntegrator';
import { initModules } from './modules/initModules';
import { selectSidebarProps } from './selectors/sidebarPropsSelector';
import { ModuleRegistry } from 'react-module-container';
import { executeWorkarounds } from './workarounds';
import { prefetchPageComponents } from './modules/prefetchPageComponentFiles/prefetchPageComponents';
import { subscribeToLocaleChange } from './services/locale-change-subscriber';
import { buildVeloWrapper } from './components/VeloWrapper/VeloWrapper';
import { registerCommonConfig } from './external-api/commonConfig/registerCommonConfig';
import * as wixRecorderMethods from './services/wix-recorder-methods';
import { VELO_WRAPPER } from '@wix/business-manager-api';
import { getIsDebug } from './selectors/isDebugSelectors';
import { getExperiments } from './services/essentials';
import { initI18n } from '@wix/wix-i18n-config';
import { showWarningToastIfSiteIsBlocked } from './services/toasts/siteIsBlockedWarningToast';
import { initDeferredModuleScriptsPoc } from './modules/deferredModuleScriptsPoc/initDeferredModuleScriptsPoc';

const experiments = getExperiments();

const store = configureStore({
  ...window['__INITIAL_STATE__'],
  experiments: experiments.all(),
});

delete window['__INITIAL_STATE__']; //tslint:disable-line:no-dynamic-delete

const state: IState = store.getState();

const basename = window['__BASENAME__'];
const history = useBasename(createBrowserHistory)({ basename }); // eslint-disable-line react-hooks/rules-of-hooks
const instancesExpirationTimeout = window['__INSTANCES_EXPIRATION_TIMEOUT__'];

configureWixAxiosInstance({ baseURL: basename });
configureMediaManager(window['__MEDIA_TOKEN__'], state.currentUser.language);

const initialI18N = window['__INITIAL_I18N__'];
const i18n = initI18n({ locale: initialI18N.locale, messages: initialI18N.resources });
if (experiments.enabled('specs.wos2.setWixRecorderLanguage')) {
  wixRecorderMethods.setLanguage(getCurrentUserLanguage(state));
}

const registerSidebar = () => {
  const Sidebar = configureSidebar(selectSidebarProps(state));
  ModuleRegistry.registerComponent('business-manager.sidebar', () => Sidebar);
};

initPauseNavigationListener(basename, history, window);
initNavigationCompletedListener(history);

if (!experiments.enabled('specs.wos.DisableSdkWorkarounds')) {
  executeWorkarounds();
}

initSessionBi();

initLifeCycleActionsDispatcher(store);
initShowToastApi(store.dispatch);
initMonitors();

if (experiments.enabled('specs.wosbm.SupportAppComponents')) {
  initHostingApi(state);
}

showWarningToastIfSiteIsBlocked(i18n.t.bind(i18n), state);

initShowTipApi(store);
registerGetMandatoryBIFields(store);
registerIsAppInstalled(store);

registerCommonConfig(store.getState());

if (getIsInEditor(state)) {
  registerRefreshAppMessage(store);
}

subscribeToLocaleChange(store);

registerSidebar();
initInstancesHandler(store, instancesExpirationTimeout);

const VeloWrapper = buildVeloWrapper(store);
ModuleRegistry.registerComponent(VELO_WRAPPER, () => VeloWrapper);

const deferredModuleScriptsPocEnabled = experiments.enabled('specs.wosbm.DeferredModuleScriptsPoc');
initModuleRegistryErrorListener({
  isDebug: getIsDebug(state),
  deferredModuleScriptsPocEnabled
});

if (experiments.enabled('specs.wosbm.AddNewButtonOnSidebar')) {
  ModuleRegistry.invoke('businessManager.registerHostContainer', FOOTER_CONTAINER_ID);
}

if (deferredModuleScriptsPocEnabled) {
  const loadedBmServices = initDeferredModuleScriptsPoc(store);

  const app = buildApp({ store, basename, history, i18n });
  const rootElement = document.getElementById('root');
  document.addEventListener('DOMContentLoaded', () => {
    loadedBmServices.then(() => render(app, rootElement));
  });
} else {
  initModules(state);
  prefetchPageComponents(store);

  const app = buildApp({ store, basename, history, i18n });
  const rootElement = document.getElementById('root');
  document.addEventListener('DOMContentLoaded', () => {
    render(app, rootElement);
  });
}
