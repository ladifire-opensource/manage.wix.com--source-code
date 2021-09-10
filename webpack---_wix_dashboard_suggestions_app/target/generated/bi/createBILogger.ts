
import schemaLogger from '@wix/bi-logger-suggestions-widget';

export function createBILogger({
  biLoggerFactory,
  userConfig = {}
}: any) {
  return schemaLogger(biLoggerFactory())(userConfig);
}
