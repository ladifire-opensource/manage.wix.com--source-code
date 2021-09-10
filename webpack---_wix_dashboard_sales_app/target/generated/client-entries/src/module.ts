
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"DASHBOARD_SALES_APP","config":{"moduleId":"DASHBOARD_SALES_APP","moduleBundleName":"dashboard-sales-app.module","appDefinitionId":"f95c72b1-84de-48ec-a61b-d96d61315ffe","isCoreService":true,"routeNamespace":"dashboard-sales-app","translations":{"enabled":true},"experiments":{"centralized":true},"sentry":{"DSN":"https://d076c1ce10464ad195af334bbb208aef@sentry.wixpress.com/925","id":"d076c1ce10464ad195af334bbb208aef","projectName":"dashboard-sales-app","teamName":"os-dashboard"},"bi":"@wix/bi-logger-premium-banner"},"fedopsPath":"/home/builduser/agent00/work/335b618521905df3/packages/dashboard-sales-app/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["en"]}} as ModuleLite,
    initHook: require('/home/builduser/agent00/work/335b618521905df3/packages/dashboard-sales-app/src/module').init,
    configHook: require('/home/builduser/agent00/work/335b618521905df3/packages/dashboard-sales-app/src/module').config,
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"dashboard-partners","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "dashboard-partners" */ './exported-components/partners-component.wrapper')).default,
    
    
  },

  {
    component: {"componentId":"dashboard-sales-banner","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "dashboard-sales-banner" */ './exported-components/premium-banner.wrapper')).default,
    resolveHook: require('/home/builduser/agent00/work/335b618521905df3/packages/dashboard-sales-app/src/exported-components/premium-banner.module').resolve,
    filesHook: require('/home/builduser/agent00/work/335b618521905df3/packages/dashboard-sales-app/src/exported-components/premium-banner.module').files,
  },

  {
    component: {"componentId":"dashboard-sales","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "dashboard-sales" */ './exported-components/sales-component.wrapper')).default,
    
    
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/agent00/work/335b618521905df3/packages/dashboard-sales-app/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});