import { ReactLazyComponent } from 'react-module-container';
import { DISCOVER_CRM_TOOLS_MODAL_COMPONENT } from './config';
import { TPrefetchParams } from '@wix/business-manager-api';

const minified = (debug) => (debug ? '' : '.min');

const getFiles = ({ debug, config: { topology } }) => {
  const { staticsUrl } = topology;

  return [
    // tslint:disable-next-line:prettier
    `${staticsUrl}discover-crm-tools-modal-component.bundle${minified(debug)}.js`,
  ];
};

export class DiscoverCrmToolsModalLazyComponent extends ReactLazyComponent<
  any
> {
  static prefetch(props: TPrefetchParams) {
    return getFiles(props);
  }

  constructor(props) {
    super(props, {
      files: getFiles(props),
      component: DISCOVER_CRM_TOOLS_MODAL_COMPONENT,
    });
  }
}
