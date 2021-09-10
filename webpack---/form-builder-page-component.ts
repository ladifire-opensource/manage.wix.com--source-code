import { ReactLazyComponent } from 'react-module-container';
import { APP_BUNDLE_ENTRIES } from './constants';
import { COMPONENT_ID } from './config';

const minified = (debug) => (debug ? '' : '.min');

const getFiles = ({ debug, config: { topology } }) => {
  const { WIX_FORMS_PAGE_COMPONENT } = APP_BUNDLE_ENTRIES;
  const { wixFormsStaticsUrl, autoCmsStaticsUrl } = topology;

  return [
    `${wixFormsStaticsUrl}${WIX_FORMS_PAGE_COMPONENT}.bundle${minified(
      debug,
    )}.js`,
    `${wixFormsStaticsUrl}${WIX_FORMS_PAGE_COMPONENT}${minified(debug)}.css`,
    autoCmsStaticsUrl && `${autoCmsStaticsUrl}BMEmbeddedView.js`,
  ].filter((f) => f);
};

export class WixFormsLazyComponent extends ReactLazyComponent {
  constructor(props) {
    super(props, {
      files: getFiles(props),
      component: COMPONENT_ID,
    });
  }
}
