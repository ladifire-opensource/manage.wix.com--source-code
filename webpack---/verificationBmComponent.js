import { ReactLazyComponent } from 'react-module-container';
import { VERIFICATION_LAZY_COMPONENT_NAME } from './config';

export default class VerificationComponent extends ReactLazyComponent {
  constructor(props) {
    const url = props.config.topology.verificationStaticsUrl;
    super(props, {
      component: VERIFICATION_LAZY_COMPONENT_NAME,
      files: [`${url}module.bundle.min.js`],
    });
  }
}
