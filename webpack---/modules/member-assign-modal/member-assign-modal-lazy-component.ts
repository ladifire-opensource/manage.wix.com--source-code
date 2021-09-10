import { ReactLazyComponent } from 'react-module-container';
import { getBusinessSettings } from '@wix/business-settings-api';

import { MEMBER_ASSIGN_MODAL } from '../../constants/module-names';

export class MemberAssignModalLazyComponent extends ReactLazyComponent {
  static minifiedFiles = ['member-assign-modal.bundle.js', 'member-assign-modal.css'];

  constructor(props: {
    metaSiteId: string;
    locale: string;
    instance: string;
    config: { topology: { staticsUrl: string } };
  }) {
    super(props, {
      files: MemberAssignModalLazyComponent.getFiles(props.config.topology.staticsUrl),
      component: MEMBER_ASSIGN_MODAL,
      resolve: () => {
        return Promise.all([getBusinessSettings(props.metaSiteId)]).then(([businessSettings]) => ({
          businessSettings,
        }));
      },
    });
  }

  static getFiles(staticsUrl: string) {
    const files = MemberAssignModalLazyComponent.minifiedFiles;

    return files.map((relativePath) => `${staticsUrl}${relativePath}`);
  }
}
