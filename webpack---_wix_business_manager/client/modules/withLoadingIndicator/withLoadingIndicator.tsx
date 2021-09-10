import * as React from 'react';
import * as css from './withLoadingIndicator.scss';
import { ModuleRegistry } from 'react-module-container';
import { Loader } from 'wix-style-react';
import { CSSTransition } from 'react-transition-group';
import { withTranslation } from '@wix/wix-i18n-config';
import classNames from 'classnames';
import { VIEW_START_LOADING, VIEW_FINISHED_LOADING, HIDE_LOADING_SIGNAL } from '@wix/business-manager-api';

// The loading indicator needs store some global static to show the text message only on the
// first load.// But in when testing if any other test calls notifyViewStartLoading() it will change this
// state a the unit tests will fail, so adding them as a static to the exposed module allows
// resetting this state for tests.
withLoadingIndicator.isFirstLoad = true;

// Can't use wix-animations easily because we need `mountOnEnter`.
const FadeIn = (props) => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      mountOnEnter={true}
      timeout={100}
      classNames={{
        appear: css.transparent
      }}>
      <div className={css.opaque}>{props.children}</div>
    </CSSTransition>
  );
};

export function withLoadingIndicator(WrappedComponent) {

  class LoadingIndicatorEnricher extends React.Component<any, { isLoading: boolean }> {

    private viewStartLoadingSubscription;
    private viewFinishedLoadingSubscription;
    private hideLoadingSignalRequestSubscription;

    constructor(props) {
      super(props);
      this.state = { isLoading: true };
    }

    private readonly startLoading = () => {
      this.setState({ isLoading: true });
    }

    private readonly finishLoading = () => {
      this.setState({ isLoading: false });
      withLoadingIndicator.isFirstLoad  = false;
    }

    componentDidMount() {
      this.viewStartLoadingSubscription = ModuleRegistry.addListener(VIEW_START_LOADING, this.startLoading);
      this.viewFinishedLoadingSubscription = ModuleRegistry.addListener(VIEW_FINISHED_LOADING, this.finishLoading);
      this.hideLoadingSignalRequestSubscription = ModuleRegistry.addListener(HIDE_LOADING_SIGNAL, this.finishLoading);
    }

    componentWillUnmount() {
      this.viewStartLoadingSubscription.remove();
      this.viewFinishedLoadingSubscription.remove();
      this.hideLoadingSignalRequestSubscription.remove();
    }

    render() {
      const { t } = this.props;
      const { isLoading } = this.state;
      const fadeInLoadingText = <FadeIn>{t('loading')}</FadeIn>;
      const containerClassNames = classNames(css.container, {
        [css.invisible]: isLoading
      });
      const loaderText = withLoadingIndicator.isFirstLoad  ? fadeInLoadingText : '';

      return (
        <div className={css.wrapper}>
          {isLoading && <div className={css.loaderContainer}><Loader dataHook="loader" text={loaderText}/></div>}
          <div className={containerClassNames}>
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  }

  return withTranslation()(LoadingIndicatorEnricher);
}
