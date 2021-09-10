import React, { memo, FC, useContext } from 'react';
import { AppContext } from '../app-context/app-context';
import { useModuleParams, useTranslation } from 'yoshi-flow-bm-runtime';
import { comparePlansLink, managePlansLink, Permissions } from '@src/types';
import { Ascend } from './ascend.component';

export enum ASCEND_BI_NAME {
  MANAGE = 'site_details.ascend.manage',
  COMPARE = 'site_details.ascend.compare',
}

export const AscendContainer: FC = memo(() => {
  const [t] = useTranslation();
  const {
    services: { biLogger },
    widgetData: { ascendPlan, ascendSubscription },
  } = useContext(AppContext);

  const managePlan = !!ascendPlan || !!ascendSubscription;
  const { userPermissions, accountLanguage, metaSiteId } = useModuleParams();
  const manageUrl = managePlan
    ? managePlansLink()
    : comparePlansLink(metaSiteId);
  const isPermittedToManage = userPermissions.includes(
    Permissions.MANAGE_ASCEND,
  );

  const comparePlans = () => {
    biLogger.sendClickInDashboard(
      managePlan ? ASCEND_BI_NAME.MANAGE : ASCEND_BI_NAME.COMPARE,
    );
  };

  function getAscendDescription() {
    if (ascendSubscription) {
      return `${t('site_details.plan.ascend.plan')} ${ascendSubscription}`;
    } else if (ascendPlan) {
      return `${t('site_details.plan.ascend.plan')} ${t(
        'site_details.ascend.premium',
      )}`;
    } else {
      return `${t('site_details.plan.ascend.plan')} ${t(
        'site_details.ascend.free',
      )}`;
    }
  }

  if (ascendPlan === undefined && ascendSubscription === undefined) {
    return null;
  }

  return (
    <Ascend
      planName={ascendPlan || ascendSubscription || ''}
      manageUrl={manageUrl}
      accountLanguage={accountLanguage}
      isManage={managePlan}
      canManageAscend={isPermittedToManage}
      description={getAscendDescription()}
      onCtaClicked={comparePlans}
    />
  );
});
