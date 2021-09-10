
import schemaLogger from '@wix/bi-logger-premium-banner';

export function createBILogger({
  biLoggerFactory,
  userConfig = {}
}: any) {
  return schemaLogger(biLoggerFactory())(userConfig);
}
