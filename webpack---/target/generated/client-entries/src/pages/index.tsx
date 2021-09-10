import Component from '/home/builduser/work/dd1a7eca76032f02/packages/business-dashboard-app/src/pages/index';
import { hot } from 'component-hot-loader';
import { wrapComponent } from 'yoshi-flow-bm-runtime';
import type { ResolveComponentFlowAPI, ModuleLite } from 'yoshi-flow-bm-runtime/common';

import flowAPIDeps from '../../flowAPIDeps';
const HotComponent = hot(module, Component);

export default (resolveComponentFlowAPI: ResolveComponentFlowAPI) =>
  wrapComponent(
    HotComponent,
    {"moduleId":"HOME","config":{"routeNamespace":"home","moduleId":"HOME","appDefId":"a7597ab5-1ed4-458f-a5c1-5884d5e14281","isCoreService":true,"moduleBundleName":"business-dashboard-module","translations":{"enabled":true,"suspense":true},"experiments":{"scopes":["business-dashboard","bm-apps-a7597ab5-1ed4-458f-a5c1-5884d5e14281"]},"sentry":{"DSN":"https://710d8d656919469c957b13640fdd3239@sentry.wixpress.com/591","id":"710d8d656919469c957b13640fdd3239","projectName":"business-dashboard-app","teamName":"wos-1"},"topology":{"businessDashboardWidgetsPanelTranslations":{"artifactId":"com.wixpress.business-dashboard-widgets-panel-translations"},"staticsUrl":{"artifactId":"com.wixpress.business-dashboard-app"}},"bi":"@wix/bi-logger-new-dash-platform","fedops":{"phasesConfig":"SEND_START_AND_FINISH"},"cdn":{"port":3202}},"fedopsPath":"/home/builduser/work/dd1a7eca76032f02/packages/business-dashboard-app/fedops.json"} as ModuleLite,
    resolveComponentFlowAPI(flowAPIDeps),
  );