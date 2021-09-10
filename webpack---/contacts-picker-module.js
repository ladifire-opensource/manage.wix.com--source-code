import {
  BusinessManagerModule,
  registerModule,
  ModuleId,
} from '@wix/business-manager-api';
import { ModuleRegistry, ReactLoadableComponent } from 'react-module-container';
import { CONTACTS_PICKER_MODULE_ID, COMPONENT_NAME } from './config';
import { ContactPickerPopoverLazyComponent } from './components/contact-picker-popover/contact-picker-popover-lazy';
import { ContactPickerDropdownLazyComponent } from './components/contact-picker-dropdown/contact-picker-dropdown-lazy';
import { ContactPickerOldLazyComponent } from './components/contact-picker-old/contact-picker-old-lazy';
import * as React from 'react';

class ContactsPickerBMModule extends BusinessManagerModule {
  static CONTACT_PICKER = 'contact-picker';
  static CONTACT_PICKER_POPOVER = 'contact-picker-popover';
  static CONTACT_PICKER_WSR = 'contact-picker-wsr';
  static CONTACT_PICKER_DROPDOWN = 'contact-picker-dropdown';

  constructor(moduleId) {
    super(moduleId);
    this.setModuleConfigurationId(ModuleId.Contacts);
    this.registerPageComponent(
      COMPONENT_NAME,
      ReactLoadableComponent(COMPONENT_NAME, () =>
        import(/* webpackPrefetch: true */ './client'),
      ),
    );

    ModuleRegistry.registerComponent(
      ContactsPickerBMModule.CONTACT_PICKER_POPOVER,
      () => this.withModuleParams(ContactPickerPopoverLazyComponent),
    );

    ModuleRegistry.registerComponent(
      ContactsPickerBMModule.CONTACT_PICKER_WSR,
      () => this.withModuleParams(ContactPickerPopoverLazyComponent),
    );

    ModuleRegistry.registerComponent(
      ContactsPickerBMModule.CONTACT_PICKER_DROPDOWN,
      () => this.withModuleParams(ContactPickerDropdownLazyComponent),
    );

    ModuleRegistry.registerComponent(
      ContactsPickerBMModule.CONTACT_PICKER,
      () => this.withModuleParams(ContactPickerOldLazyComponent),
    );
  }

  withModuleParams = (Comp) => {
    const contactsModule = ModuleRegistry.getModule(ModuleId.Contacts);
    const moduleParams = contactsModule.moduleParams;
    const experiments = contactsModule.getExperiments();

    return (props) => (
      <Comp experiments={experiments} {...props} {...moduleParams} />
    );
  };
}

registerModule(CONTACTS_PICKER_MODULE_ID, ContactsPickerBMModule);
