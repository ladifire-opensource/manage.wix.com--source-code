import {
  ReactLazyComponent,
  ReactLazyComponentOptions,
} from 'react-module-container';
import { TModuleParams } from '@wix/business-manager-api';
import { COUPON_CHAT_APP_COMPONENT_ID } from '../../config';
import { withFixedHeightWrapper } from '../../components/HOC/withFixedHeightWrapper';

const couponChatAppFiles = (props) => {
  const minified = (debug) => (debug ? '' : '.min');
  const APP_BUNDLE_FILE = 'coupon-chat-app'; // should be in sync with app's entry-point name in package.json
  return [
    `${props.config.topology.staticsUrl}${APP_BUNDLE_FILE}.bundle${minified(
      props.debug,
    )}.js`,
    `${props.config.topology.staticsUrl}${APP_BUNDLE_FILE}${minified(
      props.debug,
    )}.css`,
  ];
};

export const CouponChatAppLazyComponent = withFixedHeightWrapper('180px')(
  class extends ReactLazyComponent<TModuleParams> {
    constructor(props?: TModuleParams) {
      const options: ReactLazyComponentOptions = {
        files: couponChatAppFiles(props),
        component: COUPON_CHAT_APP_COMPONENT_ID,
        unloadStylesOnDestroy: false,
      };
      super(props, options);
    }
  },
);
