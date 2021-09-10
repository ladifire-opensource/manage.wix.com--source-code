
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/work/189599a6bfa34d79/comments-widget/comments-bm-widget/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"COMMENTS_BM_WIDGET","config":{"moduleId":"COMMENTS_BM_WIDGET","appDefinitionId":"d95709a3-ab2b-44ad-b5b6-7103ba0df9f8","isCoreService":true,"routeNamespace":"comments-bm-widget","translations":{"enabled":false},"sentry":{"DSN":"","id":"","projectName":"comments-bm-widget","teamName":"wix-comments"},"experiments":{"centralized":true},"enabledByExperiments":["specs.infra.yoshi-bm.ChangeMe"],"topology":{"translationsStaticsUrl":{"artifactId":"com.wixpress.comments-bm-translations"}},"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/189599a6bfa34d79/comments-widget/comments-bm-widget/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["de","en"]}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"comments-bm-widget.pages.index","componentType":"page","componentName":"comments-bm-widget.pages.index","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "comments-bm-widget.pages.index" */ './pages/index.wrapper')).default,
    
    
  },
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"comments-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "comments-widget" */ './exported-components/comments-widget.wrapper')).default,
    
    
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      


      return {
         createBILogger,
      };
    },
  },
});