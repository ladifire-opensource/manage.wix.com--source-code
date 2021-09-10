
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/work/4770e53615d6b80a/packages/website-channel-app/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"WEBSITE_CHANNEL","config":{"moduleId":"WEBSITE_CHANNEL","appDefinitionId":"36cafb61-2a71-4331-9c69-681b55f88430","isCoreService":true,"routeNamespace":"website-channel","translations":{"enabled":true},"sentry":{"DSN":"https://ce45092b6e3946ffbfa168cbc2ae0836@sentry.wixpress.com/1957","id":"ce45092b6e3946ffbfa168cbc2ae0836","projectName":"website-channel","teamName":"os-dashboard","errorMonitor":true},"experiments":{"centralized":true},"enabledByExperiments":["specs.wos1.ChannelsWebsite"],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/4770e53615d6b80a/packages/website-channel-app/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"website-channel-page","componentType":"page","componentName":"website-channel-page","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "website-channel-page" */ './pages/index.wrapper')).default,
    resolveHook: require('/home/builduser/work/4770e53615d6b80a/packages/website-channel-app/src/pages/index.module').resolve,
    filesHook: require('/home/builduser/work/4770e53615d6b80a/packages/website-channel-app/src/pages/index.module').files,
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