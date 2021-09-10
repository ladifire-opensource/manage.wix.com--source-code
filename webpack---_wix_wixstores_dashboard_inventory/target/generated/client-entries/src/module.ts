
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"wixstores-dashboard-inventory","config":{"appDefinitionId":"1380b703-ce81-ff05-f115-39571d94dfcd","moduleId":"wixstores-dashboard-inventory","moduleConfigurationId":"STORES","routeNamespace":"store/inventory","translations":{"enabled":true},"experiments":{"scopes":["wixstores"]},"sentry":{"DSN":"https://0ec5f48292f941bea02fcfd039c7e71d@o37417.ingest.sentry.io/5559224","id":"a23ed8846b1648f08e2bb7ba3e08ede2","projectName":"wixstores-dashboard-inventory","teamName":"wixstores"},"topology":{"inventoryStaticUrl":{"artifactId":"com.wixpress.wixstores-dashboard-inventory"}},"bi":"@wix/bi-logger-ec-sm","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/8b162047bf0c2a73/packages/wixstores-dashboard-inventory/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"wixstores-dashboard-inventory.pages.index","componentType":"page","componentName":"wixstores-dashboard-inventory.pages.index-v2-cairo","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "wixstores-dashboard-inventory.pages.index-v2-cairo" */ './pages/v2-cairo/index.wrapper')).default,
    resolveHook: require('/home/builduser/work/8b162047bf0c2a73/packages/wixstores-dashboard-inventory/src/pages/v2-cairo/index.module').resolve,
    filesHook: require('/home/builduser/work/8b162047bf0c2a73/packages/wixstores-dashboard-inventory/src/pages/v2-cairo/index.module').files,
  },
  ],
  exportedComponents: [
    
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/8b162047bf0c2a73/packages/wixstores-dashboard-inventory/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});