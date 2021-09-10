
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"ASCEND_CALENDAR_WIDGET","config":{"moduleId":"ASCEND_CALENDAR_WIDGET","isCoreService":true,"routeNamespace":"ascend-calendar-widget","bi":"@wix/bi-logger-wix-promote","translations":{"enabled":true},"sentry":{"DSN":"https://c9b97f11206b49fd8d034420da233943@sentry.wixpress.com/1839","id":"c9b97f11206b49fd8d034420da233943","projectName":"ascend-calendar-widget","teamName":"ascend"},"experiments":{"scopes":["ascend"]},"enabledByExperiments":[],"appDefinitionId":"40e0c298-8bcc-4bcf-aafa-88b139075da6","moduleBundleName":"module"},"fedopsPath":"/home/builduser/agent00/work/643699d732e5b0ab/ascend-calendar-widget/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["cs","da","de","en","es","fr","hi","it","ja","ko","nl","no","pl","pt","ru","sv","th","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"ascend-calendar-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-calendar-widget" */ './exported-components/AscendCalendarWidget.wrapper')).default,
    resolveHook: require('/home/builduser/agent00/work/643699d732e5b0ab/ascend-calendar-widget/src/exported-components/AscendCalendarWidget.module').resolve,
    filesHook: require('/home/builduser/agent00/work/643699d732e5b0ab/ascend-calendar-widget/src/exported-components/AscendCalendarWidget.module').files,
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/agent00/work/643699d732e5b0ab/ascend-calendar-widget/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});