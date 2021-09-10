import {ReactLazyComponent} from 'react-module-container';
import {WORKFLOWS_MOVE_CARD_AUTOMATIONS_ACTION} from './consts';

export class AutomationsMoveCardActionLazyComponent extends ReactLazyComponent {
  static minifiedFiles = [
    'automations-move-card-action.bundle.min.js',
    'automations-move-card-action.min.css'
  ];

  constructor(props) {
    super(props, {
      files: AutomationsMoveCardActionLazyComponent.getFiles(props.staticsUrl),
      component: WORKFLOWS_MOVE_CARD_AUTOMATIONS_ACTION
    });
  }

  static getFiles(workflowsStaticsUrl) {
    const files = AutomationsMoveCardActionLazyComponent.minifiedFiles;

    return files.map(relativePath => `${workflowsStaticsUrl}${relativePath}`);
  }
}
