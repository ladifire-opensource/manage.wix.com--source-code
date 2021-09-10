
import {
  createModule,
  HttpClient,
} from 'yoshi-flow-bm-runtime';

createModule({
  module: {
    module: {"moduleId":"STORES_INTEGRATION","config":{"moduleId":"STORES_INTEGRATION","appDefId":"41ea6e3c-3813-4de3-95a7-447c9c16ef7e","isCoreService":true,"routeNamespace":"stores-integration","translations":{"enabled":true,"suspense":true},"sentry":{"DSN":"https://03ec245947a1497ba3a90419fefd7a55@sentry.wixpress.com/1141","id":"03ec245947a1497ba3a90419fefd7a55","projectName":"stores-integration","teamName":"stores-integration"},"experiments":{"scopes":["stores-integration"]},"topology":{"staticsUrl":{"artifactId":"com.wixpress.stores-integration"}},"moduleBundleName":"module"},"fedopsPath":"/home/builduser/agent00/work/8dd345d4a3e77db3/fedops.json"},
    
    
  },
  pages: [
    
  {
    component: {"componentId":"STORES_INTEGRATION.pages.index","componentType":"page","componentName":"STORES_INTEGRATION.pages.index"},
    loadReactComponent: async () => (await import(/* webpackChunkName: "STORES_INTEGRATION.pages.index" */ './pages/index.tsx')).default,
    
    
    
  },
  ],
  exportedComponents: [
    
  ],
  useEssentials: false,
  methods: [
    
  ],
  optionalDeps: {
    HttpClient,
    loadOptionalFlowAPIDeps: async () => (await import(/* webpackChunkName: "flowAPIDeps" */ '../flowAPIDeps.ts')).default,
    asyncMessagesLoader: (locale) => import(`/home/builduser/agent00/work/8dd345d4a3e77db3/src/assets/locale/messages_${locale}.json`),
  },
});