import { ReactLazyComponent } from 'react-module-container';
import { TModuleParams } from '@wix/business-manager-api';

import Api from '../utils/Api';
import { getFiles } from '../utils/getFiles';

export class InsightsWidgetLazy extends ReactLazyComponent<TModuleParams> {
  constructor(props: any) {
    super(props, {
      files: getFiles(props.entryPoint, props),
      component: props.componentId,
      resolve: async () => {
        const { insights } = await Api.insightsServer()
          .getInsightsV2()
          .catch((e) => {
            console.error(e);
            return { insights: null };
          });

        return { ...props, insights };
      },
    });
  }
}
