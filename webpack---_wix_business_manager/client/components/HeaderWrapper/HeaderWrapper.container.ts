import { connect } from 'react-redux';
import { HeaderWrapper, IHeaderWrapperProps } from './HeaderWrapper';
import { IState } from '../../types/store';
import {
  getPingNotificationsWidgetStaticsUrl,
  getSearchEverythingWidgetStaticsUrl,
  getDashboardAnswersWidgetStaticsVersion,
  getInboxHeaderWidgetStaticsUrl,
  getHeaderClientStaticsUrl
} from '../../selectors/clientTopologySelectors';
import { getCurrentUserLanguage } from '../../selectors/currentUserSelectors';
import { isADIEditorType } from '../../selectors/liveSiteSelectors';
import { getIsSiteOwner, getMetaSiteId, getSitePermissions } from '../../selectors/siteMetaDataSelectors';
import { getEmbeddedServiceById, getIsInExpertsDashboard } from '../../selectors/embeddedServicesSelectors';
import { getCoBranding } from '../../selectors/coBrandingSelectors';
import { isEditorXBrand } from '../../selectors/brandSelectors';
import { experimentsSelectors } from '../../services/essentials';
import { appDefIds } from '@wix/business-manager-api';

function mapStateToProps(state: IState): IHeaderWrapperProps {
  return {
    experiments: state.experiments,
    metaSiteId: getMetaSiteId(state),
    locale: getCurrentUserLanguage(state),
    isDebug: state.isDebug,
    pageComponentsInfo: state.pageComponentsInfo,
    isADIEditorType: isADIEditorType(state),
    dashboardAnswersWidgetStaticsVersion: getDashboardAnswersWidgetStaticsVersion(state),
    pingNotificationsWidgetStaticsUrl: getPingNotificationsWidgetStaticsUrl(state),
    searchEverythingWidgetStaticsUrl: getSearchEverythingWidgetStaticsUrl(state),
    inboxHeaderWidgetStaticsUrl: getInboxHeaderWidgetStaticsUrl(state),
    headerClientStaticsUrl: getHeaderClientStaticsUrl(state),
    isSiteOwner: getIsSiteOwner(state),
    sitePermissions: getSitePermissions(state),
    isInExpertsDashboard: getIsInExpertsDashboard(state),
    coBranding: getCoBranding(state),
    isEditorX: isEditorXBrand(state),
    useLazyLoadedHeaders: experimentsSelectors(state).enabled('specs.wosbm.LazyLoadHeaderComponentInBusinessManager'),
    passInstanceToNonLazySiteLevelHeader: experimentsSelectors(state).enabled('specs.wosbm.PassInstanceToNonLazySiteLevelHeader'),
    instance: getEmbeddedServiceById(state, appDefIds.metaSite).instance
  };
}

export default connect(mapStateToProps)(HeaderWrapper);
