import React, { useContext } from 'react';
import { IViewMode } from '@wix/business-manager-api';
import { useModuleParams } from 'yoshi-flow-bm-runtime';
import { EditSite } from './edit-site-button.component';
import { AppContext } from '../app-context/app-context';
import { Permissions } from '@src/types';

export const EDIT_SITE_BI_KEY = 'edit-site.cta';

export const EditSiteButton = () => {
  const { userPermissions, viewMode } = useModuleParams();
  const {
    services: { biLogger },
  } = useContext(AppContext);

  const isPermittedToEdit = userPermissions.includes(
    Permissions.EDIT_SITE_PERMISSION,
  );

  if (viewMode !== IViewMode.DASHBOARD) {
    return null;
  }

  const onEditSiteClicked = () => {
    biLogger.sendClickInDashboard(EDIT_SITE_BI_KEY);
  };

  return (
    <EditSite
      onClick={onEditSiteClicked}
      isPermittedToEdit={isPermittedToEdit}
    />
  );
};
