
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/work/536c80dd4e9caf9d/packages/premium-partners-client-subscriptions-crm-adapter/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_CRM_ADAPTER","config":{"moduleId":"PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_CRM_ADAPTER","appDefinitionId":"8eb38b13-5884-47a1-8e6c-a8d6a4c9bb0d","isCoreService":true,"routeNamespace":"premium-partners-client-subscriptions-crm-adapter","translations":{"enabled":true},"sentry":{"DSN":"https://cebfaaf3e5b74970b39b0aed9bc454d4@sentry.wixpress.com/1901","id":"cebfaaf3e5b74970b39b0aed9bc454d4","projectName":"premium-partners-client-subscriptions-crm-adapter","teamName":"premium"},"enabledByExperiments":["specs.crm.PartnersRecurringForm"],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/536c80dd4e9caf9d/packages/premium-partners-client-subscriptions-crm-adapter/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["cs","da","de","en","es","fr","hi","id","it","ja","ko","nl","no","pl","pt","ru","sv","th","tr","uk","vi","zh"]}} as ModuleLite,
    initHook: require('/home/builduser/work/536c80dd4e9caf9d/packages/premium-partners-client-subscriptions-crm-adapter/src/module').init,
    configHook: require('/home/builduser/work/536c80dd4e9caf9d/packages/premium-partners-client-subscriptions-crm-adapter/src/module').config,
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_CRM_ADAPTER.components.premium-partners-client-subscriptions-crm-adapter-title-input","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_CRM_ADAPTER.components.premium-partners-client-subscriptions-crm-adapter-title-input" */ './exported-components/LineInput.wrapper')).default,
    
    
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