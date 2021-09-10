import {
  ReactLazyComponent,
  ReactLazyComponentOptions
} from 'react-module-container';

import {
  TPrefetchParams,
  TModuleParams
} from '@wix/business-manager-api';

import { SUBSCRIPTIONS_RECURRING_COMPONENT_ROOT } from '../config';

const files = props => {
  const minified = debug => (debug ? '' : '.min');
  const baseUrl = props.config.topology.invoicesV2StaticsUrl;
  return [
    `${baseUrl}invoices-for-subscription.bundle${minified(props.debug)}.js`,
    `${baseUrl}invoices-for-subscription${minified(props.debug)}.css`
  ];
};

export class InvoicesAtSubscriptionLazyComponent extends ReactLazyComponent {
  static prefetch(params: TPrefetchParams) {
    return files(params);
  }

  constructor(props: TModuleParams) {
    const options: ReactLazyComponentOptions = {
      files: files(props),
      component: SUBSCRIPTIONS_RECURRING_COMPONENT_ROOT
    };
    super(props, options);
  }
}
