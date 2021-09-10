import ReactLazyComponent from 'react-module-container/dist/src/react-lazy-component';
import { names } from '../../constants/names';

export class ContactPickerOldLazyComponent extends ReactLazyComponent {
  static debugFiles = ['contacts-picker.bundle.js', 'contacts-picker.css'];
  static minifiedFiles = [
    'contacts-picker.bundle.min.js',
    'contacts-picker.min.css',
  ];

  constructor(props) {
    super(props, {
      files: ContactPickerOldLazyComponent.getFiles(props),
      component: names.contactPickerOldLazy,
    });
  }

  static getFiles(props) {
    let files;
    if (props.debug) {
      files = ContactPickerOldLazyComponent.debugFiles;
    } else {
      files = ContactPickerOldLazyComponent.minifiedFiles;
    }
    return files.map(
      (relativePath) =>
        `${props.config.topology.contactsPickerStaticsUrl}${relativePath}`,
    );
  }
}
