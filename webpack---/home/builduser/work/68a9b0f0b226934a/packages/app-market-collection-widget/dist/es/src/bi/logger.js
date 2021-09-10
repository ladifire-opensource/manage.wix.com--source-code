import webBiLogger from '@wix/web-bi-logger';
import initSchemaLogger, { Logger as BiLogger } from '@wix/bi-logger-market';
export var biLogger = initSchemaLogger(webBiLogger)();
export { BiLogger };
//# sourceMappingURL=logger.js.map