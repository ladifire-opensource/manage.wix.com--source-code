import Component from '/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/src/exported-components/section-widget';
import { wrapComponent } from '@wix/yoshi-flow-bm/internal/react';
import type { ResolveComponentFlowAPI, ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';
import reactProviders from '/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/target/generated/client-entries/reactProviders';




export const WrappedComponent = wrapComponent(
  Component,
  {"moduleId":"DASHBOARD_SUGGESTIONS","config":{"moduleId":"DASHBOARD_SUGGESTIONS","moduleBundleName":"dashboard-suggestions-app","isCoreService":true,"routeNamespace":"home/suggestions","experiments":{"centralized":true},"translations":{"enabled":false},"sentry":{"DSN":"https://475df0c4448e4cfc817ee56cf2572ed6@sentry.wixpress.com/662","id":"475df0c4448e4cfc817ee56cf2572ed6","projectName":"dashboard-suggestions-app","teamName":"wos-1","errorMonitor":true},"topology":{"dashboardSuggestionsTranslations":{"artifactId":"com.wixpress.dashboard-suggestions.dashboard-suggestions-translations"}},"bi":"@wix/bi-logger-suggestions-widget","appDefinitionId":"cead4297-02ee-4c0f-ae07-461f4ba71b3b"},"fedopsPath":"/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["en"]}} as ModuleLite,
  reactProviders,
  
);
