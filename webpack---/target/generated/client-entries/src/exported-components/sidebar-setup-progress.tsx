import Component from '/home/builduser/work/278ca3550e91f69c/packages/dashboard-setup-app/src/exported-components/sidebar-setup-progress';
import { hot } from 'component-hot-loader';
import { wrapComponent } from 'yoshi-flow-bm-runtime';
import type { ResolveComponentFlowAPI, ModuleLite } from 'yoshi-flow-bm-runtime/common';

import flowAPIDeps from '../../flowAPIDeps';
const HotComponent = hot(module, Component);

export default (resolveComponentFlowAPI: ResolveComponentFlowAPI) =>
  wrapComponent(
    HotComponent,
    {"moduleId":"DASHBOARD_SETUP_APP","config":{"appDefId":"0750d046-d599-4cfc-9f6b-e9f4af169aa9","moduleId":"DASHBOARD_SETUP_APP","routeNamespace":"dashboard-setup-app","moduleBundleName":"dashboard-setup-app-module","sentry":{"DSN":"https://1e5a50946dd244e49c1e24eb26dd4ece@sentry.wixpress.com/1164","id":"1e5a50946dd244e49c1e24eb26dd4ece","projectName":"dashboard-setup-app-2","teamName":"os-dashboard"},"translations":{"enabled":false,"suspense":true},"experiments":{"scopes":["dashboard-setup","business-manager","bm-apps-0750d046-d599-4cfc-9f6b-e9f4af169aa9"]},"topology":{"dashboardSetupTranslations":{"artifactId":"com.wixpress.dashboard-setup.dashboard-setup-translations"},"staticsUrl":{"artifactId":"com.wixpress.dashboard-setup.dashboard-setup-app"}},"bi":"@wix/bi-logger-setup-widget-new-dashboard","components":[{"componentId":"setup-widget","componentName":"DASHBOARD_SETUP_APP.components.dashboard-widget","hostContainerId":"business-dashboard-host","requiredPermission":"DUMMY_PERMISSION.TO_TRICK_THE_SYSTEM","sentryDsn":"https://1e5a50946dd244e49c1e24eb26dd4ece@sentry.wixpress.com/1164"}]}} as ModuleLite,
    resolveComponentFlowAPI(flowAPIDeps),
  );