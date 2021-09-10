import {ReactLazyComponent} from 'react-module-container';
import {WORKFLOWS_WIDGET} from './consts';

const minified = (debug) => debug ? '' : '.min';

export class WorkflowsWidgetLazyComponent extends ReactLazyComponent {
  static files({debug}) {
    return [
      `workflows-widget.bundle${minified(debug)}.js`,
      `workflows-widget${minified(debug)}.css`
    ];
  }

  constructor(props) {
    super(props, {
      files: WorkflowsWidgetLazyComponent.getFiles(props),
      component: WORKFLOWS_WIDGET
    });
  }

  static getFiles(props) {
    const files = this.files(props);

    return files.map(relativePath => `${props.staticsUrl}${relativePath}`);
  }
}
