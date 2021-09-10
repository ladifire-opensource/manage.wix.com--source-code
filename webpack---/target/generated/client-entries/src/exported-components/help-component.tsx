import Component from '/home/builduser/agent00/work/2f49d6714a7d66fb/src/exported-components/help-component';
import { hot } from 'component-hot-loader';
import { wrapComponent } from 'yoshi-flow-bm-runtime';
import type { ResolveComponentFlowAPI, ModuleLite } from 'yoshi-flow-bm-runtime/common';

import flowAPIDeps from '../../flowAPIDeps';
const HotComponent = hot(module, Component);

export default (resolveComponentFlowAPI: ResolveComponentFlowAPI) =>
  wrapComponent(
    HotComponent,
    {"moduleId":"DASHBOARD_HELP_APP","config":{"moduleId":"DASHBOARD_HELP_APP","moduleBundleName":"dashboard-help-app.module","routeNamespace":"dashboard-help-app","translations":{"enabled":true,"suspense":true},"sentry":{"DSN":"https://b57847bb3ebd4a4bb9a8c67aae62e65d@sentry.wixpress.com/842","id":"b57847bb3ebd4a4bb9a8c67aae62e65d","projectName":"dashboard-help-app","teamName":"wos-1"},"bi":"@wix/bi-logger-dashboard-help-app","topology":{"staticsUrl":{"artifactId":"com.wixpress.dashboard-help-app"}}}} as ModuleLite,
    resolveComponentFlowAPI(flowAPIDeps),
  );