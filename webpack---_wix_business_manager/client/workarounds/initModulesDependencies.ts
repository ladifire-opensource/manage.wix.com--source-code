import * as reactModuleContainer from 'react-module-container';
import axios from 'axios';
import * as BusinessManagerAPI from '@wix/business-manager-api';

window['BusinessManagerAPI'] = BusinessManagerAPI;
window['ReactLazyComponent'] = reactModuleContainer.ReactLazyComponent;
window['AngularLazyComponent'] = reactModuleContainer.AngularLazyComponent;
window['reactModuleContainer'] = reactModuleContainer;
window['axios'] = axios;

//****************HACK: freezing window.React to protect it.. ****************************
const originalReact = window['React'];
Object.defineProperty(window, 'React', {
  get: () => originalReact,
  set: newReact => {
    window['lastReactOverride'] = newReact;
    console.warn('Tried overriding React with: ', newReact);
  },
  enumerable: true,
  configurable: true
});
