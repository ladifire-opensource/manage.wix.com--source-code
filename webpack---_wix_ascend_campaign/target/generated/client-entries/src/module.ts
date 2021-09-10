
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/work/f5461a79398895eb/packages/ascend-campaign/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"ASCEND_CAMPAIGN","config":{"moduleId":"ASCEND_CAMPAIGN","appDefinitionId":"3a5c74c5-a21f-410b-9e04-f1309ef2f5a3","isCoreService":true,"routeNamespace":"campaigns","translations":{"enabled":true},"sentry":{"DSN":"https://4bcbb886fc1a4082a8a071438854c144@sentry.wixpress.com/2139","id":"4bcbb886fc1a4082a8a071438854c144","projectName":"ascend-campaign","teamName":"ascend"},"experiments":{"centralized":true},"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/f5461a79398895eb/packages/ascend-campaign/fedops.json","maybeTranslationsModel":{"assets":{"localeDir":"/home/builduser/work/f5461a79398895eb/packages/ascend-campaign/src/assets/locale","localeDistPath":"assets/locale"},"availableLocales":["de","en"],"messagesEnFile":"messages_en.json"}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"campaigns.pages.index","componentType":"page","componentName":"campaigns.pages.index","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "campaigns.pages.index" */ './pages/index.wrapper')).default,
    resolveHook: require('/home/builduser/work/f5461a79398895eb/packages/ascend-campaign/src/pages/index.module').resolve,
    filesHook: require('/home/builduser/work/f5461a79398895eb/packages/ascend-campaign/src/pages/index.module').files,
  },

  {
    component: {"componentId":"campaigns.pages.campaign-page","componentType":"page","componentName":"campaigns.pages.campaign-page","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "campaigns.pages.campaign-page" */ './pages/campaign-page.wrapper')).default,
    resolveHook: require('/home/builduser/work/f5461a79398895eb/packages/ascend-campaign/src/pages/campaign-page.module').resolve,
    filesHook: require('/home/builduser/work/f5461a79398895eb/packages/ascend-campaign/src/pages/campaign-page.module').files,
  },
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