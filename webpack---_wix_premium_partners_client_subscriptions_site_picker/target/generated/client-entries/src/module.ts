
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/work/536c80dd4e9caf9d/packages/client-subscriptions-site-picker/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_SITE_PICKER","config":{"moduleId":"PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_SITE_PICKER","appDefinitionId":"2fda7616-3481-47d8-8726-794d29071726","isCoreService":true,"routeNamespace":"premium-partners-client-subscriptions-site-picker","translations":{"enabled":true},"sentry":{"DSN":"https://b96ab5043eab43e6846987e3484328a8@sentry.wixpress.com/1666","id":"b96ab5043eab43e6846987e3484328a8","projectName":"client-subscriptions-site-pick","teamName":"premium"},"enabledByExperiments":["specs.crm.PartnersRecurringForm"],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/536c80dd4e9caf9d/packages/client-subscriptions-site-picker/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["cs","da","de","en","es","fr","hi","id","it","ja","ko","nl","no","pl","pt","ru","sv","th","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_SITE_PICKER.components.PremiumPartnersClientSubscriptionsSitePicker","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "PREMIUM_PARTNERS_CLIENT_SUBSCRIPTIONS_SITE_PICKER.components.PremiumPartnersClientSubscriptionsSitePicker" */ './exported-components/PremiumPartnersClientSubscriptionsSitePicker.wrapper')).default,
    
    
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