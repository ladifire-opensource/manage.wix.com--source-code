import { ReactLazyComponent } from 'react-module-container';
import { names } from '../../constants/components';
import { fedopsLogger } from '../../common/fedops';

export class ContactPanelLazyComponent extends ReactLazyComponent {
  static debugFiles = ['contact-panel.bundle.js', 'contact-panel.css'];
  static minifiedFiles = [
    'contact-panel.bundle.min.js',
    'contact-panel.min.css',
  ];

  constructor(props) {
    super(props, {
      files: ContactPanelLazyComponent.getFiles(props),
      component: names.contactPanelLazy,
    });

    fedopsLogger.interactionStarted('contact-panel-load');
  }

  static getFiles(props) {
    let files;
    if (props.debug) {
      files = ContactPanelLazyComponent.debugFiles;
    } else {
      files = ContactPanelLazyComponent.minifiedFiles;
    }
    return files.map(
      (relativePath) =>
        `${props.config.topology.contactsStaticsUrl}${relativePath}`,
    );
  }
}
