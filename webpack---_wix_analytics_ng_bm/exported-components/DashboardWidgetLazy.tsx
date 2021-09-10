import { ReactLazyComponent } from 'react-module-container';
import { TModuleParams } from '@wix/business-manager-api';

import { getFiles } from '../utils/getFiles';

export class DashboardWidgetLazy extends ReactLazyComponent<TModuleParams> {
  constructor(props: any) {
    super(props, {
      files: getFiles(props.entryPoint, props),
      component: props.componentId,
      resolve: async () => {
        const { reportingService, initialDataService } = props;
        const dashboardReportKey = 'dashboardReportKey';
        const dashboardReportsIds = reportingService.getDashboardStats();

        reportingService.getReports(dashboardReportKey, {
          isUnified: true,
          preloadReportsIds: dashboardReportsIds,
        });

        const {
          userProfile,
          hasBusinessPlan,
          isPremium,
          shouldConnectPaymentMethod,
        } = await initialDataService.getInitialData(props);

        return {
          ...props,
          userProfile,
          hasBusinessPlan,
          isPremium,
          shouldConnectPaymentMethod,
          reportKey: dashboardReportKey,
        };
      },
    });
  }
}
