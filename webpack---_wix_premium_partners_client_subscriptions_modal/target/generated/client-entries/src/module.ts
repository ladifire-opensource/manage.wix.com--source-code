
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/work/536c80dd4e9caf9d/packages/client-subscriptions-modal/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_MODAL","config":{"moduleId":"PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_MODAL","appDefinitionId":"d5313865-bc01-474e-b46f-31fb08241277","isCoreService":true,"routeNamespace":"premium-partners-client-subscriptions-modal","translations":{"enabled":true},"sentry":{"DSN":"https://d4e9639cf2094c1aa2860b908acad9d0@sentry.wixpress.com/1632","id":"d4e9639cf2094c1aa2860b908acad9d0","projectName":"premium-partners-client-subscr","teamName":"premium"},"enabledByExperiments":["specs.crm.PartnersRecurringForm"],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/536c80dd4e9caf9d/packages/client-subscriptions-modal/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["cs","da","de","en","es","fr","hi","id","it","ja","ko","nl","no","pl","pt","ru","sv","th","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"premium-partners-client-subscriptions-modal.components.ClientSubscriptionPlansModal","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "premium-partners-client-subscriptions-modal.components.ClientSubscriptionPlansModal" */ './exported-components/ClientSubscriptionPlansModal.wrapper')).default,
    
    
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