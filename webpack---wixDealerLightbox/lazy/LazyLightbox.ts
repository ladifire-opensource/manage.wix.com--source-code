import {ReactLazyComponent} from 'react-module-container';
import {LightboxViewerProps} from '../interfaces';

const fileNames = (debug: boolean) => [
  `dealer-lightbox-module.bundle${debug ? '' : '.min'}.js`,
  `dealer-lightbox-module${debug ? '' : '.min'}.css`,
];

export class LazyLightbox extends ReactLazyComponent<LightboxViewerProps> {
  constructor(props: any) {
    if (props.viewerUrl) {
      super(props, {
        files: fileNames(props.debug).map(fileName => `${props.viewerUrl}${fileName}`),
        component: 'LightboxViewer.main',
      });
    } else {
      throw new Error('No dealer-lightbox-module url supplied');
    }
  }
}
