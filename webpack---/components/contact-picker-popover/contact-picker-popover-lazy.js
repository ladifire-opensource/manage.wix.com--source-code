import ReactLazyComponent from 'react-module-container/dist/src/react-lazy-component';
import { names } from '../../constants/names';

export class ContactPickerPopoverLazyComponent extends ReactLazyComponent {
  static debugFiles = [
    'contacts-picker-popover.bundle.js',
    'contacts-picker-popover.css',
  ];
  static minifiedFiles = [
    'contacts-picker-popover.bundle.min.js',
    'contacts-picker-popover.min.css',
  ];

  constructor(props) {
    super(props, {
      files: ContactPickerPopoverLazyComponent.getFiles(props),
      component: names.contactPickerPopoverLazy,
    });
  }

  static getFiles(props) {
    let files;
    if (props.debug) {
      files = ContactPickerPopoverLazyComponent.debugFiles;
    } else {
      files = ContactPickerPopoverLazyComponent.minifiedFiles;
    }
    return files.map(
      (relativePath) =>
        `${props.config.topology.contactsPickerStaticsUrl}${relativePath}`,
    );
  }
}
