import { getModuleParams } from '../moduleParams/moduleParams';
import { isEmpty, difference } from 'lodash';

export const Permission = {
  COUPONS_MANAGE: 'coupons.manage',
  CASHIER_MANAGE: 'cashier.manage',
  UPGRADE_SITE: 'my-account.upgrade-site',
  INBOX_MANAGE: 'crm-inbox.manage',
};

export const hasAllPermissions = (permissionIds: string[]) => {
  const moduleParams = getModuleParams();
  return (
    isOwner() ||
    isEmpty(difference(permissionIds, moduleParams.userPermissions))
  );
};

export const isOwner = () => {
  const moduleParams = getModuleParams();
  return moduleParams.userRole.split(',').includes('owner');
};
