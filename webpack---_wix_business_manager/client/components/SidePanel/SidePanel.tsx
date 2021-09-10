import * as React from 'react';
import { ModuleRegistry } from 'react-module-container';
import * as css from './SidePanel.scss';
import {
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL,
  HIDE_SIDE_PANEL_LOADING_SIGNAL,
  REPORT_SIDE_PANEL_LOADED,
  ON_SIDE_PANEL_CLOSE,
  ON_SIDE_PANEL_OPEN,
  OpenSidePanelParams,
  SidePanelSize,
  onNavigation
} from '@wix/business-manager-api';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { SidePanelLoader } from './SidePanelLoader';
import { withErrorBoundary } from '@wix/business-manager-common-utils';
import SidePanelBackdrop from './SidePanelBackdrop';
import SidePanelErrorPage from './SidePanelErrorPage';

const SIDE_PANEL_SLIDE_TIME = 300; // Must match $transition-time in css

type SidePanelProps = {
  reportSidePanelOpened(panelName: string): void;
  reportSidePanelLoaded(panelName: string): void;
  reportSidePanelClosed(source: SIDE_PANEL_CLOSE_SOURCE, panelName: string): void;
};

type SidePanelState = {
  isOpened: boolean;
  shouldShowLoader: boolean;
  shouldShowContent: boolean;
  initiatingComponentName: string;
  requestedContent?: React.ReactElement<any>;
  backdrop: boolean;
  persistOnNavigation: boolean;
  size: SidePanelSize;
};

export enum SIDE_PANEL_CLOSE_SOURCE {
  APP = 'app',
  BUTTON = 'x_button_before_load',
  NAVIGATION = 'navigation',
  BACK_DROP = 'backdrop'
}

export class SidePanel extends React.PureComponent<SidePanelProps, SidePanelState> {
  readonly state = {
    isOpened: false,
    shouldShowLoader: false,
    shouldShowContent: false,
    initiatingComponentName: '',
    requestedContent: null,
    backdrop: false,
    persistOnNavigation: false,
    size: SidePanelSize.DEFAULT
  };

  private readonly maybeClosePanel = (source: SIDE_PANEL_CLOSE_SOURCE) => {
    const { isOpened, persistOnNavigation } = this.state;

    if (source === SIDE_PANEL_CLOSE_SOURCE.NAVIGATION && persistOnNavigation) {
      return;
    }

    if (isOpened) {
      this.setState({ isOpened: false });
      ModuleRegistry.notifyListeners(ON_SIDE_PANEL_CLOSE);
      this.props.reportSidePanelClosed(source, this.state.initiatingComponentName);
    }
  }

  private readonly hideLoadingSignal = () => {
    this.setState({ shouldShowLoader: false });
  }

  private readonly handleSidePanelLoaded = () => {
    const { isOpened } = this.state;

    if (isOpened) {
      this.hideLoadingSignal();
      this.props.reportSidePanelLoaded(this.state.initiatingComponentName);
    }
  }

  private readonly showContent = () => {
    this.setState({ shouldShowContent: true });
  }

  private readonly hideContent = () => {
    this.setState({ shouldShowContent: false });
  }

  componentDidMount() {
    ModuleRegistry.registerMethod(OPEN_SIDE_PANEL, () => ({ componentName, componentProps, backdrop = false, size = SidePanelSize.DEFAULT, persistOnNavigation = false }: OpenSidePanelParams) => {
      const Component = ModuleRegistry.component(componentName);
      if (Component) {
        const BoundedComponent = withErrorBoundary(SidePanelErrorPage)(Component);
        this.setState({
          initiatingComponentName: componentName,
          isOpened: true,
          backdrop,
          size,
          persistOnNavigation,
          shouldShowLoader: true,
          requestedContent: <BoundedComponent {...componentProps} />
        });
        ModuleRegistry.notifyListeners(ON_SIDE_PANEL_OPEN);
        this.props.reportSidePanelOpened(componentName);
      }
    });

    ModuleRegistry.registerMethod(CLOSE_SIDE_PANEL, () => () => this.maybeClosePanel(SIDE_PANEL_CLOSE_SOURCE.APP));
    ModuleRegistry.registerMethod(HIDE_SIDE_PANEL_LOADING_SIGNAL, () => this.hideLoadingSignal);
    ModuleRegistry.registerMethod(REPORT_SIDE_PANEL_LOADED, () => this.handleSidePanelLoaded);
    onNavigation(() => this.maybeClosePanel(SIDE_PANEL_CLOSE_SOURCE.NAVIGATION));
  }

  render() {
    const { isOpened, shouldShowLoader, shouldShowContent, requestedContent, backdrop, size } = this.state;
    const requestedContentContainerClassName = classNames({ [css.invisible]: shouldShowLoader }, css.sidePanelRequestedContentContainer);
    const sidePanelClassNames = classNames(css.sidePanel, {
      [css.large]: size === SidePanelSize.LARGE
    });

    const transitionClassNames = {
      enter: css.enter,
      enterActive: css.enterActive,
      exit: css.exit,
      exitActive: css.exitActive
    };
    const content = (
      <div className={css.sidePanelContentContainer} data-hook="side-panel-content-container">
        {shouldShowLoader && <SidePanelLoader onClose={() => {
          return this.maybeClosePanel(SIDE_PANEL_CLOSE_SOURCE.BUTTON);
        }}/>}
        <div className={requestedContentContainerClassName} data-hook="side-panel-requested-content-container">
          {requestedContent}
        </div>
      </div>
    );

    return (
      <div>
        <SidePanelBackdrop show={backdrop && isOpened} onClick={() => this.maybeClosePanel(SIDE_PANEL_CLOSE_SOURCE.BACK_DROP)}/>
        <CSSTransition in={isOpened} timeout={SIDE_PANEL_SLIDE_TIME} classNames={transitionClassNames}
                       onEntered={this.showContent} onExited={this.hideContent} mountOnEnter unmountOnExit>
          <div className={sidePanelClassNames} data-hook="side-panel">
            {shouldShowContent && content}
          </div>
        </CSSTransition>
      </div>
    );
  }
}
