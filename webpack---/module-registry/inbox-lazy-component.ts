import { TModuleParams } from './commonTypes';
import { INBOX_COMPONENT_NAME } from './component-names';
import { fedopsInit } from '../services/fedops/init';
import { FEDOPS_APP_NAMES } from '../constants/fedopsLoggerApps';
import { ReactLazyComponent } from 'react-module-container';

const minified = (debug) => (debug ? '' : '.min');

export default class InboxLazyComponent extends ReactLazyComponent<TModuleParams> {
  constructor(props: TModuleParams) {
    fedopsInit(FEDOPS_APP_NAMES.INBOX);
    const manifest = {
      files: [
        `${
          props.config.topology.engageWebStaticsUrl
        }register-engage-component.bundle${minified(props.debug)}.js`,

        `${
          props.config.topology.engageWebStaticsUrl
        }register-engage-component${minified(props.debug)}.css`,
      ],
      component: INBOX_COMPONENT_NAME,
    };
    super(props, manifest);
  }
}
