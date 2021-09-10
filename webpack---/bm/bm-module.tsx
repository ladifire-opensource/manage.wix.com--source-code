import React from 'react';
import {registerModule, TModuleParams, BusinessManagerModule, ModuleId} from '@wix/business-manager-api';
import {ModuleRegistry, ReactLazyComponent} from 'react-module-container';
import {bmComponentId, fedopsAppId} from '../config';
import {HttpClient} from '@wix/http-client';
import {reportAppLoadStarted} from '@wix/fe-essentials/fedops';

// Hardcode instead of import to reduce the bundle size
const amInitialDataUrl = 'api/meta/am/initial-data';
const amTranslationUrl = 'api/meta/am/translations';

const files = ({debug, config}: any) => {
  const minified = debug ? '' : '.min';

  return [
    `${config.topology.staticsUrl}bm-wp-settings.bundle${minified}.js`,
    `${config.topology.staticsUrl}bm-wp-settings${minified}.css`,
  ];
};

const getModuleInitialData =
  ({accountLanguage, country}: BmWpSettngsLazyComponentProps) =>
  async () => {
    const baseApiUrl = '/_api/wix-payments-server/';
    const httpClient = new HttpClient();

    reportAppLoadStarted(fedopsAppId);

    const [{data: initialData}, {data: translations}] = await Promise.all([
      httpClient.get(`${baseApiUrl}${amInitialDataUrl}`),
      httpClient.get(`${baseApiUrl}${amTranslationUrl}`, {
        params: {locale: accountLanguage, country: country?.toLowerCase()},
      }),
    ]);

    return {...initialData, translations};
  };

type BmWpSettngsLazyComponentProps = TModuleParams & {
  routeBaseName?: string;
  availablePaymentsMethodsNames: string[];
  country?: string;
};

class BmWpSettngsLazyComponent extends ReactLazyComponent {
  constructor(props: BmWpSettngsLazyComponentProps) {
    super(props, {
      component: bmComponentId,
      files: files(props),
      resolve: getModuleInitialData(props),
    });
  }
}

class BMModule extends BusinessManagerModule {
  init(moduleParams: TModuleParams) {
    ModuleRegistry.registerComponent(bmComponentId, () => (props) => (
      <BmWpSettngsLazyComponent {...props} config={moduleParams.config} />
    ));
  }
}

registerModule(ModuleId.WixPaymentsAccountManagement, BMModule);
