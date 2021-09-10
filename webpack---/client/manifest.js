import axios from 'axios';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import componentName from './component-name';
import { ReactLazyComponent } from 'react-module-container';

const files = ({ config, topology }) => {
  const staticsUrl = (config.topology || topology).staticsUrl;
  return [[`${staticsUrl}component.bundle.min.js`, `${staticsUrl}app.min.css`]];
};
export default class MarketingIntegrationLazyComponent extends ReactLazyComponent {
  static prefetch(params) {
    return files(params);
  }

  constructor(props) {
    const staticsUrl = (props.config.topology || props.topology).staticsUrl;
    const manifest = {
      files: files(props),
      resolve: async () => {
        const instance = getCurrentInstance(appDefIds.marketingIntegration);
        return axios
          .get('/_api/marketing-integration/bootstrap', {
            headers: { instance, Authorization: instance },
          })
          .then(({ data }) => ({
            ...props,
            staticsUrl,
            ...data,
          }))
          .catch((e) => {
            const emptyBootstrapResponse = {
              embeddedIntegrations: {},
              widgets: [],
              premium: false,
            };
            return {
              ...emptyBootstrapResponse,
              staticsUrl,
              error: e,
            };
          });
      },
      component: componentName,
    };

    super(props, manifest);
  }
}
