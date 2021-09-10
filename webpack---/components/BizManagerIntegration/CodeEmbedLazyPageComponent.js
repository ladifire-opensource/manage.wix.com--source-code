import {ReactLazyComponent} from 'react-module-container';
import {PAGE_COMPONENT} from './config';

const minified = debug => debug ? '' : '.min';

const files = props => [
  `${props.config.staticsUrl}${PAGE_COMPONENT}.bundle${minified(props.debug)}.js`,
  `${props.config.staticsUrl}${PAGE_COMPONENT}.css`
];

const manifest = props => ({
  files: files(props),
  component: PAGE_COMPONENT
});

export class CodeEmbedLazyPageComponent extends ReactLazyComponent {
  constructor(props) {
    super(props, manifest(props));
  }
}
