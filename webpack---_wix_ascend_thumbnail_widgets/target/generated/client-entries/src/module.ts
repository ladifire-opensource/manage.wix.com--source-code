
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"ASCEND_THUMBNAIL_WIDGETS","config":{"moduleId":"ASCEND_THUMBNAIL_WIDGETS","isCoreService":true,"routeNamespace":"ascend-thumbnail-widgets","bi":"@wix/bi-logger-wix-promote","translations":{"enabled":true},"sentry":{"DSN":"https://ed74c5c1d2434c9995be056ac9f7ffd6@sentry.wixpress.com/1868","id":"ed74c5c1d2434c9995be056ac9f7ffd6","projectName":"ascend-thumbnail-widgets","teamName":"ascend"},"experiments":{"scopes":["ascend","promote-home"]},"enabledByExperiments":[],"appDefinitionId":"8c89cfb2-254a-43c8-aa80-9844063137f0","moduleBundleName":"module"},"fedopsPath":"/home/builduser/agent00/work/7af2a8fe203c3666/ascend-widgets/packages/ascend-thumbnail-widgets/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"ascend-email-marketing-template-list","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-email-marketing-template-list" */ './exported-components/EmailTemplateList.wrapper')).default,
    resolveHook: require('/home/builduser/agent00/work/7af2a8fe203c3666/ascend-widgets/packages/ascend-thumbnail-widgets/src/exported-components/EmailTemplateList.module').resolve,
    filesHook: require('/home/builduser/agent00/work/7af2a8fe203c3666/ascend-widgets/packages/ascend-thumbnail-widgets/src/exported-components/EmailTemplateList.module').files,
  },

  {
    component: {"componentId":"ascend-social-post-template-list","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-social-post-template-list" */ './exported-components/SocialPostTemplateList.wrapper')).default,
    resolveHook: require('/home/builduser/agent00/work/7af2a8fe203c3666/ascend-widgets/packages/ascend-thumbnail-widgets/src/exported-components/SocialPostTemplateList.module').resolve,
    filesHook: require('/home/builduser/agent00/work/7af2a8fe203c3666/ascend-widgets/packages/ascend-thumbnail-widgets/src/exported-components/SocialPostTemplateList.module').files,
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/agent00/work/7af2a8fe203c3666/ascend-widgets/packages/ascend-thumbnail-widgets/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});