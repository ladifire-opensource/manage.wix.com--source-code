import React, { FC, useContext } from 'react';
import { Plan, PLAN_CTA_KEYS } from './plan.component';
import { AppContext } from '../app-context/app-context';
import { useModuleParams } from 'yoshi-flow-bm-runtime';
import { Permissions } from '@src/types';

export const PlanContainer: FC = () => {
  const {
    widgetData: { plan },
    services: { biLogger },
  } = useContext(AppContext);
  const { userPermissions, metaSiteId } = useModuleParams();
  const isPermittedToManage = userPermissions.includes(Permissions.MANAGE_PLAN);

  const handleManagePlanClicked = () => {
    biLogger.sendClickInDashboard(PLAN_CTA_KEYS.MANAGE);
  };

  const handleComparePlansClicked = () => {
    biLogger.sendClickInDashboard(PLAN_CTA_KEYS.COMPARE);
  };

  if (!plan) {
    return null;
  }

  return (
    <Plan
      planName={plan?.name}
      metaSiteId={metaSiteId}
      isPermittedToManage={isPermittedToManage}
      onManagePlanClicked={handleManagePlanClicked}
      onComparePlansClicked={handleComparePlansClicked}
    />
  );
};
