import { MODULE_NAME } from '@src/types';
import { BILogger, IBMModuleParams } from 'yoshi-flow-bm-runtime';

export interface SiteDetailsBiLogger {
  sendClickInDashboard(name: string): void;
}

export const initBiLogger = (
  biLogger: BILogger,
  moduleParams: IBMModuleParams,
) => ({
  sendClickInDashboard: (name: string) => {
    const { viewMode, metaSiteId } = moduleParams;

    biLogger.clickInDashboard({
      hosting: viewMode,
      msid: metaSiteId,
      widget_name: MODULE_NAME,
      name,
    });
  },
});
