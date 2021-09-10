import { ReactLazyComponent } from 'react-module-container';

import { ModuleId, getModule, TModuleParams } from '@wix/business-manager-api';
import { ComponentName } from '@wix/analytics-bm-page/dist/src/types/componentName';

import { IAnalyticsBMModule } from './types/types';

export class StatsLazyComponent extends ReactLazyComponent<any> {
  constructor(props: TModuleParams) {
    const analyticsModule = getModule(ModuleId.Analytics) as IAnalyticsBMModule;
    const basicUrl = analyticsModule.getPageBasicUrl();
    const debug = analyticsModule.getModuleParams().debug;

    const manifest: IManifest = {
      files: [
        `${basicUrl}analytics-stats-bm-page.bundle${debug ? '' : '.min'}.js`,
      ],
      component: ComponentName.AnalyticsPage,
    };

    super(props, manifest);
  }
}
