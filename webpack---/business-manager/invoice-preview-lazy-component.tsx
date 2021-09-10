import {
  ReactLazyComponent,
  ReactLazyComponentOptions
} from 'react-module-container';

import {
  TPrefetchParams,
  TModuleParams
} from '@wix/business-manager-api';

import { PREVIEW_COMPONENT_ID } from '../config';

const files = props => {
  const minified = debug => (debug ? '' : '.min');
  const baseUrl = props.config.topology.invoicesV2StaticsUrl;
  return [
    `${baseUrl}invoice-preview-app.bundle${minified(props.debug)}.js`,
    `${baseUrl}invoice-preview-app${minified(props.debug)}.css`
  ];
};

export class InvoicePreviewLazyComponent extends ReactLazyComponent {
  static prefetch(params: TPrefetchParams) {
    return files(params);
  }

  constructor(props: TModuleParams) {
    const options: ReactLazyComponentOptions = {
      files: files(props),
      component: PREVIEW_COMPONENT_ID
    };
    super(props, options);
  }
}
