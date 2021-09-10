import {ModuleId, getModule} from '@wix/business-manager-api';
import {ReactLazyComponent} from 'react-module-container';
import {ComponentNames} from '../../consts';

function files({debug, basicUrl}) {
  return [
    `${basicUrl}registerShippingGroupsModalComponent.bundle${debug ? '' : '.min'}.js`,
    `${basicUrl}registerShippingGroupsModalComponent${debug ? '' : '.min'}.css`,
  ];
}

export class ShippingGroupsModalLazyComponent extends ReactLazyComponent {
  constructor(props) {
    if (window.fedopsLogger.create) {
      const fedopsLogger = window.fedopsLogger.create('wixstores-dashboard-shipping-groups');
      fedopsLogger.appLoadStarted();
    }
    const storeModule = getModule(ModuleId.Stores) as any;
    const basicUrl = storeModule.topology.shippingGroupsStaticUrl;
    const debug = storeModule.getModuleParams().debug;
    const manifest = {
      files: files({debug, basicUrl}),
      component: ComponentNames.ShippingGroupsModal,
      crossorigin: true,
    };

    super(props, manifest);
  }

  public static prefetch({debug}: {debug: boolean}): string[] {
    const storeModule = getModule(ModuleId.Stores) as any;
    const basicUrl = storeModule.topology.shippingGroupsStaticUrl;
    return files({debug, basicUrl});
  }
}
