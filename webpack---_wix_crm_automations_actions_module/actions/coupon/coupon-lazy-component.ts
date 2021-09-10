import { ReactLazyComponent } from 'react-module-container';

export const COUPON_ACTION_LAZY_COMPONENT = 'coupon-action-lazy-component';
const COUPON_COMPONENT_NAME = 'coupon-action-component';

export class CouponActionLazyComponent extends ReactLazyComponent {
  static readonly debugFiles = ['coupon-component.bundle.js'];
  static readonly minifiedFiles = ['coupon-component.bundle.min.js'];

  constructor(props) {
    super(props, {
      files: CouponActionLazyComponent.getFiles(props),
      component: COUPON_COMPONENT_NAME,
    });
  }

  static getFiles(props) {
    const files = props.debug
      ? CouponActionLazyComponent.debugFiles
      : CouponActionLazyComponent.minifiedFiles;

    return files.map(
      (relativePath) =>
        `${props.config.topology.automationsCouponStaticsUrl}${relativePath}`,
    );
  }
}
