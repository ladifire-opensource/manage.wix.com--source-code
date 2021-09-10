import { ReactLazyComponent } from 'react-module-container';
import { TPrefetchParams } from '@wix/business-manager-api';
import { IUpgradeButtonLazyComponentProps } from './config';

const minified = (debug) => (debug ? '' : '.min');

const getFiles = ({ debug, config: { topology } }) => {
  const { staticsUrl } = topology;

  return [
    `${staticsUrl}ascend-upgrade-button-component.bundle${minified(debug)}.js`,
    `${staticsUrl}ascend-upgrade-button-component${minified(debug)}.css`,
  ];
};

export class AscendUpgradeButtonLazyComponent extends ReactLazyComponent<
  IUpgradeButtonLazyComponentProps
> {
  static prefetch(props: TPrefetchParams) {
    return getFiles(props);
  }

  constructor(props: IUpgradeButtonLazyComponentProps) {
    super(props, {
      files: getFiles(props),
      component: 'ascend-upgrade-button-component',
    });
  }
}
