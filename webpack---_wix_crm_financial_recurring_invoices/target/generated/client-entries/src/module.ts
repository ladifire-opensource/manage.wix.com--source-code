
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"CRM_FINANCIAL_RECURRING_INVOICES","config":{"moduleId":"CRM_FINANCIAL_RECURRING_INVOICES","appDefinitionId":"35aec784-bbec-4e6e-abcb-d3d724af52cf","isCoreService":true,"routeNamespace":"recurring-invoices","translations":{"enabled":true},"sentry":{"DSN":"https://cd28a6faf0ff4afb9fc26fff16e73d42@sentry.wixpress.com/1699","id":"cd28a6faf0ff4afb9fc26fff16e73d42","projectName":"crm-financial-recurring-invoices","teamName":"crm-financial"},"experiments":{"scopes":["business-manager","wix-experts","my-account","crm-financial-recurring-invoices"]},"bi":"@wix/bi-logger-dash","enabledByExperiments":["specs.crm.InvoiceAndRecurringInvoicesForm"],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/8dadf0baf08ed3c5/packages/crm-financial-recurring-invoices/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    
    
  },
  pages: [
    
  {
    component: {"componentId":"CRM_FINANCIAL_RECURRING_INVOICES.pages.index","componentType":"page","componentName":"CRM_FINANCIAL_RECURRING_INVOICES.pages.index","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "CRM_FINANCIAL_RECURRING_INVOICES.pages.index" */ './pages/index.wrapper')).default,
    
    
  },

  {
    component: {"componentId":"CRM_FINANCIAL_RECURRING_INVOICES.pages.form.index","componentType":"page","componentName":"CRM_FINANCIAL_RECURRING_INVOICES.pages.form.index","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"src/pages/form/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}},
    loadReactComponent: async () => (await import(/* webpackChunkName: "CRM_FINANCIAL_RECURRING_INVOICES.pages.form.index" */ './pages/form/index.wrapper')).default,
    
    
  },

  {
    component: {"componentId":"CRM_FINANCIAL_RECURRING_INVOICES.pages.partners-form.index","componentType":"page","componentName":"CRM_FINANCIAL_RECURRING_INVOICES.pages.partners-form.index","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"src/pages/partners-form/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}},
    loadReactComponent: async () => (await import(/* webpackChunkName: "CRM_FINANCIAL_RECURRING_INVOICES.pages.partners-form.index" */ './pages/partners-form/index.wrapper')).default,
    
    
  },
  ],
  exportedComponents: [
    
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/8dadf0baf08ed3c5/packages/crm-financial-recurring-invoices/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});