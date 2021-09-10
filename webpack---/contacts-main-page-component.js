import { ReactLazyComponent, ModuleRegistry } from 'react-module-container';

export class ContactsLazyComponent extends ReactLazyComponent {
  static debugFiles = ['client-module.bundle.js', 'app.css'];
  static minifiedFiles = ['client-module.bundle.min.js', 'app.min.css'];

  constructor(props) {
    super(props, {
      files: ContactsLazyComponent.getFiles(props),
      component: 'Contacts.main',
    });
  }

  static getFiles(props) {
    let files;
    if (props.debug) {
      files = ContactsLazyComponent.debugFiles;
    } else {
      files = ContactsLazyComponent.minifiedFiles;
    }
    return files.map(
      (relativePath) =>
        `${props.config.topology.contactsStaticsUrl}${relativePath}`,
    );
  }
}

ModuleRegistry.registerComponent('Contacts', () => ContactsLazyComponent);
ModuleRegistry.registerComponent('contacts', () => ContactsLazyComponent);
