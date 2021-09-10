import { ReactLazyComponent } from 'react-module-container';
import { names } from './constants/components';

export class ContactsWidgetLazyComponent extends ReactLazyComponent {
  static debugFiles = ['contacts-widget.bundle.js', 'contacts-widget.css'];
  static minifiedFiles = [
    'contacts-widget.bundle.min.js',
    'contacts-widget.min.css',
  ];

  constructor(props) {
    super(props, {
      files: ContactsWidgetLazyComponent.getFiles(props),
      component: names.contactsWidgetLazyComponent,
    });
  }

  static getFiles(props) {
    let files;
    if (props.debug) {
      files = ContactsWidgetLazyComponent.debugFiles;
    } else {
      files = ContactsWidgetLazyComponent.minifiedFiles;
    }
    return files.map(
      (relativePath) =>
        `${props.config.topology.contactsDashboardWidgetStaticsUrl}${relativePath}`,
    );
  }
}
