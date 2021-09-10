import ReactLazyComponent from 'react-module-container/dist/src/react-lazy-component';
import { names } from '../../constants/names';

export class ContactPickerDropdownLazyComponent extends ReactLazyComponent {
  static debugFiles = [
    'contacts-picker-dropdown.bundle.js',
    'contacts-picker-dropdown.css',
  ];
  static minifiedFiles = [
    'contacts-picker-dropdown.bundle.min.js',
    'contacts-picker-dropdown.min.css',
  ];

  constructor(props) {
    super(props, {
      files: ContactPickerDropdownLazyComponent.getFiles(props),
      component: names.contactPickerDropdownLazy,
    });
  }

  static getFiles(props) {
    let files;
    if (props.debug) {
      files = ContactPickerDropdownLazyComponent.debugFiles;
    } else {
      files = ContactPickerDropdownLazyComponent.minifiedFiles;
    }
    return files.map(
      (relativePath) =>
        `${props.config.topology.contactsPickerStaticsUrl}${relativePath}`,
    );
  }
}
