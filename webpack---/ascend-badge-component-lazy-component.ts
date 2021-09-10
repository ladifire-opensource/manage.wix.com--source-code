import { ReactLazyComponent } from 'react-module-container';
import { BADGE_COMPONENT } from './config';
import { TPrefetchParams } from '@wix/business-manager-api';

const minified = (debug) => (debug ? '' : '.min');

const getFiles = ({ debug, config: { topology } }) => {
  const { staticsUrl } = topology;

  return [
    `${staticsUrl}ascend-badge-component.bundle${minified(debug)}.js`,
    `${staticsUrl}ascend-badge-component${minified(debug)}.css`,
  ];
};

export class AscendBadgeLazyComponent extends ReactLazyComponent<any> {
  static prefetch(props: TPrefetchParams) {
    return getFiles(props);
  }

  constructor(props) {
    super(props, {
      files: getFiles(props),
      component: BADGE_COMPONENT,
    });
  }
}
