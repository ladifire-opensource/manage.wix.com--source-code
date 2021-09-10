import { ReactLazyComponent } from 'react-module-container';
import { PATTERNS_LAZY_COMPONENT_NAME } from './config';

export default class PatternsComponent extends ReactLazyComponent {
  constructor(props) {
    const url = props.config.topology.patternsStaticsUrl;

    super(props, {
      component: PATTERNS_LAZY_COMPONENT_NAME,
      files: [`${url}module.bundle.min.js`],
    });
  }
}
