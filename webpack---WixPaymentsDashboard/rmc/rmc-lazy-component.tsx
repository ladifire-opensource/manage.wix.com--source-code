/** NOTE
 * Depending on what was changed, sometimes it won't be enough to RC/GA wix-payments-dashboard to see the result in prod.
 * In such a cases cashier-merchant-settings should be also RC/GAed. This is because CMS import this module directly (synchronously) as node module.
 * This means that you might cause a situation when PD is RC/GAed, but CMS is using OLD version of this module, causing unexpected behaviour.
 * Thus changes in this module might cause the need to RC/GA cashier-merchant-settings.
 * Also this about whether the changes are backward-compatible and if not - handle it.
 */
import {TModuleParams} from '@wix/business-manager-api';
import {ReactLazyComponent} from 'react-module-container';
import {RMC_COMPONENT_ID} from './config';
import {getInitialData} from '../business-manager/api-calls';
import {NavigationOverrides} from '../app/services/UrlService';

const files = ({config, debug}: any) => {
  const minified = debug ? '' : '.min';
  const APP_BUNDLE_FILE = 'wix-payments-dashboard-rmc'; // should be in sync with app's entry-point name in package.json

  return [
    `${config.topology.staticsUrl}commons.chunk${minified}.js`,
    `${config.topology.staticsUrl}${APP_BUNDLE_FILE}.bundle${minified}.js`,
    `${config.topology.staticsUrl}commons.chunk${minified}.css`,
    `${config.topology.staticsUrl}${APP_BUNDLE_FILE}${minified}.css`,
  ];
};

export type RMCLazyComponentProps = TModuleParams & {
  routeBaseName?: string;
  navigationOverrides: NavigationOverrides;
  availablePaymentsMethodsNames: string[];
};

export class RMCLazyComponent extends ReactLazyComponent {
  constructor(props: RMCLazyComponentProps) {
    super(props, {
      component: RMC_COMPONENT_ID,
      files: files(props),
      resolve: async () => getInitialData(),
    });
  }
}
