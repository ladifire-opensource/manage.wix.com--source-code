import { ReactLazyComponent } from 'react-module-container';
import { getBusinessSettings } from '@wix/business-settings-api';

import { BADGE_SELECT_MODAL } from '../../constants/module-names';

export class BadgeSelectModalLazyComponent extends ReactLazyComponent {
  static minifiedFiles = ['badge-select-modal.bundle.js', 'badge-select-modal.css'];

  constructor(props: {
    metaSiteId: string;
    locale: string;
    instance: string;
    config: { topology: { staticsUrl: string } };
  }) {
    super(props, {
      files: BadgeSelectModalLazyComponent.getFiles(props.config.topology.staticsUrl),
      component: BADGE_SELECT_MODAL,
      resolve: () => {
        return Promise.all([getBusinessSettings(props.metaSiteId)]).then(([businessSettings]) => ({
          businessSettings,
        }));
      },
    });
  }

  static getFiles(staticsUrl: string) {
    const files = BadgeSelectModalLazyComponent.minifiedFiles;

    return files.map((relativePath) => `${staticsUrl}${relativePath}`);
  }
}
