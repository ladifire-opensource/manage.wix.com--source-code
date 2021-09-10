
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"ASCEND_CONTACTS_WIDGET","config":{"moduleId":"ASCEND_CONTACTS_WIDGET","isCoreService":true,"routeNamespace":"ascend-contacts-widget","bi":"@wix/bi-logger-contacts-widget","translations":{"enabled":true},"sentry":{"DSN":"https://7afe789cf3894f148d69550d93c5da43@sentry.wixpress.com/1840","id":"7afe789cf3894f148d69550d93c5da43","projectName":"ascend-contacts-widget","teamName":"ascend"},"experiments":{"scopes":["ascend"]},"enabledByExperiments":[],"appDefinitionId":"3146d086-f9a8-4708-ad63-7b154cbd320f","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/6ecb126920426f70/packages/ascend-contacts-widget/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    initHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-contacts-widget/src/module').init,
    configHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-contacts-widget/src/module').config,
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"ascend-contacts-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-contacts-widget" */ './exported-components/AscendContactsWidget.wrapper')).default,
    resolveHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-contacts-widget/src/exported-components/AscendContactsWidget.module').resolve,
    filesHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-contacts-widget/src/exported-components/AscendContactsWidget.module').files,
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/6ecb126920426f70/packages/ascend-contacts-widget/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});