import { ReactLazyComponent } from 'react-module-container';
import { getBusinessSettings } from '@wix/business-settings-api';

import { BADGE_SETUP_MODAL } from '../../constants/module-names';

export class BadgeSetupModalLazyComponent extends ReactLazyComponent {
  static minifiedFiles = ['badge-setup-modal.bundle.js', 'badge-setup-modal.css'];

  constructor(props: {
    metaSiteId: string;
    locale: string;
    instance: string;
    config: { topology: { staticsUrl: string } };
  }) {
    super(props, {
      files: BadgeSetupModalLazyComponent.getFiles(props.config.topology.staticsUrl),
      component: BADGE_SETUP_MODAL,
      resolve: () => {
        return Promise.all([getBusinessSettings(props.metaSiteId)]).then(([businessSettings]) => ({
          businessSettings,
        }));
      },
    });
  }

  static getFiles(staticsUrl: string) {
    const files = BadgeSetupModalLazyComponent.minifiedFiles;

    return files.map((relativePath) => `${staticsUrl}${relativePath}`);
  }
}
