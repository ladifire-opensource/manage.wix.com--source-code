import { ReactLazyComponent } from 'react-module-container';
import { ROBOTS_LAZY_COMPONENT_NAME } from './config';

export default class RobotsComponent extends ReactLazyComponent {
  constructor(props) {
    const url = props.config.topology.robotsStaticsUrl;
    super(props, {
      component: ROBOTS_LAZY_COMPONENT_NAME,
      files: [`${url}module.bundle.min.js`],
    });
  }
}
