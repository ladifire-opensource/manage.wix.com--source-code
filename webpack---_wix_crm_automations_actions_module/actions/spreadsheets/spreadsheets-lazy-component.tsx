import { ReactLazyComponent } from 'react-module-container';

export const SPREADSHEETS_ACTION_LAZY_COMPONENT =
  'spreadsheets-action-lazy-component';
const SPREADSHEETS_COMPONENT_NAME = 'spreadsheets-action-component';

export class SpreadsheetsActionLazyComponent extends ReactLazyComponent {
  static readonly debugFiles = [
    'spreadsheets-component.bundle.js',
    'spreadsheets-component.css',
  ];
  static readonly minifiedFiles = [
    'spreadsheets-component.bundle.min.js',
    'spreadsheets-component.min.css',
  ];

  constructor(props) {
    super(props, {
      files: SpreadsheetsActionLazyComponent.getFiles(props),
      component: SPREADSHEETS_COMPONENT_NAME,
    });
  }

  static getFiles(props) {
    const files = props.debug
      ? SpreadsheetsActionLazyComponent.debugFiles
      : SpreadsheetsActionLazyComponent.minifiedFiles;

    return files.map(
      (relativePath) =>
        `${props.config.topology.automationsSpreadsheetsStaticsUrl}${relativePath}`,
    );
  }
}
