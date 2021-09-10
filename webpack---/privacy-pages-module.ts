import {
  BusinessManagerModule,
  registerModule,
  registerPageComponentMonitors,
  TModuleParams,
  TPrefetchParams,
} from '@wix/business-manager-api';
import {
  ReactLazyComponent,
  ReactLazyComponentOptions,
} from 'react-module-container';
import {
  CONSENT_LOG_PAGE,
  PRIVACY_PAGES_MODULE_ID,
  CONSENT_LOG_PAGE_LAZY,
  IBMModuleParams,
} from './config';

const privacyPagesFiles = (props) => {
  const minified = (debug) => (debug ? '' : '.min');
  const APP_BUNDLE_FILE = 'consent-log-app'; // should be in sync with app's entry-point name in package.json
  return [
    `${
      props.config.topology.privacyPagesStaticsUrl
    }${APP_BUNDLE_FILE}.bundle${minified(props.debug)}.js`,
    `${
      props.config.topology.privacyPagesStaticsUrl
    }${APP_BUNDLE_FILE}${minified(props.debug)}.css`,
  ];
};

class BMConsentLogLazyComponent extends ReactLazyComponent<IBMModuleParams> {
  static prefetch(params: TPrefetchParams) {
    return privacyPagesFiles(params);
  }

  constructor(props: TModuleParams) {
    const options: ReactLazyComponentOptions = {
      files: privacyPagesFiles(props),
      component: CONSENT_LOG_PAGE_LAZY,
    };
    super(props, options);
  }
}

class PrivacyPagesModule extends BusinessManagerModule {
  constructor(moduleId) {
    super(moduleId);
    this.registerComponentWithModuleParams(
      CONSENT_LOG_PAGE,
      BMConsentLogLazyComponent,
    );
  }

  init() {
    registerPageComponentMonitors(CONSENT_LOG_PAGE, null);
  }
}

registerModule(PRIVACY_PAGES_MODULE_ID, PrivacyPagesModule);
