
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"PROMOTE_MARKETING_TOOLS","config":{"moduleId":"PROMOTE_MARKETING_TOOLS","appDefinitionId":"f0cb4b3d-8bf9-471f-a7fb-755cdb3c2c63","routeNamespace":"promote-marketing-tools","isCoreService":true,"translations":{"enabled":true},"sentry":{"DSN":"https://ff785244f6e944e98522ee2c0b8b3a41@sentry.wixpress.com/1336","id":"ff785244f6e944e98522ee2c0b8b3a41","projectName":"promote-marketing-tools","teamName":"promote"},"experiments":{"scopes":["promote-marketing-tools"]},"bi":"@wix/bi-logger-promote-connect","enabledByExperiments":["specs.promote.promote-marketing-tools.bm-module"],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/agent00/work/d0e195c9c024b130/promote-marketing-tools/fedops.json","maybeTranslationsModel":{"assets":{"localeDir":"/home/builduser/agent00/work/d0e195c9c024b130/promote-marketing-tools/src/assets/locale","localeDistPath":"assets/locale"},"availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"],"messagesEnFile":"messages_en.json"}} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"promoter-modal","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "promoter-modal" */ './exported-components/promoter-modal.wrapper')).default,
    
    
  },
  ],
  methods: [
    
  {
    method: {"methodId":"promoteMarketingTools.getChannelsPermitted"},
    fn: () => require('/home/builduser/agent00/work/d0e195c9c024b130/promote-marketing-tools/src/methods/getChannelsPermitted').default,
  },

  {
    method: {"methodId":"promoteMarketingTools.getPromotionTemplates"},
    fn: () => require('/home/builduser/agent00/work/d0e195c9c024b130/promote-marketing-tools/src/methods/getPromotionTemplates').default,
  },

  {
    method: {"methodId":"promoteMarketingTools.getPublisherClient"},
    fn: () => require('/home/builduser/agent00/work/d0e195c9c024b130/promote-marketing-tools/src/methods/getPublisherClient').default,
  },

  {
    method: {"methodId":"promoteMarketingTools.openPromoterModal"},
    fn: () => require('/home/builduser/agent00/work/d0e195c9c024b130/promote-marketing-tools/src/methods/openPromoterModal').default,
  },

  {
    method: {"methodId":"promoteMarketingTools.promoteInChannel"},
    fn: () => require('/home/builduser/agent00/work/d0e195c9c024b130/promote-marketing-tools/src/methods/promoteInChannel').default,
  },
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/agent00/work/d0e195c9c024b130/promote-marketing-tools/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});