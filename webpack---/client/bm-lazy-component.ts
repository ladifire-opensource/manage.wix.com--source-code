import { TModuleParams, TPrefetchParams } from '@wix/business-manager-api';
import { ReactLazyComponent } from 'react-module-container';
import { COMPONENT_ID, APP_BUNDLE } from './bm-constants';

type TPageComponentProps = TModuleParams & { routeBaseName: string };

const minified = (debug: boolean) => (debug ? '' : '.min');

function files({ config, debug }) {
  return [
    `${config.topology.staticsBaseUrl}${APP_BUNDLE}.bundle${minified(
      debug,
    )}.js`,
    `${config.topology.staticsBaseUrl}${APP_BUNDLE}${minified(debug)}.css`,
  ];
}

export class PromoteCampaignsLazyComponent extends ReactLazyComponent {
  static prefetch(params: TPrefetchParams) {
    return files(params);
  }
  constructor(props: TPageComponentProps) {
    const {
      userId,
      metaSiteId,
      routeBaseName,
      locale, // Deprecated, should be removed after specs.wos2.DeprecateLocaleProp merge
      accountLanguage,
      config: {
        topology: { apiBaseUrl },
      },
    } = props;
    super(props, {
      files: files(props),
      resolve: () =>
        Promise.resolve({
          apiBaseUrl,
          metaSiteId,
          userId,
          routeBaseName: `${routeBaseName}${metaSiteId}/paid-ads`,
          locale: accountLanguage ?? locale,
        }),
      component: COMPONENT_ID,
    });
  }
}
