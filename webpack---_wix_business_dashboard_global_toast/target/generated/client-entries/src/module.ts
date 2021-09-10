
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/agent00/work/45e08ec04c627a74/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"DASHBOARD_GLOBAL_TOASTS","config":{"routeNamespace":"business-dashboard-global-toast","moduleBundleName":"global-toast-module","moduleId":"DASHBOARD_GLOBAL_TOASTS","isCoreService":true,"translations":{"enabled":false},"sentry":{"DSN":"https://d7ab7f97387b44f68f08e7864bcb17e0@sentry.wixpress.com/742","id":"d7ab7f97387b44f68f08e7864bcb17e0","projectName":"business-dashboard-global-toast","teamName":"wos-1"},"appDefinitionId":"4f84aa8d-18b7-4578-8749-6598bbad4880"},"fedopsPath":"/home/builduser/agent00/work/45e08ec04c627a74/fedops.json","maybeTranslationsModel":null} as ModuleLite,
    initHook: require('/home/builduser/agent00/work/45e08ec04c627a74/src/module').init,
    configHook: require('/home/builduser/agent00/work/45e08ec04c627a74/src/module').config,
  },
  pages: [
    
  ],
  exportedComponents: [
    
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      


      return {
         createBILogger,
      };
    },
  },
});