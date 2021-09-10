import Component from '/home/builduser/agent00/work/4573665fb3aaa36d/packages/dashboard-site-details-app/src/exported-components/dashboard-widget';
import { hot } from 'component-hot-loader';
import { wrapComponent } from 'yoshi-flow-bm-runtime';
import type { ResolveComponentFlowAPI, ModuleLite } from 'yoshi-flow-bm-runtime/common';

import flowAPIDeps from '../../flowAPIDeps';
const HotComponent = hot(module, Component);

export default (resolveComponentFlowAPI: ResolveComponentFlowAPI) =>
  wrapComponent(
    HotComponent,
    {"moduleId":"DASHBOARD_SITE_DETAILS_APP","config":{"routeNamespace":"dashboard-site-details-app","moduleId":"DASHBOARD_SITE_DETAILS_APP","translations":{"enabled":true,"suspense":true},"experiments":{"scopes":["dashboard-site-details","business-manager"]},"sentry":{"DSN":"https://0831315ba6dd41d6ae931a711ce8645f@sentry.wixpress.com/675","id":"0831315ba6dd41d6ae931a711ce8645f","projectName":"dashboard-site-details-app","teamName":"wos-1"},"bi":"@wix/bi-logger-site-details-dashboard","topology":{"staticsUrl":{"artifactId":"com.wixpress.dashboard-site-details-app"}},"moduleBundleName":"module"},"fedopsPath":"/home/builduser/agent00/work/4573665fb3aaa36d/packages/dashboard-site-details-app/fedops.json"} as ModuleLite,
    resolveComponentFlowAPI(flowAPIDeps),
  );