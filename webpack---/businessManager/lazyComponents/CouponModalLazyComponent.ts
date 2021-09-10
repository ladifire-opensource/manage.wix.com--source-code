import {ICouponModalProps} from '@wix/coupons-client-api';
import {ComponentName} from '../../types/ComponentName';
import {ModuleId} from '@wix/business-manager-api/dist/src/ModuleId';
import {getModule} from '@wix/business-manager-api/dist/src/BusinessManagerAPI';

/* istanbul ignore next: entry point */
export class CouponModalLazyComponent extends window.ReactLazyComponent {
  constructor(props: ICouponModalProps) {
    const couponsModule = getModule(ModuleId.Coupons) as any;
    const topology: ITopology = couponsModule.getTopology();
    const debug = couponsModule.getModuleParams().debug;

    const manifest: IManifest = {
      files: [
        `${topology.couponsStaticsUrl}registerCouponModalComponent${debug ? '' : '.min'}.css`,
        `${topology.couponsStaticsUrl}registerCouponModalComponent.bundle${debug ? '' : '.min'}.js`,
      ],
      component: ComponentName.CouponsModal,
    };
    super(props, manifest);
  }
}
