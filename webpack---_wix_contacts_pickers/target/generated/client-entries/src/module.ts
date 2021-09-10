
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"CONTACTS_PICKERS","config":{"moduleId":"CONTACTS_PICKERS","moduleConfigurationId":"CONTACTS","appDefinitionId":"74bff718-5977-47f2-9e5f-a9fd0047fd1f","isCoreService":true,"moduleBundleName":"contacts-pickers","translations":{"enabled":true},"sentry":{"DSN":"https://2d9c561cce6a430db5d472a82ddbe8aa@sentry.wixpress.com/1439","id":"2d9c561cce6a430db5d472a82ddbe8aa","projectName":"contacts-pickers","teamName":"contacts","errorMonitor":true},"experiments":{"scopes":["my-account","crm-contacts"]},"bi":"@wix/bi-logger-contacts","routeNamespace":""},"fedopsPath":"/home/builduser/agent00/work/565e1e1a11db52fb/packages/contacts-pickers/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sv","th","tl","tr","uk","vi","zh","zu"]}} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"contacts-picker-dropdown-v4","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "contacts-picker-dropdown-v4" */ './exported-components/contacts-picker-dropdown.wrapper')).default,
    
    
  },

  {
    component: {"componentId":"contacts-picker-popover-v4","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "contacts-picker-popover-v4" */ './exported-components/contacts-picker-popover.wrapper')).default,
    
    
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/agent00/work/565e1e1a11db52fb/packages/contacts-pickers/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});