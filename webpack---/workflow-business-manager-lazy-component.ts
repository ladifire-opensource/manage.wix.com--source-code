import {ReactLazyComponent} from 'react-module-container';
import {BIZMGR_COMPONENT} from './consts';
import {TPrefetchParams} from '@wix/business-manager-api';
import {AutomationsMoveCardActionLazyComponent} from './automations-move-card-action-lazy';

const minified = (debug) => debug ? '' : '.min';

const prepareFiles = (files: string[], props: TPrefetchParams) => {
  return files.map(relativePath => `${props.config.topology.workflowStaticsUrl}${relativePath}`);
};

export class WorkflowBusinessManagerLazyComponent extends ReactLazyComponent {
  static files({debug}) {
    return [
      `workflow-main-component.bundle${minified(debug)}.js`,
      `workflow-main-component${minified(debug)}.css`
    ];
  }

  constructor(props) {
    super(props, {
      files: WorkflowBusinessManagerLazyComponent.getFiles(props),
      component: BIZMGR_COMPONENT
    });
  }

  static prefetch(props: TPrefetchParams) {
    const prefetchFiles = [
      ...this.files(props),
      ...AutomationsMoveCardActionLazyComponent.minifiedFiles
    ];
    return prepareFiles(prefetchFiles, props);
  }

  static getFiles(props: TPrefetchParams) {
    return prepareFiles(this.files(props), props);
  }
}
