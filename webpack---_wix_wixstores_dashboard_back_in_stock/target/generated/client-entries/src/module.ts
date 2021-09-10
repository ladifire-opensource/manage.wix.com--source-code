
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"WIXSTORES_DASHBOARD_BACK_IN_STOCK","config":{"appDefinitionId":"1380b703-ce81-ff05-f115-39571d94dfcd","moduleId":"WIXSTORES_DASHBOARD_BACK_IN_STOCK","moduleConfigurationId":"STORES","isCoreService":true,"routeNamespace":"store/back-in-stock","translations":{"enabled":true},"sentry":{"DSN":"https://d477143618f247f0930fcf59fb9b5684@o37417.ingest.sentry.io/5623206","id":"d477143618f247f0930fcf59fb9b5684","projectName":"wixstores-dashboard-back-in-stock","teamName":"wixstores"},"experiments":{"scopes":["wixstores"]},"topology":{"backInStockStaticUrl":{"artifactId":"com.wixpress.wixstores-dashboard-back-in-stock"}},"enabledByExperiments":["specs.stores.BackInStockDashboard"],"bi":"@wix/bi-logger-ec-sm","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/8b162047bf0c2a73/packages/wixstores-dashboard-back-in-stock/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"WIXSTORES_DASHBOARD_BACK_IN_STOCK.pages.index","componentType":"page","componentName":"WIXSTORES_DASHBOARD_BACK_IN_STOCK.pages.index","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "WIXSTORES_DASHBOARD_BACK_IN_STOCK.pages.index" */ './pages/index.wrapper')).default,
    
    
  },
  ],
  exportedComponents: [
    
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/8b162047bf0c2a73/packages/wixstores-dashboard-back-in-stock/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});