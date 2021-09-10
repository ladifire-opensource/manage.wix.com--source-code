import React, { memo, FC, useContext } from 'react';
import { AppContext } from '../app-context/app-context';
import { Contributors } from './contributors.component';
import { useModuleParams } from 'yoshi-flow-bm-runtime';
import { Permissions } from '@src/types';
import { useTranslatedUserRolesExperiment } from '@src/hooks/experiments';

export enum CONTRIBUTORS_BI_NAME {
  MANAGE = 'contributors.cta-manage-roles',
  INVITE = 'contributors.cta-invite-people',
}

export const ContributorsContainer: FC = memo(() => {
  const {
    widgetData,
    services: { biLogger },
  } = useContext(AppContext);
  const translatedUserRolesEnabled = useTranslatedUserRolesExperiment();
  const numberOfContributors = widgetData.numberOfContributors || 0;
  let currentUserRoles = widgetData.currentUserRoles || [];
  if (translatedUserRolesEnabled) {
    currentUserRoles = widgetData.translatedUserRoles || [];
  }
  const { userPermissions } = useModuleParams();
  const isPermittedToView = userPermissions.includes(
    Permissions.VIEW_CONTRIBUTORS,
  );

  const isPermittedToInvite = userPermissions.includes(
    Permissions.INVITE_CONTRIBUTORS,
  );

  const handleCtaClicked = () => {
    biLogger.sendClickInDashboard(
      numberOfContributors > 1
        ? CONTRIBUTORS_BI_NAME.MANAGE
        : CONTRIBUTORS_BI_NAME.INVITE,
    );
  };

  const mainRole = currentUserRoles[0];
  const additionalRoles = currentUserRoles.length - 1;

  return (
    <Contributors
      numberOfContributors={numberOfContributors - 1}
      isPermittedToView={isPermittedToView}
      isPermittedToInvite={isPermittedToInvite}
      onCtaClicked={handleCtaClicked}
      mainRole={mainRole}
      additionalRoles={additionalRoles}
    />
  );
});
