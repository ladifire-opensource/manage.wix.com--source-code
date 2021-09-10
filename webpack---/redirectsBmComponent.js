import { ReactLazyComponent } from 'react-module-container';
import { REDIRECTS_LAZY_COMPONENT_NAME } from './config';

export default class RedirectsComponent extends ReactLazyComponent {
  constructor(props) {
    const url = props.config.topology.redirectsStaticsUrl;
    super(props, {
      component: REDIRECTS_LAZY_COMPONENT_NAME,
      files: [`${url}module.bundle.min.js`],
    });
  }
}
