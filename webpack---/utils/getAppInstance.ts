import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';

export const getAppInstance = (): string =>
  getCurrentInstance(appDefIds.videoMakerHome);
