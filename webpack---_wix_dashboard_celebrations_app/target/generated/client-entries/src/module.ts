
import {
  createModule,
} from '@wix/yoshi-flow-bm/internal/react';

import { createBILogger } from '/home/builduser/work/466b6621be67983a/packages/dashboard-celebrations-app/target/generated/bi/createBILogger';

import type { ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';

createModule({
  context: {"enableTranslationsHMR":false},
  requireableModule: {
    module: {"moduleId":"DASHBOARD_CELEBRATIONS_APP","config":{"moduleId":"DASHBOARD_CELEBRATIONS_APP","appDefinitionId":"a9aca399-cf82-4e05-bf89-1cbad948be56","isCoreService":true,"routeNamespace":"dashboard-celebrations-app","translations":{"enabled":true},"sentry":{"DSN":"https://f29bb8b2ac7e4ded9416d832fe7a2021@sentry.wixpress.com/1910","id":"f29bb8b2ac7e4ded9416d832fe7a2021","projectName":"dashboard-celebrations-app","teamName":"wos-1"},"experiments":{"scopes":["bm-apps-a9aca399-cf82-4e05-bf89-1cbad948be56"]},"components":[{"componentId":"dashboard-celebrations-widget","componentName":"DASHBOARD_CELEBRATIONS_APP.components.celebrations-widget","hostContainerId":"business-dashboard-host","requiredPermission":"DUMMY_PERMISSION.TO_TRICK_THE_SYSTEM","sentryDsn":"https://f29bb8b2ac7e4ded9416d832fe7a2021@sentry.wixpress.com/1910"}],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/466b6621be67983a/packages/dashboard-celebrations-app/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["ar","bg","ca","cs","da","de","el","en","es","fi","fr","he","hi","hu","id","it","ja","ko","lt","ms","nl","no","pl","pt","ro","ru","sk","sl","sv","th","tl","tr","uk","vi","zh"]}} as ModuleLite,
    initHook: require('/home/builduser/work/466b6621be67983a/packages/dashboard-celebrations-app/src/module').init,
    configHook: require('/home/builduser/work/466b6621be67983a/packages/dashboard-celebrations-app/src/module').config,
  },
  pages: [
    
  ],
  exportedComponents: [
    
  {
    component: {"componentId":"dashboard-celebrations-app.components.celebrations-widget","componentType":"exported-component","maybeTranslationsModel":null},
    loadReactComponent: async () => (await import(/* webpackChunkName: "dashboard-celebrations-app.components.celebrations-widget" */ './exported-components/celebrations-widget.wrapper')).default,
    resolveHook: require('/home/builduser/work/466b6621be67983a/packages/dashboard-celebrations-app/src/exported-components/celebrations-widget.module').resolve,
    filesHook: require('/home/builduser/work/466b6621be67983a/packages/dashboard-celebrations-app/src/exported-components/celebrations-widget.module').files,
  },
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