
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"ASCEND_TASKS_WIDGET","config":{"moduleId":"ASCEND_TASKS_WIDGET","isCoreService":true,"routeNamespace":"ascend-tasks-widget","bi":"@wix/bi-logger-tasks-widget","translations":{"enabled":true},"sentry":{"DSN":"https://845c843b185d4c0388a6601ceff9c993@sentry.wixpress.com/1837","id":"845c843b185d4c0388a6601ceff9c993","projectName":"ascend-tasks-widget","teamName":"ascend"},"experiments":{"scopes":["ascend"]},"enabledByExperiments":[],"appDefinitionId":"1fea22cd-24e7-4ca7-84dd-06b470830a3c","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/6ecb126920426f70/packages/ascend-tasks-widget/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    initHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-tasks-widget/src/module').init,
    configHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-tasks-widget/src/module').config,
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"ascend-tasks-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-tasks-widget" */ './exported-components/TasksWidget.wrapper')).default,
    resolveHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-tasks-widget/src/exported-components/TasksWidget.module').resolve,
    filesHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-tasks-widget/src/exported-components/TasksWidget.module').files,
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/6ecb126920426f70/packages/ascend-tasks-widget/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});