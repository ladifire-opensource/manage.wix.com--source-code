import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';

export const getAuthorizationHeader = (): {
  Authorization: string;
} => ({
  Authorization: getCurrentInstance(appDefIds.metaSite),
});
