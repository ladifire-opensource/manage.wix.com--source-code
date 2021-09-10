import * as React from 'react';
import * as s from './HackyTemporarySecretsManagerLightBoxOverlay.scss';

const setZIndex = (hook: string, value: string) => window.document.querySelector(`[data-hook='${hook}']`)['style'].zIndex = value;
const setChildZIndex = (hook: string, value: string) => window.document.querySelector(`[data-hook='${hook}']`).firstElementChild['style'].zIndex = value;

const restoreZIndex = (hook: string) => setZIndex(hook, '');
const restoreChildZIndex = (hook: string) => setChildZIndex(hook, '');

export class HackyTemporarySecretsManagerLightBoxOverlay extends React.Component {
  state = { lightBoxOverlay: false };

  componentDidMount() {
    window.addEventListener('message', event => {
      if (event.data.keyManagerEvent) {
        const { type } = event.data.keyManagerEvent;
        switch (type) {
          case 'OPEN_LIGHTBOX_OVERLAY':
            setZIndex('velo-wrapper', '11');
            setChildZIndex('sidebar', 'unset');

            this.setState({ lightBoxOverlay: true });
            break;
          case 'CLOSE_LIGHTBOX_OVERLAY':
            restoreZIndex('velo-wrapper');
            restoreChildZIndex('sidebar');

            this.setState({ lightBoxOverlay: false });
            break;
          default:
            break;
        }
      }
    });
  }

  render() {
    return this.state.lightBoxOverlay && <div className={s.overlay} />;
  }
}
