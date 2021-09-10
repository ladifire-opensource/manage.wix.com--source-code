
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/agent00/work/6a03f77aef677582/packages/contacts-import/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"CONTACTS_IMPORT","config":{"moduleId":"CONTACTS_IMPORT","moduleConfigurationId":"CONTACTS","appDefinitionId":"74bff718-5977-47f2-9e5f-a9fd0047fd1f","isCoreService":true,"moduleBundleName":"contacts-import-module","translations":{"enabled":false},"sentry":{"DSN":"https://0d2a2363eb304e70905cdc069c9899be@sentry.wixpress.com/127","id":"0d2a2363eb304e70905cdc069c9899be","projectName":"contacts-import","teamName":"contacts","errorMonitor":true},"experiments":{"scopes":["my-account","crm-contacts","business-settings"]},"topology":{"contactsImportStaticsUrl":{"artifactId":"com.wixpress.contacts.contacts-import"},"localeDatasetDataStaticsUrl":{"artifactId":"com.wixpress.locale-dataset-data"}},"routeNamespace":""},"fedopsPath":"/home/builduser/agent00/work/6a03f77aef677582/packages/contacts-import/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"contacts-import-page","componentType":"page","componentName":"contacts-import-page","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "contacts-import-page" */ './pages/contacts/import.wrapper')).default,
    
    
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