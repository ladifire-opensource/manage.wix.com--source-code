import {
  BusinessManagerModule,
  ModuleId,
  notifyViewStartLoading,
  registerModule,
  registerPageComponentMonitors,
  TModuleParams,
  TPrefetchParams,
} from '@wix/business-manager-api';
import {ModuleRegistry, ReactLazyComponent, ReactLazyComponentOptions} from 'react-module-container';
import {bundleName, componentId, moduleId} from './config';
import {getInitialData, initSentryHub} from './bm-utils';
import {TPageComponentProps} from './types/index';

const getFilesList = ({debug, config}: TPrefetchParams) => {
  const postfix = debug ? '' : '.min';

  const {
    topology: {staticsUrl},
  } = config;

  return [`${staticsUrl}${bundleName}.bundle${postfix}.js`, `${staticsUrl}${bundleName}${postfix}.css`];
};

class Component extends ReactLazyComponent {
  constructor(props: TPageComponentProps) {
    const options: ReactLazyComponentOptions = {
      files: getFilesList(props),
      resolve: () => getInitialData(props),
      component: componentId,
    };

    super(props, options);
    notifyViewStartLoading(componentId);
    ModuleRegistry.notifyListeners('businessManager.viewStartLoading', componentId);
  }
}

class BMModule extends BusinessManagerModule {
  constructor(modId: ModuleId) {
    super(modId);

    ModuleRegistry.registerComponent(componentId, () => Component);
  }

  init(moduleParams: TModuleParams) {
    const sentryHub = initSentryHub(moduleParams);

    registerPageComponentMonitors(componentId, {
      sentryClient: sentryHub.getClient(),
    });
  }
}

registerModule(moduleId, BMModule);
