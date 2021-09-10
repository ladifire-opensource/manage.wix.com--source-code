
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';



import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"ASCEND_INVOICE_WIDGET","config":{"moduleId":"ASCEND_INVOICE_WIDGET","isCoreService":true,"routeNamespace":"ascend-invoice-widget","bi":"@wix/bi-logger-invoices-widget","translations":{"enabled":true},"sentry":{"DSN":"https://dadcfbfff1a34826bcf4b5c221d5c847@sentry.wixpress.com/1841","id":"dadcfbfff1a34826bcf4b5c221d5c847","projectName":"ascend-invoice-widget","teamName":"ascend"},"experiments":{"scopes":["ascend"]},"enabledByExperiments":[],"appDefinitionId":"6376c4a8-e8d2-4a55-954e-d5b9162e7438","moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/6ecb126920426f70/packages/ascend-invoice-widget/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    initHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-invoice-widget/src/module').init,
    configHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-invoice-widget/src/module').config,
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"ascend-invoice-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "ascend-invoice-widget" */ './exported-components/AscendInvoiceWidget.wrapper')).default,
    resolveHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-invoice-widget/src/exported-components/AscendInvoiceWidget.module').resolve,
    filesHook: require('/home/builduser/work/6ecb126920426f70/packages/ascend-invoice-widget/src/exported-components/AscendInvoiceWidget.module').files,
  },
  ],
  methods: [
    
  ],
  optionalDeps: {
    loadOptionalFlowAPIDeps: async () => {
      const { createBILogger } = await import(/* webpackChunkName: "flowAPIDeps" */ '/home/builduser/work/6ecb126920426f70/packages/ascend-invoice-widget/target/generated/bi/createBILogger')


      return {
         createBILogger,
      };
    },
  },
});