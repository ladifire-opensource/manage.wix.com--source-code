import { ModuleRegistry, ReactLazyComponent, ReactLazyComponentOptions } from 'react-module-container';
import { TPrefetchParams } from '@wix/business-manager-api';
import { BI_VIEW_ID, COMPONENT_ID, BMModuleParams } from './bm-config';

const files = ({ config, debug }) => {
  const minified = debug ? '' : '.min';
  const APP_BUNDLE_FILE = 'cashier-merchant-settings'; // should be in sync with app's entry-point name in package.json

  return [`${config.topology.cashierStaticsUrl}${APP_BUNDLE_FILE}.bundle${minified}.js`];
};

export class BMLazyComponent extends ReactLazyComponent<BMModuleParams> {
  static prefetch(params: TPrefetchParams) {
    return files(params);
  }

  constructor(props: BMModuleParams) {
    ModuleRegistry.notifyListeners('businessManager.viewStartLoading', BI_VIEW_ID);
    const startTime = Date.now();

    super(props, {
      component: COMPONENT_ID,
      files: files(props),
      resolve: async () => {
        const [experiments, moduleConfig, metadata, initialMerchantInfo] = await Promise.all([
          ModuleRegistry.invoke('cashier.getActiveExperiments'),
          ModuleRegistry.invoke('cashier.getModuleConfig'),
          ModuleRegistry.invoke('cashier.getMetadata'),
          ModuleRegistry.invoke('cashier.getMerchantInfo'),
        ]);
        return {
          startTime,
          experiments,
          moduleConfig,
          metadata,
          initialMerchantInfo,
        };
      },
    } as ReactLazyComponentOptions);
  }
}
