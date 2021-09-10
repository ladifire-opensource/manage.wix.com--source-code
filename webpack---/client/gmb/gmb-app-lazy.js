import { ReactLazyComponent } from 'react-module-container';

import { GMB_APP } from '../component-name';

const minified = (debug) => (debug ? '' : '.min');

const files = ({ config, debug }) => {
  const staticsUrl = config.topology.staticsUrl;
  return [
    `${staticsUrl}gmb-app.bundle${minified(debug)}.js`,
    `${staticsUrl}gmb-app${minified(debug)}.css`,
  ];
};

export class GmbAppLazy extends ReactLazyComponent {
  static prefetch(params) {
    return files(params);
  }

  constructor(props) {
    super(props, {
      files: files(props),
      component: GMB_APP,
    });
  }
}
