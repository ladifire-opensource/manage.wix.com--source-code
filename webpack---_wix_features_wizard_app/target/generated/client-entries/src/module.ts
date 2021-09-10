
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"FEATURES_WIZARD_APP","config":{"moduleId":"FEATURES_WIZARD_APP","isCoreService":true,"routeNamespace":"features-wizard-app","translations":{"enabled":false},"sentry":{"DSN":"https://cb5e4e2ec2b44927b5090bce45766efc@sentry.wixpress.com/967","id":"cb5e4e2ec2b44927b5090bce45766efc","projectName":"features-wizard-app","teamName":"os-dashboard"},"topology":{"featuresWizardTranslations":{"artifactId":"com.wixpress.features-wizard.features-wizard-translations"}},"bi":"@wix/bi-logger-features-wizard","appDefinitionId":"dee319be-791e-4578-8ed8-55e57498851e","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/55df8c26883141d8/packages/features-wizard-app/fedops.json","maybeTranslationsModel":null} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"features-wizard-app.components.features-wizard","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "features-wizard-app.components.features-wizard" */ './exported-components/features-wizard.wrapper')).default,
    resolveHook: require('/home/builduser/work/55df8c26883141d8/packages/features-wizard-app/src/exported-components/features-wizard.module').resolve,
    filesHook: require('/home/builduser/work/55df8c26883141d8/packages/features-wizard-app/src/exported-components/features-wizard.module').files,
  },

  {
    component: {"componentId":"features-wizard-app.components.site-type","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "features-wizard-app.components.site-type" */ './exported-components/site-type.wrapper')).default,
    resolveHook: require('/home/builduser/work/55df8c26883141d8/packages/features-wizard-app/src/exported-components/site-type.module').resolve,
    filesHook: require('/home/builduser/work/55df8c26883141d8/packages/features-wizard-app/src/exported-components/site-type.module').files,
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/55df8c26883141d8/packages/features-wizard-app/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});