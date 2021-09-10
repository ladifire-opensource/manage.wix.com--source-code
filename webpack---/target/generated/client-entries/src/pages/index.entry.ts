import Component from '/home/builduser/work/2eef88c0c67ad536/packages/my-domains-iframe-wrapper/src/pages/index';
import { wrapComponent } from '@wix/yoshi-flow-bm/internal/react';
import type { ResolveComponentFlowAPI, ModuleLite } from '@wix/yoshi-flow-bm-runtime/common';
import reactProviders from '/home/builduser/work/2eef88c0c67ad536/packages/my-domains-iframe-wrapper/target/generated/client-entries/reactProviders';




export const WrappedComponent = wrapComponent(
  Component,
  {"moduleId":"MY_DOMAINS_IFRAME_WRAPPER","config":{"moduleId":"MY_DOMAINS_IFRAME_WRAPPER","appDefinitionId":"22549697-66d7-40c7-961d-b7b31dd4b49b","isCoreService":true,"routeNamespace":"my-domains-iframe-wrapper","translations":{"enabled":true},"sentry":{"DSN":"https://51a2292d4ef74048b2003e38ab2ca6cc@sentry.wixpress.com/1884","id":"51a2292d4ef74048b2003e38ab2ca6cc","projectName":"my-domains-iframe-wrapper","teamName":"premium-fed"},"experiments":{"scopes":["bm-apps-22549697-66d7-40c7-961d-b7b31dd4b49b"]},"enabledByExperiments":["specs.premium.MyDomainsIframeWrapper"],"moduleBundleName":"module"},"fedopsPath":"/home/builduser/work/2eef88c0c67ad536/packages/my-domains-iframe-wrapper/fedops.json","maybeTranslationsModel":{"messagesEnFile":"messages_en.json","localeDistPath":"assets/locale","availableLocales":["de","en"]}} as ModuleLite,
  reactProviders,
  
);
