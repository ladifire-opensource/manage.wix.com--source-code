
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"DASHBOARD_SUGGESTIONS","config":{"moduleId":"DASHBOARD_SUGGESTIONS","moduleBundleName":"dashboard-suggestions-app","isCoreService":true,"routeNamespace":"home/suggestions","experiments":{"centralized":true},"translations":{"enabled":false},"sentry":{"DSN":"https://475df0c4448e4cfc817ee56cf2572ed6@sentry.wixpress.com/662","id":"475df0c4448e4cfc817ee56cf2572ed6","projectName":"dashboard-suggestions-app","teamName":"wos-1","errorMonitor":true},"topology":{"dashboardSuggestionsTranslations":{"artifactId":"com.wixpress.dashboard-suggestions.dashboard-suggestions-translations"}},"bi":"@wix/bi-logger-suggestions-widget","appDefinitionId":"cead4297-02ee-4c0f-ae07-461f4ba71b3b"},"fedopsPath":"/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["en"]}} as ModuleLite,
    initHook: require('/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/src/module').init,
    configHook: require('/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/src/module').config,
  },
  pages: [
    
  {
    component: {"componentId":"DASHBOARD_SUGGESTIONS.pages.index","componentType":"page","componentName":"DASHBOARD_SUGGESTIONS.pages.index","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "DASHBOARD_SUGGESTIONS.pages.index" */ './pages/index.wrapper')).default,
    resolveHook: require('/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/src/pages/index.module').resolve,
    filesHook: require('/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/src/pages/index.module').files,
  },
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"DASHBOARD_SUGGESTIONS.components.section-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "DASHBOARD_SUGGESTIONS.components.section-widget" */ './exported-components/section-widget.wrapper')).default,
    resolveHook: require('/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/src/exported-components/section-widget.module').resolve,
    filesHook: require('/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/src/exported-components/section-widget.module').files,
  },

  {
    component: {"componentId":"DASHBOARD_SUGGESTIONS.components.top-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "DASHBOARD_SUGGESTIONS.components.top-widget" */ './exported-components/top-widget.wrapper')).default,
    resolveHook: require('/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/src/exported-components/top-widget.module').resolve,
    filesHook: require('/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/src/exported-components/top-widget.module').files,
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});