import { ModuleRegistry } from 'react-module-container';
import { ModuleId, isAppInstalled, appDefIds } from '@wix/business-manager-api';

const hasPermission = (permission: string) => {
  const userPermissions =
    ModuleRegistry.getModule(ModuleId.Contacts)?.moduleParams
      ?.userPermissions || [];
  return userPermissions.some(
    (up) => up.toLowerCase() === permission.toLowerCase(),
  );
};

export const isPermitted = (permission) => {
  return hasPermission(permission);
};

export const canUserExport = () => {
  return hasPermission('contacts.export');
};

export const canViewGDPR = () => {
  return hasPermission('my-account.gdpr-users-of-user');
};

export const canViewInvoices = () => {
  return (
    hasPermission('my-account.view-invoices') ||
    hasPermission('wix-quotes.manage')
  );
};

export const canSendNewsletter = () => {
  return hasPermission('my-account.manage-back-office');
};

export const hasEcomActivity = () => {
  return isAppInstalled(appDefIds.wixECommerce);
};

export const canShowMemberWidget = () => {
  return (
    hasPermission('MEMBERS.MEMBER_READ') &&
    hasPermission('MEMBERS.MEMBER_BLOCK') &&
    hasPermission('MEMBERS.MEMBER_APPROVE')
  );
};

export const canMergeContacts = () => {
  // wixExpertsDashboard installed
  return !isAppInstalled('bdd8f657-64e6-421e-a5e3-cc8f52136c0d');
};
