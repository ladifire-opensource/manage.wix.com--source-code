
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/agent00/work/5b4be2e9a0b3fa93/packages/projects/e-commerce/rtss-fitness-bm/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"RTSS_FITNESS_BM","config":{"moduleId":"RTSS_FITNESS_BM","routeNamespace":"rtss","appDefinitionId":"d18b055a-69cc-43af-b595-eb9cca4811c3","translations":{"enabled":true},"experiments":{"scopes":["rtss"]},"isCoreService":true,"sentry":{"DSN":"https://055297ad8979418aaf490516d365419d@sentry.wixpress.com/888","id":"055297ad8979418aaf490516d365419d","projectName":"rtss-fitness-bm-io","teamName":"devzai"},"moduleBundleName":"module"},"fedopsPath":"/home/builduser/agent00/work/5b4be2e9a0b3fa93/packages/projects/e-commerce/rtss-fitness-bm/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["de","en"]}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"rtss-fitness-bm.pages.index","componentType":"page","componentName":"rtss-fitness-bm.pages.index","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "rtss-fitness-bm.pages.index" */ './pages/index.wrapper')).default,
    
    
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