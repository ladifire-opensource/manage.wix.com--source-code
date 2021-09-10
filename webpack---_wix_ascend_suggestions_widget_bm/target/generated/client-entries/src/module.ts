
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"ASCEND_SUGGESTIONS_WIDGET","config":{"moduleId":"ASCEND_SUGGESTIONS_WIDGET","isCoreService":true,"routeNamespace":"ascend-suggestions-widget","bi":"@wix/bi-logger-wix-promote","translations":{"enabled":true},"sentry":{"DSN":"https://cd0963eaa6e04fcfb723a55efed042bc@sentry.wixpress.com/1928","id":"cd0963eaa6e04fcfb723a55efed042bc","projectName":"ascend-suggestions-widget","teamName":"ascend"},"experiments":{"scopes":["ascend","promote-home"]},"enabledByExperiments":["specs.ascend.AscendSuggestionsWidgetBM"],"appDefinitionId":"f3a950ea-8d89-4883-8b91-bf182a7bfe46","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/6ecb126920426f70/packages/ascend-suggestions-widget/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"ascend-suggestions-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-suggestions-widget" */ './exported-components/AscendSuggestionsWidget.wrapper')).default,
    
    
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/6ecb126920426f70/packages/ascend-suggestions-widget/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});