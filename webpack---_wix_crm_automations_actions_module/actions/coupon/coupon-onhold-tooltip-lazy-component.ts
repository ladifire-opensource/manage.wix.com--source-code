import { ReactLazyComponent } from 'react-module-container';

export const SEND_COUPON_ON_HOLD_LAZY_COMPONENT =
  'ascend.components.send-coupon-automation-on-hold.lazy-component';
const SEND_COUPON_ON_HOLD_COMPONENT_NAME =
  'ascend.components.send-coupon-automation-on-hold';

export class SendCouponOnHoldLazyComponent extends ReactLazyComponent {
  static readonly debugFiles = ['send-coupon-on-hold-component.bundle.js'];
  static readonly minifiedFiles = [
    'send-coupon-on-hold-component.bundle.min.js',
  ];

  constructor(props) {
    super(props, {
      files: SendCouponOnHoldLazyComponent.getFiles(props),
      component: SEND_COUPON_ON_HOLD_COMPONENT_NAME,
    });
  }

  static getFiles(props) {
    const files = props.debug
      ? SendCouponOnHoldLazyComponent.debugFiles
      : SendCouponOnHoldLazyComponent.minifiedFiles;

    return files.map(
      (relativePath) =>
        `${props.config.topology.automationsCouponStaticsUrl}${relativePath}`,
    );
  }
}
