import * as React from 'react';
import { ReactLazyComponent } from 'react-module-container';
import { PAGE_COMPONENT } from './config';

const minified = (debug) => debug ? '' : '.min';

const files = (props) => [
  `${props.config.topology.staticsUrl}${PAGE_COMPONENT}.bundle${minified(props.debug)}.js`,
  `${props.config.topology.staticsUrl}${PAGE_COMPONENT}${minified(props.debug)}.css`,
];

const manifest = props => ({
  files: files(props),
  component: PAGE_COMPONENT
});

export class GdprUsersClientAppLazyPageComponent extends (ReactLazyComponent as React.ComponentClass<void>) {
  constructor(props) {
    super(props, manifest(props));
  }
}
