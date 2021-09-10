import {ComponentName} from '../../types/ComponentName';
import {ModuleId} from '@wix/business-manager-api/dist/src/ModuleId';
import {getModule} from '@wix/business-manager-api/dist/src/BusinessManagerAPI';
import {TModuleParams} from '@wix/business-manager-api/dist/src/moduleParams';

/* istanbul ignore next: entry point */
export class CouponsAppLazyComponent extends window.ReactLazyComponent {
  constructor(props: TModuleParams) {
    const couponsModule = getModule(ModuleId.Coupons) as any;
    const topology: ITopology = couponsModule.getTopology();
    const debug = couponsModule.getModuleParams().debug;

    const manifest: IManifest = {
      files: [
        `${topology.couponsStaticsUrl}registerMainComponent${debug ? '' : '.min'}.css`,
        `${topology.couponsStaticsUrl}registerMainComponent.bundle${debug ? '' : '.min'}.js`,
      ],
      component: ComponentName.CouponsApp,
    };
    super(props, manifest);
  }
}
