
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"ASCEND_SEO_GMB_ANALYTICS_WIDGET","config":{"moduleId":"ASCEND_SEO_GMB_ANALYTICS_WIDGET","isCoreService":true,"routeNamespace":"ascend-seo-gmb-analytics-widget","bi":"@wix/bi-logger-wix-promote","translations":{"enabled":true},"sentry":{"DSN":"https://b38bc5cf9c4a4b05ad69e4d53c406efb@sentry.wixpress.com/1842","id":"b38bc5cf9c4a4b05ad69e4d53c406efb","projectName":"ascend-seo-gmb-analytics-widget","teamName":"ascend"},"experiments":{"scopes":["ascend","business-manager"]},"enabledByExperiments":[],"appDefinitionId":"da4f8128-9191-4706-9c94-35f493ad4a6e","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/6ecb126920426f70/packages/ascend-seo-gmb-analytics-widget/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["cs","da","de","en","es","fr","hi","it","ja","ko","nl","no","pl","pt","ru","sv","th","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"ascend-seo-gmb-analytics-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-seo-gmb-analytics-widget" */ './exported-components/SeoGmbAnalyticsWidget.wrapper')).default,
    
    
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/6ecb126920426f70/packages/ascend-seo-gmb-analytics-widget/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});