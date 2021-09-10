import { BISources, BIPaths } from '../../common/consts/bi';
import { IViewMode } from '@wix/business-manager-api';
import { biLoggerFactory } from './essentials';

let logger = biLoggerFactory({ endpoint: BIPaths.bizMgr }).logger();
let sdkLogger = biLoggerFactory({ endpoint: BIPaths.appSdk }).logger();

export function setLoggerDefaults(defaultValues: object) {
  logger = biLoggerFactory({ endpoint: BIPaths.bizMgr }).updateDefaults(defaultValues).logger();
  sdkLogger = biLoggerFactory({ endpoint: BIPaths.appSdk }).updateDefaults(defaultValues).logger();
}

export function sendBusinessManagerBI(options: object) {
  return logger.log({ src: BISources.myAccount, _: Date.now(), ...options });
}

export function sendSdkBI(options: object) {
  return sdkLogger.log({ src: BISources.appSDK, _: Date.now(), ...options });
}

export function getBIHostingApp(viewMode: IViewMode): IViewMode {
  return viewMode === IViewMode.DASHBOARD ? IViewMode.MA : viewMode;
}
