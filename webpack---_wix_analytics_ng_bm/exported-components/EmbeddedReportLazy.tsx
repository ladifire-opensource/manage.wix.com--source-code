import { ReactLazyComponent } from 'react-module-container';
import { TModuleParams } from '@wix/business-manager-api';

import { getFiles } from '../utils/getFiles';

export class EmbeddedReportLazy extends ReactLazyComponent<TModuleParams> {
  constructor(props: any) {
    super(props, {
      files: getFiles(props.entryPoint, props),
      component: props.componentId,
    });
  }
}
