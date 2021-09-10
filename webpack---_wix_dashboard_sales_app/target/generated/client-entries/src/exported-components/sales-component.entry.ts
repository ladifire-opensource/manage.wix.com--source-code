import Component from '/home/builduser/agent00/work/335b618521905df3/packages/dashboard-sales-app/src/exported-components/sales-component';
import { wrapComponent } from '@wix/yoshi-flow-bm/internal/react';
import type { ResolveComponentFlowAPI, ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';
import reactProviders from '/home/builduser/agent00/work/335b618521905df3/packages/dashboard-sales-app/target/generated/client-entries/reactProviders';




export const WrappedComponent = wrapComponent(
  Component,
  {"moduleId":"DASHBOARD_SALES_APP","config":{"moduleId":"DASHBOARD_SALES_APP","moduleBundleName":"dashboard-sales-app.module","appDefinitionId":"f95c72b1-84de-48ec-a61b-d96d61315ffe","isCoreService":true,"routeNamespace":"dashboard-sales-app","translations":{"enabled":true},"experiments":{"centralized":true},"sentry":{"DSN":"https://d076c1ce10464ad195af334bbb208aef@sentry.wixpress.com/925","id":"d076c1ce10464ad195af334bbb208aef","projectName":"dashboard-sales-app","teamName":"os-dashboard"},"bi":"@wix/bi-logger-premium-banner"},"fedopsPath":"/home/builduser/agent00/work/335b618521905df3/packages/dashboard-sales-app/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["en"]}} as ModuleLite,
  reactProviders,
  
);
