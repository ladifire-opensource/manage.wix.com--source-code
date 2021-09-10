
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/agent00/work/e359c8e4718e8af7/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"WAIVER_APP_INSTALLER","config":{"moduleId":"WAIVER_APP_INSTALLER","moduleConfigurationId":"WAIVER_APP_INSTALLER","appDefinitionId":"fd8664de-f48e-450d-ba14-c2fec494d9c1","isCoreService":true,"routeNamespace":"waiver-app-installer","translations":{"enabled":true},"sentry":{"DSN":"https://05fa80201b4a42e58cfb879d161a35e2@sentry.wixpress.com/1729","id":"05fa80201b4a42e58cfb879d161a35e2","projectName":"waiver-app-installer","teamName":"forms"},"experiments":{"scopes":["business-manager"]},"enabledByExperiments":["specs.crm.EnableWaiverClientApp","specs.crm.FormsBizBookingsIntegration"],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/agent00/work/e359c8e4718e8af7/fedops.json","maybeTranslationsModel":{"assets":{"localeDir":"/home/builduser/agent00/work/e359c8e4718e8af7/src/assets/locale","localeDistPath":"assets/locale"},"availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"],"messagesEnFile":"messages_en.json"}} as ModuleLite,
    initHook: require('/home/builduser/agent00/work/e359c8e4718e8af7/src/module').init,
    configHook: require('/home/builduser/agent00/work/e359c8e4718e8af7/src/module').config,
  },
  pages: [
    
  {
    component: {"componentId":"WAIVER_APP_INSTALLER.pages.index","componentType":"page","componentName":"WAIVER_APP_INSTALLER.pages.index","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "WAIVER_APP_INSTALLER.pages.index" */ './pages/index.wrapper')).default,
    
    
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