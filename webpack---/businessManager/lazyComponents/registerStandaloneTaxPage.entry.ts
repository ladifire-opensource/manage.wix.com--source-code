import {ModuleId, getModule} from '@wix/business-manager-api';
import {ReactLazyComponent} from 'react-module-container';
import {ComponentNames} from '../../consts';

export class TaxPageLazyComponent extends ReactLazyComponent {
  constructor(props) {
    const storeModule = getModule(ModuleId.Stores) as any;
    const basicUrl = storeModule.topology.taxStaticUrl;
    const debug = storeModule.getModuleParams().debug;
    const manifest = {
      files: [`${basicUrl}registerTaxPageComponent.bundle${debug ? '' : '.min'}.js`],
      component: ComponentNames.TaxPage,
      crossorigin: true,
    };
    super(props, manifest);
  }
}
