import { IState } from '../types/store';
import { getIsInDashboard, getViewMode } from './viewModeSelector';
import { DsOriginsByEditorType } from '../services/edit-link-service';
import { Props, EditorType } from '@wix/business-manager-sidebar-client';
import { getCurrentUserLanguage, getCurrentUserId } from './currentUserSelectors';
import {
  getIsSiteOwner, getMetaSiteId, getSiteOwnerId, getSitePermissions,
  getSiteRoles, getSiteRolesString
} from './siteMetaDataSelectors';
import { getEditorSiteId, getEditorType, getLiveSiteEditUrl, getLiveSiteType, hasLiveSite } from './liveSiteSelectors';
import { getLoggedAccountId } from './accountDataSelectors';

export const selectSidebarProps = (state: IState): Props => {
  return {
    dataBaseUrl: state.clientTopology.sidebarStaticsBaseUrl,
    translationsBaseUrl: state.clientTopology.sidebarTranslationsBaseUrl,
    roles: getSiteRoles(state),
    experiments: state.experiments,
    isOwner: getIsSiteOwner(state),
    permissions: getSitePermissions(state),
    locale: getCurrentUserLanguage(state),
    msid: getMetaSiteId(state),
    biParams: {
      hosting: getViewMode(state),
      msid: getMetaSiteId(state),
      ownerId: getSiteOwnerId(state),
      roles: getSiteRolesString(state),
      target_account_id: getSiteOwnerId(state),
      logged_account_id: getLoggedAccountId(state),
      logged_user_id: getCurrentUserId(state)
    },
    isInDashboard: getIsInDashboard(state),
    isDebug: state.isDebug,
    liveSite: hasLiveSite(state) ? {
      siteType: getLiveSiteType(state),
      editorType: DsOriginsByEditorType[getEditorType(state)] as EditorType,
      editorSiteId: getEditorSiteId(state),
      editUrl: getLiveSiteEditUrl(state),
    } : null
  };
};
