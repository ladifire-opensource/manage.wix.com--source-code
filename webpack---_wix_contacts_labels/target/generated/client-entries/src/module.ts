
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"CONTACTS_LABELS","config":{"moduleId":"CONTACTS_LABELS","moduleConfigurationId":"CONTACTS","appDefinitionId":"74bff718-5977-47f2-9e5f-a9fd0047fd1f","moduleBundleName":"contact-labels.module","translations":{"enabled":true},"experiments":{"scopes":["my-account","crm-contacts","business-settings"]},"sentry":{"DSN":"https://6a48efcabb4a4602a7428922e3bd034b@sentry.wixpress.com/757","id":"6a48efcabb4a4602a7428922e3bd034b","projectName":"contacts-labels","teamName":"contacts","errorMonitor":true},"bi":"@wix/bi-logger-contacts","routeNamespace":""},"fedopsPath":"/home/builduser/agent00/work/b4866e65fe0932d5/packages/contacts-labels/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"contacts-labels.components.BulkSelectLabels","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "contacts-labels.components.BulkSelectLabels" */ './exported-components/BulkSelectLabels.wrapper')).default,
    
    
  },

  {
    component: {"componentId":"contacts.label-contact-action","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "contacts.label-contact-action" */ './exported-components/LabelContactAutomation.wrapper')).default,
    
    
  },

  {
    component: {"componentId":"contacts-labels.components.LabelsCard","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "contacts-labels.components.LabelsCard" */ './exported-components/LabelsCard.wrapper')).default,
    
    
  },

  {
    component: {"componentId":"contacts-labels.components.ManageLabels","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "contacts-labels.components.ManageLabels" */ './exported-components/ManageLabels.wrapper')).default,
    
    
  },
  ],
  methods: [
    
  {
    method: {"methodId":"contacts-labels.methods.openLabelsManager"},
    fn: () => require('/home/builduser/agent00/work/b4866e65fe0932d5/packages/contacts-labels/src/methods/openLabelsManager').default,
  },
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/agent00/work/b4866e65fe0932d5/packages/contacts-labels/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});