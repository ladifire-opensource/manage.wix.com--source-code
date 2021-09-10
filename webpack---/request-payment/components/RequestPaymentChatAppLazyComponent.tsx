import {
  ReactLazyComponent,
  ReactLazyComponentOptions,
} from 'react-module-container';
import { TModuleParams } from '@wix/business-manager-api';
import { REQUEST_PAYMENT_CHAT_APP_COMPONENT_ID } from '../../config';
import { withFixedHeightWrapper } from '../../components/HOC/withFixedHeightWrapper';

const requestPaymentChatAppFiles = (props) => {
  const minified = (debug) => (debug ? '' : '.min');
  const APP_BUNDLE_FILE = 'request-payment-chat-app'; // should be in sync with app's entry-point name in package.json
  return [
    `${props.config.topology.staticsUrl}${APP_BUNDLE_FILE}.bundle${minified(
      props.debug,
    )}.js`,
    `${props.config.topology.staticsUrl}${APP_BUNDLE_FILE}${minified(
      props.debug,
    )}.css`,
  ];
};

export const RequestPaymentChatAppLazyComponent = withFixedHeightWrapper(
  '210px',
)(
  class extends ReactLazyComponent<TModuleParams> {
    constructor(props?: TModuleParams) {
      const options: ReactLazyComponentOptions = {
        files: requestPaymentChatAppFiles(props),
        component: REQUEST_PAYMENT_CHAT_APP_COMPONENT_ID,
        unloadStylesOnDestroy: false,
      };
      super(props, options);
    }
  },
);
