import { ReactLazyComponent } from 'react-module-container';
import { AUTOMATIONS_RECOMMENDATIONS_COMPONENT } from './config';
import { TPrefetchParams } from '@wix/business-manager-api';

const minified = debug => (debug ? '' : '.min');

const getFiles = ({ debug, config: { topology } }) => {
  const { smartActionsStaticsUrl } = topology;

  return [
    `${smartActionsStaticsUrl}automations-recommendations-component.bundle${minified(debug)}.js`,
    `${smartActionsStaticsUrl}automations-recommendations-component${minified(debug)}.css`
  ];
};

export class AutomationsRecommendationsLazyComponent extends ReactLazyComponent<any> {
  static prefetch(props: TPrefetchParams) {
    return getFiles(props);
  }

  constructor(props) {
    super(props, {
      files: getFiles(props),
      component: AUTOMATIONS_RECOMMENDATIONS_COMPONENT,
    });

  }
}
