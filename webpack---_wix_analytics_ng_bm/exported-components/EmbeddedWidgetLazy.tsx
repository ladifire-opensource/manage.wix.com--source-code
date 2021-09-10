import { ReactLazyComponent } from 'react-module-container';
import { TModuleParams } from '@wix/business-manager-api';

import { getFiles } from '../utils/getFiles';

export class EmbeddedWidgetLazy extends ReactLazyComponent<TModuleParams> {
  constructor(props: any) {
    super(props, {
      files: getFiles(props.entryPoint, props),
      component: props.componentId,
      resolve: async () => {
        const { reportingService, initialDataService } = props;
        const [
          { userProfile, hasBusinessPlan, isPremium, shouldConnectPaymentMethod },
          cachedUserStatus,
        ] = await Promise.all([
          initialDataService.getInitialData(props),
          reportingService.getCachedUserStatus(),
        ]);

        reportingService.status.updateStatus({
          ...userProfile,
          hasBusinessPlan,
          isPremium,
          shouldConnectPaymentMethod,
          ...cachedUserStatus,
        });

        return {
          ...props,
          userProfile,
          hasBusinessPlan,
          isPremium,
          shouldConnectPaymentMethod,
        };
      },
    });
  }
}
