
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/agent00/work/5c7dc64f43dc2c33/privacy-center/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"PRIVACY_CENTER","config":{"moduleId":"PRIVACY_CENTER","moduleConfigurationId":"COOKIE_CONSENT_SETTINGS_APP","appDefinitionId":"b62fa321-f61f-492d-a4f3-fa2681538ac0","isCoreService":true,"routeNamespace":"privacy-center","translations":{"enabled":true},"sentry":{"DSN":"https://8bbe76f7b89f40a3961e5a1509a40a5d@sentry.wixpress.com/1631","id":"8bbe76f7b89f40a3961e5a1509a40a5d","projectName":"privacy-center","teamName":"ig"},"experiments":{"scopes":["privacy-center"]},"enabledByExperiments":["specs.cookieConsent.privacyCenterBMFlow"],"config":{"topology":{"staticsUrl":{"artifactId":"com.wixpress.privacy-center"},"translationsStaticsUrl":{"artifactId":"com.wixpress.cookie-consent-settings-app-translations"}}},"bundles":[{"file":{"artifactId":"com.wixpress.privacy-center","path":"module.bundle.min.js"},"debugFile":{"artifactId":"com.wixpress.privacy-center","path":"module.bundle.js"}}],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/agent00/work/5c7dc64f43dc2c33/privacy-center/fedops.json","maybeTranslationsModel":{"localeDistPath":"assets/locale","availableLocales":["zz"]}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"cookie-consent-settings-app","componentType":"page","componentName":"privacy-center","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "privacy-center" */ './pages/index.wrapper')).default,
    resolveHook: require('/home/builduser/agent00/work/5c7dc64f43dc2c33/privacy-center/src/pages/index.module').resolve,
    filesHook: require('/home/builduser/agent00/work/5c7dc64f43dc2c33/privacy-center/src/pages/index.module').files,
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