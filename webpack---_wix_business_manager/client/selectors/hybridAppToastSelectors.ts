import { IState } from '../types/store';
import { getEmbeddedServiceById } from './embeddedServicesSelectors';
import { getAppById } from './appsSelectors';
import { IApp } from '../../common/types/app';
import { EditorType, IViewMode, appDefIds } from '@wix/business-manager-api';
import { IEmbeddedService } from '../../common/types/embedded-services';
import { getViewMode } from './viewModeSelector';
import { hasPermissions } from './siteMetaDataSelectors';
import { getEditorType } from './liveSiteSelectors';

const EDIT_SITE_PERMISSION = 'html-editor.edit';

export function shouldShowToast(state: IState, appDefinitionId) {
  return appDefinitionId &&
    isHybridApp(state, appDefinitionId) &&
    isEditorComponentEssential(state, appDefinitionId) &&
    isRequiresEditorComponent(state, appDefinitionId) &&
    isNotInsideEditorNorADI(state) &&
    userHasEditPermissions(state) &&
    isNotAdiAndUnsupportedAppOnAdi(state, appDefinitionId);
}

function isHybridApp(state: IState, appDefinitionId) {
  const embeddedService: IEmbeddedService = getEmbeddedServiceById(state, appDefinitionId);
  return embeddedService.appType === 'Hybrid';
}

function userHasEditPermissions(state: IState) {
  return hasPermissions(state, EDIT_SITE_PERMISSION);
}

function isEditorComponentEssential(state: IState, appDefinitionId) {
  const app: IApp = getAppById(state, appDefinitionId);

  if (app === null) {
    return false;
  }

  return app.editorComponentEssential;
}

function isRequiresEditorComponent(state: IState, appDefinitionId) {
  const embeddedService: IEmbeddedService = getEmbeddedServiceById(state, appDefinitionId);
  return embeddedService.requiresEditorComponent;
}

function isNotInsideEditorNorADI(state: IState) {
  return getViewMode(state) === IViewMode.DASHBOARD;
}

function isAppSupportedInADI(state: IState, appDefinitionId) {
    return appDefinitionId !== appDefIds.challenges;
}

function isNotAdiAndUnsupportedAppOnAdi(state: IState, appDefinitionId) {
  return getEditorType(state) !== EditorType.ADI || isAppSupportedInADI(state, appDefinitionId);
}
