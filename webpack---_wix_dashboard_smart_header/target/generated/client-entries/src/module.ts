
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/work/dd1a7eca76032f02/packages/dashboard-smart-header/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"DASHBOARD_SMART_HEADER","config":{"moduleId":"DASHBOARD_SMART_HEADER","appDefinitionId":"17b9c4d6-7faf-48f8-b415-907bd922a8f4","isCoreService":true,"routeNamespace":"dashboard-smart-header","translations":{"enabled":true},"sentry":{"DSN":"https://1d80833287464e5486f56c1a17bae678@sentry.wixpress.com/1889","id":"1d80833287464e5486f56c1a17bae678","projectName":"dashboard-smart-header","teamName":"os-dashboard"},"experiments":{"scopes":["bm-apps-17b9c4d6-7faf-48f8-b415-907bd922a8f4"]},"enabledByExperiments":["specs.wos1.dashboard-smart-header"],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/dd1a7eca76032f02/packages/dashboard-smart-header/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["de","en"]}} as ModuleLite,
    initHook: require('/home/builduser/work/dd1a7eca76032f02/packages/dashboard-smart-header/src/module').init,
    configHook: require('/home/builduser/work/dd1a7eca76032f02/packages/dashboard-smart-header/src/module').config,
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"dashboard-smart-header","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "dashboard-smart-header" */ './exported-components/dashboard-smart-header/dashboard-smart-header.wrapper')).default,
    resolveHook: require('/home/builduser/work/dd1a7eca76032f02/packages/dashboard-smart-header/src/exported-components/dashboard-smart-header/dashboard-smart-header.module').resolve,
    filesHook: require('/home/builduser/work/dd1a7eca76032f02/packages/dashboard-smart-header/src/exported-components/dashboard-smart-header/dashboard-smart-header.module').files,
  },
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