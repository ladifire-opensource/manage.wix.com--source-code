import {ModuleId, getModule} from '@wix/business-manager-api';
import {ReactLazyComponent} from 'react-module-container';
import {ComponentNames} from '../../consts';

export class FullfilmentServicesLazyComponent extends ReactLazyComponent {
  constructor(props) {
    const storeModule = getModule(ModuleId.Stores) as any;
    const basicUrl = storeModule.topology.fulfillmentServicesStaticUrl;
    const debug = storeModule.getModuleParams().debug;

    const manifest = {
      files: [
        `${basicUrl}registerFulfillmentServicesPageComponent.bundle${debug ? '' : '.min'}.js`,
        `${basicUrl}registerFulfillmentServicesPageComponent${debug ? '' : '.min'}.css`,
      ],
      component: ComponentNames.FulfillmentServicesPage,
      crossorigin: true,
    };
    super(props, manifest);
  }
}
