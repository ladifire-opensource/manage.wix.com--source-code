
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"CONTACTS_CUSTOM_FIELDS","config":{"moduleId":"CONTACTS_CUSTOM_FIELDS","moduleConfigurationId":"CONTACTS","appDefinitionId":"74bff718-5977-47f2-9e5f-a9fd0047fd1f","moduleBundleName":"contacts-custom-fields.module","translations":{"enabled":true},"experiments":{"scopes":["my-account","crm-contacts","business-settings"]},"sentry":{"DSN":"https://708f5b61e0c5420eb69adab94452227f@sentry.wixpress.com/846","id":"708f5b61e0c5420eb69adab94452227f","projectName":"contacts-custom-fields","teamName":"contacts","errorMonitor":true},"bi":"@wix/bi-logger-contacts","routeNamespace":""},"fedopsPath":"/home/builduser/agent00/work/8715a9da5ff0eb03/packages/contacts-custom-fields/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"add-custom-field","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "add-custom-field" */ './exported-components/AddEditCustomField.wrapper')).default,
    
    
  },

  {
    component: {"componentId":"manage-custom-fields","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "manage-custom-fields" */ './exported-components/ManageCustomFields.wrapper')).default,
    
    
  },
  ],
  methods: [
    
  {
    method: {"methodId":"contacts.openAddCustomField"},
    fn: () => require('/home/builduser/agent00/work/8715a9da5ff0eb03/packages/contacts-custom-fields/src/methods/openAddCustomField').default,
  },

  {
    method: {"methodId":"contacts.openManageCustomFields"},
    fn: () => require('/home/builduser/agent00/work/8715a9da5ff0eb03/packages/contacts-custom-fields/src/methods/openManageCustomFields').default,
  },
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/agent00/work/8715a9da5ff0eb03/packages/contacts-custom-fields/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});