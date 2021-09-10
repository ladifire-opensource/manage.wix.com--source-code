import { ICurrentUser } from '../../../common/types/user';
import { getEmbeddedServiceById } from '../../selectors/embeddedServicesSelectors';
import { IEmbeddedService } from '../../../common/types/embedded-services';
import { IState } from '../../types/store';
import { getViewMode } from '../../selectors/viewModeSelector';
import { TModuleParams } from '@wix/business-manager-api';
import { experimentsSelectors } from '../../services/essentials';
import { getCurrentUserLanguage } from '../../selectors/currentUserSelectors';
import { getMetaSiteId, getSiteName, getSiteRolesString, getSitePermissions, getPrimarySiteLocale } from '../../selectors/siteMetaDataSelectors';
import {
  getEditorType, getIsLiveSitePublished, getLiveSiteEditUrl,
  getLiveSiteViewUrl, hasLiveSite, getEditorSiteId
} from '../../selectors/liveSiteSelectors';
import { getCoBranding } from '../../selectors/coBrandingSelectors';
import { getBrand } from '../../selectors/brandSelectors';

export function buildModuleParams(state: IState, appDefId: string, config?: any): TModuleParams {
  const currentUser: ICurrentUser = state.currentUser;
  const embeddedService: IEmbeddedService = getEmbeddedServiceById(state, appDefId);

  const wixExperiments = experimentsSelectors(state);
  const deprecateInstanceProp = wixExperiments.enabled('specs.wos.DeprecateInstanceProp');
  const deprecateLocaleProp = wixExperiments.enabled('specs.wos2.DeprecateLocaleProp');

  const moduleParams = {
    viewMode: <string>getViewMode(state),
    metaSiteId: getMetaSiteId(state),
    siteName: getSiteName(state),
    userRole: getSiteRolesString(state),
    instanceId: embeddedService && embeddedService.instanceId,
    debug: state.isDebug,
    ...(!deprecateLocaleProp && { locale: getCurrentUserLanguage(state) }),
    coBranding: getCoBranding(state),
    brand: getBrand(state),
    userId: currentUser.id,
    config,
    ...(!deprecateInstanceProp && { instance: embeddedService && embeddedService.instance }),
    userPermissions: getSitePermissions(state),
    liveSite: hasLiveSite(state) ? {
      viewUrl: getLiveSiteViewUrl(state),
      editUrl: getLiveSiteEditUrl(state),
      isSitePublished: getIsLiveSitePublished(state),
      editorType: getEditorType(state),
      siteId: getEditorSiteId(state)
    } : null,
    accountLanguage: getCurrentUserLanguage(state),
    primarySiteLocale: getPrimarySiteLocale(state)
  };

  return moduleParams;
}
