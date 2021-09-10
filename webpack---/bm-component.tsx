import Experiments from '@wix/wix-experiments';
import { TPrefetchParams, TModuleParams } from '@wix/business-manager-api';
import * as moment from 'moment-timezone';
import {
  ReactLazyComponent,
  ReactLazyComponentOptions,
} from 'react-module-container';
import {
  IBMModuleParams,
  COMPONENT_ID,
} from './config';

const files = (params: TPrefetchParams) => {
  const minified = (debug: boolean) => (debug ? '' : '.min');
  const APP_BUNDLE_FILE = 'app';
  const url = `${params.config.topology.laterStaticsUrl}${APP_BUNDLE_FILE}`;
  return [
    `${url}.bundle${minified(params.debug)}.js`,
    `${url}${minified(params.debug)}.css`,
  ];
};

export class LaterModalLazyComponent extends ReactLazyComponent<IBMModuleParams, {}> {
  static prefetch(params: TPrefetchParams) {
    return files(params);
  }

  constructor(props: TModuleParams) {
    super(props, {
      files: files(props),
      resolve: () => this.resolve(props),
      component: COMPONENT_ID,
    } as ReactLazyComponentOptions);
  }

  async resolve(props: TModuleParams) {
    const experimentsInstance = new Experiments();
    await experimentsInstance.load('promote-later');

    const timezone = moment.tz.guess();
    return {
      timezone,
      experiments: experimentsInstance,
    };
  }
}