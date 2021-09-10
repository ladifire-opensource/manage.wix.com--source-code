
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"APP_MARKET_ETPA_CONTAINER","config":{"moduleId":"APP_MARKET_ETPA_CONTAINER","appDefinitionId":"31077522-9329-4244-91d1-97653a06ca46","isCoreService":true,"routeNamespace":"app","translations":{"enabled":true},"experiments":{"scopes":["app-market-editor"]},"sentry":{"DSN":"https://92b42786831544e58353aa6237ef0b22@sentry.wixpress.com/1128","id":"92b42786831544e58353aa6237ef0b22","teamName":"app-market","projectName":"etpa-container-v2"},"bi":"@wix/bi-logger-market","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/d13578142589527e/packages/etpa-container-v2/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["cs","da","de","en","es","fr","hi","id","it","ja","ko","nl","no","pl","pt","ru","sv","th","tr","uk","vi","zh"]}} as ModuleLite,
    initHook: require('/home/builduser/work/d13578142589527e/packages/etpa-container-v2/src/module').init,
    configHook: require('/home/builduser/work/d13578142589527e/packages/etpa-container-v2/src/module').config,
  },
  pages: [
    
  {
    component: {"componentId":"etpa-container-lazy-module","componentType":"page","componentName":"etpa-container-lazy-module","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "etpa-container-lazy-module" */ './pages/index.wrapper')).default,
    
    
  },
  ],
  exportedComponents: [
    
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/d13578142589527e/packages/etpa-container-v2/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});