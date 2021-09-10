import {ModuleId} from '@wix/business-manager-api/dist/src/ModuleId';
import {getModule} from '@wix/business-manager-api/dist/src/BusinessManagerAPI';
import {ComponentName} from '../../types/ComponentName';

/* istanbul ignore next: entry point */
export class PromotionModalLazyComponent extends window.ReactLazyComponent {
  constructor(props: any) {
    const manifest: IManifest = {
      files: getManifestFileList(),
      component: ComponentName.PromotionModal,
    };
    super(props, manifest);
  }
}

/* istanbul ignore next */
function getManifestFileList(): string[] {
  const couponsModule = getModule(ModuleId.Coupons) as any;
  const basicUrl = couponsModule.getCouponsBasicUrl();
  const debug = couponsModule.getModuleParams().debug;

  return [
    `${basicUrl}registerPromotionModalComponent${debug ? '' : '.min'}.css`,
    `${basicUrl}registerPromotionModalComponent.bundle${debug ? '' : '.min'}.js`,
  ];
}
