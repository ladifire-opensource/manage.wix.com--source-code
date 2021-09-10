
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"CONTACTS_VIEWS","config":{"moduleId":"CONTACTS_VIEWS","moduleConfigurationId":"CONTACTS","appDefinitionId":"74bff718-5977-47f2-9e5f-a9fd0047fd1f","isCoreService":true,"moduleBundleName":"contacts-views-module","translations":{"enabled":true},"sentry":{"DSN":"https://b1a48b8d51d74f35bd4647d5284be3e3@sentry.wixpress.com/392","id":"b1a48b8d51d74f35bd4647d5284be3e3","projectName":"contacts-views","teamName":"contacts","errorMonitor":true},"experiments":{"scopes":["my-account","crm-contacts","business-settings"]},"bi":"@wix/bi-logger-contacts","topology":{"contactsViewsStaticsUrl":{"artifactId":"com.wixpress.contacts.contacts-views"},"localeDatasetDataStaticsUrl":{"artifactId":"com.wixpress.locale-dataset-data"}},"routeNamespace":""},"fedopsPath":"/home/builduser/agent00/work/83a9b46b152c8242/packages/contacts-views/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh","zu"]}} as ModuleLite,
    initHook: require('/home/builduser/agent00/work/83a9b46b152c8242/packages/contacts-views/src/module').init,
    configHook: require('/home/builduser/agent00/work/83a9b46b152c8242/packages/contacts-views/src/module').config,
  },
  pages: [
    
  {
    component: {"componentId":"contact-full-page","componentType":"page","componentName":"contact-full-page","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "contact-full-page" */ './pages/contacts/view.wrapper')).default,
    resolveHook: require('/home/builduser/agent00/work/83a9b46b152c8242/packages/contacts-views/src/pages/contacts/view.module').resolve,
    filesHook: require('/home/builduser/agent00/work/83a9b46b152c8242/packages/contacts-views/src/pages/contacts/view.module').files,
  },
  ],
  exportedComponents: [
    
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/agent00/work/83a9b46b152c8242/packages/contacts-views/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});