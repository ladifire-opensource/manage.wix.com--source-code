import { ReactLazyComponent } from 'react-module-container';
import { BADGES_AUTOMATIONS_SMART_ACTION_ASSIGN_LAZY } from '../../constants/module-names';

export class BadgeAutomationActionLazyComponent extends ReactLazyComponent {
  static minifiedFiles = ['badge-action.bundle.js', 'badge-action.css'];

  constructor(props: {
    metaSiteId: string;
    locale: string;
    instance: string;
    config: { topology: { staticsUrl: string } };
  }) {
    super(props, {
      files: BadgeAutomationActionLazyComponent.getFiles(props.config.topology.staticsUrl),
      component: BADGES_AUTOMATIONS_SMART_ACTION_ASSIGN_LAZY,
    });
  }

  static getFiles(staticsUrl: string) {
    const files = BadgeAutomationActionLazyComponent.minifiedFiles;
    return files.map((relativePath) => `${staticsUrl}${relativePath}`);
  }
}
