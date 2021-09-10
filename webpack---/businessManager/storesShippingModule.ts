import {
  BusinessManagerModule,
  ModuleId,
  PageComponentId,
  registerPageComponentMonitors,
  registerModule,
  GET_CURRENT_INSTANCE_METHOD_NAME,
} from '@wix/business-manager-api';
import {trackSettingsChange} from '../shippingAndTax/businessManagerIntegration/shippingBusinessManagerIntegrationService';
import {AngularLazyComponent} from 'react-module-container';
import {ECOM_APPDEFID} from '@wix/wixstores-dashboard-storemanager-common/dist/src/common/constants/tpa';
import {createManifest, getFilesList, TPageComponentProps} from './businessManager';
import * as Sentry from '@sentry/browser';
import {ComponentNames} from '../consts';
import {FullfilmentServicesLazyComponent} from './lazyComponents/registerStandaloneFulfillmentServicesPage.entry';
import {TaxPageLazyComponent} from './lazyComponents/registerStandaloneTaxPage.entry';
import {ShippingGroupsModalLazyComponent} from './lazyComponents/registerStandaloneShippingGroupsComponent.entry';

class StoreManagerComp extends AngularLazyComponent {
  public static prefetch(params: TPageComponentProps): string[] {
    return getFilesList(params);
  }

  constructor(props) {
    super(props, createManifest(props));
  }
}

class StoresShippingModule extends BusinessManagerModule {
  constructor(moduleId: ModuleId) {
    super(moduleId);
    this.setModuleConfigurationId(ModuleId.Stores);
    window.ModuleRegistry.registerComponent(PageComponentId.StoresShipping, () => StoreManagerComp);

    this.registerComponentWithModuleParams(
      ComponentNames.FulfillmentServicesPageLazy,
      FullfilmentServicesLazyComponent
    );
    window.ModuleRegistry.registerComponent(ComponentNames.TaxPageLazy, () => TaxPageLazyComponent);
    window.ModuleRegistry.registerComponent(
      ComponentNames.ShippingGroupsModalLazy,
      () => ShippingGroupsModalLazyComponent
    );
  }

  public init(): void {
    const sentryClient = new Sentry.BrowserClient({
      dsn: 'https://18f0fa79daa548eebeefa1d50166a78f@o37417.ingest.sentry.io/5542663',
    });
    registerPageComponentMonitors(PageComponentId.StoresShipping, {sentryClient});

    const instanceResolver = () => window.ModuleRegistry.invoke(GET_CURRENT_INSTANCE_METHOD_NAME, ECOM_APPDEFID);

    try {
      trackSettingsChange(instanceResolver);
    } catch (e) {
      sentryClient.captureException(e);
    }
  }
}

registerModule(ModuleId.StoresShipping, StoresShippingModule);
