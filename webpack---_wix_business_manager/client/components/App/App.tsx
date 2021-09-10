import * as React from 'react';
import './Global.scss';
import * as css from './App.scss';
import { createFedopsLogger } from '../../services/essentials';
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper.container';
import { IViewMode } from '@wix/business-manager-api';
import { ModuleRegistryIntegrator } from '../../modules/moduleRegistryIntegrator/ModuleRegistryIntegrator';
import { SideBarWrapper } from '../SideBarWrapper/SideBarWrapper';
import { sendBusinessManagerBI, setLoggerDefaults, getBIHostingApp } from '../../services/BIService';
import { BIEvents } from '../../../common/consts/bi';
import * as PropTypes from 'prop-types';
import { PageComponentLifecycleBI } from '../../modules/pageComponentLifecycle/PageComponentLifecycleBI';
import Toast from '../Toast/Toast.container';
import SidePanel from '../SidePanel/SidePanel.container';
import { TipsPanel } from '../TipsPanel/TipsPanel';
import { UnauthorizedPage } from '../UnauthorizedPage/UnauthorizedPage';
import * as SupportChatWidgetApi from '../../services/SupportChatWidgetApi';
import NoPermissionsPage from '../NoPermissionsPage/NoPermissionsPage.container';
import { DataCapsule, LocalStorageStrategy } from 'data-capsule';
import { isInitialLoad, setIsInitialLoad } from '../../services/isInitialLoad';
import { Overlay } from '../Overlay/Overlay';
import { bsiManagerInstance } from '../../services/initSessionBi/initSessionBi'

export interface IAppProps {
  siteId: string;
  ownerId: string;
  rolesString: string;
  viewMode: IViewMode;
  showChatWidget: boolean;
  unauthorizedPageRequested: boolean;
  noPermissionsPageRequested: boolean;
  locale: string;
  shouldAddGetBsiToLogger: boolean;
  showOverlay: boolean;
  useOverlayComponent: boolean;

  getInstanceId(appDefId: string): string;
}

export class App extends React.Component<IAppProps> {

  private readonly fedopsLogger;
  private readonly appsFedopsLogger;
  private pageComponentLifecycleBI: PageComponentLifecycleBI;

  static childContextTypes = {
    fedopsLogger: PropTypes.object,
    appsFedopsLogger: PropTypes.object
  };

  getChildContext() {
    return { fedopsLogger: this.fedopsLogger, appsFedopsLogger: this.appsFedopsLogger };
  }

  constructor(props: IAppProps) {
    super(props);
    const { siteId, rolesString, ownerId, showChatWidget, shouldAddGetBsiToLogger } = props;
    this.fedopsLogger = createFedopsLogger('business-manager');
    this.appsFedopsLogger = createFedopsLogger('business-manager-apps');
    if (shouldAddGetBsiToLogger){
      setLoggerDefaults({ ownerId, roles: rolesString, _bsi: () => bsiManagerInstance.getBsi() });
    } else {
      setLoggerDefaults({ ownerId, roles: rolesString });
    }
    if (showChatWidget) {
      SupportChatWidgetApi.init(siteId);
    }
  }

  UNSAFE_componentWillMount() {
    this.pageComponentLifecycleBI = new PageComponentLifecycleBI(this.props.siteId, getBIHostingApp(this.props.viewMode), this.props.getInstanceId);
  }

  componentWillUnmount() {
    this.pageComponentLifecycleBI.dispose();
  }

  componentDidMount() {
    window.requestAnimationFrame(() => {
      this.fedopsLogger.appLoaded();
      this.appsFedopsLogger.appLoaded();
      this.sendFinishedLoadingEvent(); //tslint:disable-line:no-floating-promises
    });
  }

  private async sendFinishedLoadingEvent() {
    const dataCapsule = new DataCapsule({
      strategy: new LocalStorageStrategy(),
      namespace: 'wix-business-manager'
    });

    const startLoadingTime = window.__bi_performance_start_time__;
    sendBusinessManagerBI({
      evid: BIEvents.finishedLoading,
      msid: this.props.siteId,
      app_id: null,
      hosting: getBIHostingApp(this.props.viewMode),
      initial_load: await isInitialLoad(dataCapsule, BIEvents.finishedLoading),
      loading_time: Math.round(performance.now() - startLoadingTime)
    });
    setIsInitialLoad(dataCapsule, BIEvents.finishedLoading);
  }

  render() {
    const { viewMode, unauthorizedPageRequested, locale, children, noPermissionsPageRequested, showOverlay, useOverlayComponent } = this.props;

    return (
      <div className={css.appWrapper} data-hook="bsm-main-container">
        <ModuleRegistryIntegrator/>
        <HeaderWrapper hostingApp={viewMode}/>
        <div className={css.appBody}>
          {noPermissionsPageRequested ?
            <NoPermissionsPage/> :
            <>
              <SideBarWrapper/>
              <div data-hook="right-side-area" className={css.rightSideArea}>
                <Toast/>
                <div data-hook="content-and-side-panel-area"  className={css.rightSideContent}>
                  <div data-hook="content-area" className={css.contentArea} >
                    <div className={css.mainContentContainer}>
                      <div className={css.mainContent}>
                        {unauthorizedPageRequested ? <UnauthorizedPage locale={locale}/> : children}
                      </div>
                    </div>
                  </div>
                  <TipsPanel/>
                  <SidePanel/>
                </div>
              </div>
            </>
          }
          { showOverlay && useOverlayComponent && <Overlay/> }
        </div>
      </div>
    );
  }
}
