import { BiOptions, BISources, BIPaths } from '../api';
import { factory as biLogger } from '@wix/web-bi-logger';
import { getMandatoryBIFields } from '@wix/business-manager-api';

export interface ILogger {
  metaSiteId: string;
  viewMode: string;
}

export const getLogger = ({ metaSiteId, viewMode }: ILogger) => {
  const logger = biLogger({ endpoint: BIPaths.bizMgr })
    .updateDefaults({
      ...getMandatoryBIFields(),
      src: BISources.myAccount,
      hosting: viewMode,
      msid: metaSiteId,
    })
    .logger();

  return {
    log: (evid: number, options: BiOptions) => logger.log({ ...options, evid }),
  };
};
