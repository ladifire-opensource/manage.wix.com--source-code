import biLogger from '@wix/web-bi-logger';
import { BISources, BIConsts } from './bi-events';

let logger = biLogger
  .factory({ endpoint: BIConsts.loggerEndpoint })
  .updateDefaults({ src: BISources.businessManager })
  .logger();

export function setLoggerDefaults(defaultValues: object) {

  logger = biLogger
    .factory({ endpoint: BIConsts.loggerEndpoint })
    .updateDefaults({
      ...defaultValues,
      src: BISources.businessManager,
    })
    .logger();
}

export async function sendSearchBI(options: object) {
  return logger.log({
    _: Date.now(),
    ...options,
  });
}
