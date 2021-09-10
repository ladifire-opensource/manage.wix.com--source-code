
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/work/d4fa73d22be6bbeb/packages/my-mailboxes-site-level/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"PREMIUM_SITE_MY_MAILBOXES","config":{"moduleId":"PREMIUM_SITE_MY_MAILBOXES","appDefinitionId":"85473b72-5af2-495b-8d4e-525fde798f54","isCoreService":true,"routeNamespace":"my-mailboxes-site-level","translations":{"enabled":true},"sentry":{"DSN":"https://9fa35860d79b4c139daaeca75d94df8f@sentry.wixpress.com/1718","id":"9fa35860d79b4c139daaeca75d94df8f","projectName":"my-mailboxes-site-level","teamName":"my-mailboxes-site-level"},"experiments":{"scopes":["business-manager","premium-mailboxes","premium-ng"]},"enabledByExperiments":["specs.wos.EnableSiteMailboxesFromPremiumMailboxesRepo"],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/d4fa73d22be6bbeb/packages/my-mailboxes-site-level/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["cs","da","de","en","es","fr","hi","id","it","ja","ko","nl","no","pl","pt","ru","sv","th","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"MY_MAILBOXES_SITE_LEVEL.pages.index","componentType":"page","componentName":"MY_MAILBOXES_SITE_LEVEL.pages.index","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "MY_MAILBOXES_SITE_LEVEL.pages.index" */ './pages/index.wrapper')).default,
    resolveHook: require('/home/builduser/work/d4fa73d22be6bbeb/packages/my-mailboxes-site-level/src/pages/index.module').resolve,
    filesHook: require('/home/builduser/work/d4fa73d22be6bbeb/packages/my-mailboxes-site-level/src/pages/index.module').files,
  },

  {
    component: {"componentId":"MY_MAILBOXES_SITE_LEVEL.pages.connect-domain","componentType":"page","componentName":"MY_MAILBOXES_SITE_LEVEL.pages.connect-domain","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "MY_MAILBOXES_SITE_LEVEL.pages.connect-domain" */ './pages/connect-domain.wrapper')).default,
    
    
  },
  ],
  exportedComponents: [
    
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