
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"DASHBOARD_WELCOME_VIDEO","config":{"moduleId":"DASHBOARD_WELCOME_VIDEO","appDefinitionId":"30d36509-512b-49b7-b935-1a6f33ab1ffa","isCoreService":true,"routeNamespace":"dashboard-welcome-video","topology":{"dashboardWelcomeVideo":{"artifactId":"com.wixpress.dashboard-welcome-video"}},"translations":{"enabled":true},"sentry":{"DSN":"https://0e640ab9567e47a1bace21a19c392868@sentry.wixpress.com/1613","id":"0e640ab9567e47a1bace21a19c392868","projectName":"dashboard-welcome-video","teamName":"os-dashboard"},"bi":"@wix/bi-logger-dashboard-welcome-video","experiments":{"centralized":true},"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/fdd06fbce74ab8a8/packages/dashboard-welcome-video/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    initHook: require('/home/builduser/work/fdd06fbce74ab8a8/packages/dashboard-welcome-video/src/module').init,
    configHook: require('/home/builduser/work/fdd06fbce74ab8a8/packages/dashboard-welcome-video/src/module').config,
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"dashboard-welcome-video","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "dashboard-welcome-video" */ './exported-components/dashboard-welcome-video.wrapper')).default,
    resolveHook: require('/home/builduser/work/fdd06fbce74ab8a8/packages/dashboard-welcome-video/src/exported-components/dashboard-welcome-video.module').resolve,
    filesHook: require('/home/builduser/work/fdd06fbce74ab8a8/packages/dashboard-welcome-video/src/exported-components/dashboard-welcome-video.module').files,
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/fdd06fbce74ab8a8/packages/dashboard-welcome-video/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});