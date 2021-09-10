import { ReactLazyComponent } from 'react-module-container';
import { AUTOMATIONS_DASHBOARD_COMPONENT } from './config';
import { TPrefetchParams } from '@wix/business-manager-api';

const minified = debug => (debug ? '' : '.min');

const getFiles = ({ debug, config: { topology } }) => {
  const { smartActionsStaticsUrl } = topology;

  return [
    `${smartActionsStaticsUrl}automations-dashboard-component.bundle${minified(debug)}.js`,
    `${smartActionsStaticsUrl}automations-dashboard-component${minified(debug)}.css`
  ];
};

export class AutomationsDashboardLazyComponent extends ReactLazyComponent<any> {
  static prefetch(props: TPrefetchParams) {
    return getFiles(props);
  }

  constructor(props) {
    super(props, {
      files: getFiles(props),
      component: AUTOMATIONS_DASHBOARD_COMPONENT,
    });

  }
}
