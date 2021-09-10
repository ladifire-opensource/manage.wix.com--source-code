import { TModuleParams } from './commonTypes';
import { SEND_MESSAGE_WIDGET_COMPONENT_NAME } from './component-names';
import { ReactLazyComponent } from 'react-module-container';

const minified = (debug) => (debug ? '' : '.min');

export default class SendMessageWidgetLazyComponent extends ReactLazyComponent<TModuleParams> {
  constructor(props: TModuleParams) {
    const manifest = {
      files: [
        `${
          props.config.topology.engageWebStaticsUrl
        }send-message-widget-component.bundle${minified(props.debug)}.js`,
        `${
          props.config.topology.engageWebStaticsUrl
        }send-message-widget-component${minified(props.debug)}.css`,
      ],
      component: SEND_MESSAGE_WIDGET_COMPONENT_NAME,
    };
    super(props, manifest);
  }
}
