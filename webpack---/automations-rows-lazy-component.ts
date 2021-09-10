import { TPrefetchParams } from '@wix/business-manager-api';
import { ReactLazyComponent } from 'react-module-container';
import { AUTOMATIONS_ROWS_COMPONENT } from './config';

const minified = debug => (debug ? '' : '.min');

const getFiles = ({ debug, config: { topology } }) => {
  const { smartActionsStaticsUrl } = topology;

  return [
    `${smartActionsStaticsUrl}automations-rows-component.bundle${minified(debug)}.js`,
    `${smartActionsStaticsUrl}automations-rows-component${minified(debug)}.css`
  ];
};

export class AutomationsRowsLazyComponent extends ReactLazyComponent<any> {
  static prefetch(props: TPrefetchParams) {
    return getFiles(props);
  }

  constructor(props) {
    super(props, {
      files: getFiles(props),
      component: AUTOMATIONS_ROWS_COMPONENT,
    });

  }
}
