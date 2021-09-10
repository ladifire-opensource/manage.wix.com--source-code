import * as React from 'react';
import * as css from './SidePanelLoader.scss';
import { CloseButton, Loader, FontUpgrade } from 'wix-style-react';
import { withTranslation, WithTranslation } from '@wix/wix-i18n-config';

const SHOW_LOADING_SIGNAL_DELAY = 200;

type SidePanelLoaderProps = WithTranslation & {
  onClose(): void;
};

type SidePanelLoaderState = {
  isVisible: boolean;
};

class SidePanelLoaderComponent extends React.PureComponent<SidePanelLoaderProps, SidePanelLoaderState> {
  state = { isVisible: false };
  timer = null;

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.timer = null;
      this.setState({ isVisible: true });
    }, SHOW_LOADING_SIGNAL_DELAY);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const { isVisible } = this.state;
    if (!isVisible) {
      return null;
    }
    const { t, onClose } = this.props;

    return (
      <FontUpgrade>
        <div className={css.sidePanelLoaderWrapper}>
          <div className={css.closeButtonWrapper}>
            <CloseButton size="large" dataHook="close-button" onClick={onClose}/>
          </div>
          <Loader text={t('side-panel.loading')} dataHook="side-panel-loader"/>
        </div>
      </FontUpgrade>
    );
  }
}

export const SidePanelLoader = withTranslation()(SidePanelLoaderComponent);
