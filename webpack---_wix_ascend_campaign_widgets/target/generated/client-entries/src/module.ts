
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"ASCEND_CAMPAIGN_WIDGETS","config":{"moduleId":"ASCEND_CAMPAIGN_WIDGETS","isCoreService":true,"routeNamespace":"ascend-campaign-widgets","bi":"@wix/bi-logger-promote-component","translations":{"enabled":true},"sentry":{"DSN":"https://ef16ae70681946f8b5dfa1d73d2f9218@sentry.wixpress.com/1330","id":"ef16ae70681946f8b5dfa1d73d2f9218","projectName":"ascend-campaign-widgets","teamName":"ascend"},"experiments":{"scopes":["ascend","promote-home"]},"enabledByExperiments":[],"appDefinitionId":"7769915d-0447-48b9-abc6-3460f37c63ae","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    initHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/src/module').init,
    configHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/src/module').config,
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"ascend-email-marketing-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-email-marketing-widget" */ './exported-components/EmailMarketingWidget.wrapper')).default,
    resolveHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/src/exported-components/EmailMarketingWidget.module').resolve,
    filesHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/src/exported-components/EmailMarketingWidget.module').files,
  },

  {
    component: {"componentId":"ascend-extended-email-marketing-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-extended-email-marketing-widget" */ './exported-components/ExtendedEmailMarketingWidget.wrapper')).default,
    resolveHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/src/exported-components/ExtendedEmailMarketingWidget.module').resolve,
    filesHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/src/exported-components/ExtendedEmailMarketingWidget.module').files,
  },

  {
    component: {"componentId":"ascend-extended-fb-marketing-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-extended-fb-marketing-widget" */ './exported-components/ExtendedFBMarketingWidget.wrapper')).default,
    resolveHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/src/exported-components/ExtendedFBMarketingWidget.module').resolve,
    filesHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/src/exported-components/ExtendedFBMarketingWidget.module').files,
  },

  {
    component: {"componentId":"ascend-fb-marketing-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-fb-marketing-widget" */ './exported-components/FBMarketingWidget.wrapper')).default,
    resolveHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/src/exported-components/FBMarketingWidget.module').resolve,
    filesHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/src/exported-components/FBMarketingWidget.module').files,
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/6ecb126920426f70/packages/ascend-campaign-widgets/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});