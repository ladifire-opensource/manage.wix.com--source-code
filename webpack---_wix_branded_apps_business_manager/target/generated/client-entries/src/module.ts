
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/work/e06a8b1346f5fefc/packages/client/branded-apps-business-manager/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"BRANDED_APPS","config":{"moduleId":"BRANDED_APPS","isCoreService":true,"routeNamespace":"branded-apps","enabledByExperiments":["specs.brandedapps.EnableBMDashboard"],"translations":{"enabled":true},"sentry":{"DSN":"https://cdb5884f40e348c68b1ad86f4dc5e637@sentry.wixpress.com/1489","id":"cdb5884f40e348c68b1ad86f4dc5e637","projectName":"dashboard","teamName":"branded-apps"},"experiments":{"scopes":["branded-apps","brandedapps"]},"appDefinitionId":"eec3496e-44a8-45ac-9581-868a67345be8","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/e06a8b1346f5fefc/packages/client/branded-apps-business-manager/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","nl","no","pl","pt","ru","sv","th","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"BRANDED_APPS.pages.index","componentType":"page","componentName":"BRANDED_APPS.pages.index","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "BRANDED_APPS.pages.index" */ './pages/index.wrapper')).default,
    
    
  },

  {
    component: {"componentId":"BRANDED_APPS.pages.welcome","componentType":"page","componentName":"BRANDED_APPS.pages.welcome","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "BRANDED_APPS.pages.welcome" */ './pages/welcome.wrapper')).default,
    
    
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