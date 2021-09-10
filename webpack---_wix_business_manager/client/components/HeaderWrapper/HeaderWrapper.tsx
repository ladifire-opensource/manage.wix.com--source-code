import * as React from 'react';
import {
  Header,
  EditorHeader,
  EditorXHeader,
  AdiHeader,
  AccountLevelHeader,
  IHeaderProps,
  SiteLevelLazyComponent,
  AccountLevelLazyComponent,
  EditorXLazyComponent,
  EditorLazyComponent,
  ADILazyComponent,
  ICurrentPage
} from '@wix/my-account-header';
import { SmartLink } from '../../navigation/SmartLink';
import { ModuleRegistry } from 'react-module-container';
import { IViewMode, CoBrandingParams } from '@wix/business-manager-api';
import { ExperimentsBag } from '@wix/wix-experiments';

function getDefaultState() {
  return {
    help: undefined
  };
}

interface IHeaderState {
  help: object;
}

export interface IHeaderWrapperProps {
  help?: object;
  metaSiteId: string;
  isDebug: boolean;
  navigationComponent?: any;
  experiments: ExperimentsBag;
  locale: any;
  pageComponentsInfo?: object;
  hostingApp?: string;
  isADIEditorType: boolean;
  pingNotificationsWidgetStaticsUrl: string;
  searchEverythingWidgetStaticsUrl: string;
  inboxHeaderWidgetStaticsUrl: string;
  dashboardAnswersWidgetStaticsVersion: string;
  headerClientStaticsUrl: string;
  isInExpertsDashboard: boolean;
  isSiteOwner: boolean;
  sitePermissions: string[];
  coBranding: CoBrandingParams;
  isEditorX: boolean;
  useLazyLoadedHeaders: boolean;
  passInstanceToNonLazySiteLevelHeader: boolean;
  instance: string;
}

export class HeaderWrapper extends React.Component<IHeaderWrapperProps, IHeaderState> {
  private readonly moduleUnloadedSubscription;
  constructor(props: IHeaderWrapperProps) {
    super(props);
    this.state = getDefaultState();
    ModuleRegistry.registerMethod('businessManager.setHelpArticle', () => helpConfig => {
        this.setState({ help: helpConfig });
      });

    this.moduleUnloadedSubscription = ModuleRegistry.addListener('businessManager.pageComponentWillUnmount', () => {
      this.setState(getDefaultState());
    });
  }

  componentWillUnmount() {
    this.moduleUnloadedSubscription.remove();
  }

  render() {
    const isEditor = this.props.hostingApp === IViewMode.EDITOR;
    const isADI = this.props.hostingApp === IViewMode.ADI;
    const { help, metaSiteId, isDebug, navigationComponent, experiments, pageComponentsInfo, isADIEditorType, locale, pingNotificationsWidgetStaticsUrl, searchEverythingWidgetStaticsUrl, inboxHeaderWidgetStaticsUrl, dashboardAnswersWidgetStaticsVersion, headerClientStaticsUrl, isInExpertsDashboard, isSiteOwner, sitePermissions, coBranding, isEditorX, useLazyLoadedHeaders, passInstanceToNonLazySiteLevelHeader, instance } = this.props;
    const headerProps: IHeaderProps = { help, metaSiteId, isDebug, navigationComponent, pageComponentsInfo, isADIEditorType, locale, dashboardAnswersWidgetStaticsVersion, coBranding, isEditorX };
    const siteInfo = { isSiteOwner, sitePermissions };

    const buildHeader = (HeaderComponent, extraProps = {}) => <HeaderComponent {...headerProps}
      {...extraProps}
      help={this.state.help}
      navigationComponent={SmartLink}
      pingNotificationsWidgetStaticsUrl={pingNotificationsWidgetStaticsUrl}
      searchEverythingWidgetStaticsUrl={searchEverythingWidgetStaticsUrl}
      inboxHeaderWidgetStaticsUrl={inboxHeaderWidgetStaticsUrl}
      headerClientStaticsUrl={headerClientStaticsUrl}
    />;

    if (useLazyLoadedHeaders) {
      if (isEditor) {
        if (isEditorX) {
          return buildHeader(EditorXLazyComponent, { experiments, ...siteInfo });
        } else {
          return buildHeader(EditorLazyComponent, { experiments, ...siteInfo });
        }
      }
      if (isADI) {
        return buildHeader(ADILazyComponent, { experiments, ...siteInfo });
      }

      if (isInExpertsDashboard) {
        return buildHeader(AccountLevelLazyComponent, { biPageView: 'partner-dashboard', currentPage: ICurrentPage.EXPERT_DASHBOARD });
      }

      return buildHeader(SiteLevelLazyComponent, { biPageView: 'Dashboard', ...siteInfo, instance });
    }

    if (isEditor) {
      if (isEditorX) {
        return buildHeader(EditorXHeader, { experiments, ...siteInfo });
      } else {
        return buildHeader(EditorHeader, { experiments, ...siteInfo });
      }
    }
    if (isADI) {
      return buildHeader(AdiHeader, { experiments, ...siteInfo });
    }

    if (isInExpertsDashboard) {
      return buildHeader(AccountLevelHeader, { biPageView: 'partner-dashboard', currentPage: ICurrentPage.EXPERT_DASHBOARD });
    }

    if (passInstanceToNonLazySiteLevelHeader) {
      return buildHeader(Header, { biPageView: 'Dashboard', ...siteInfo, instance });
    }

    return buildHeader(Header, { biPageView: 'Dashboard', ...siteInfo });
  }
}
