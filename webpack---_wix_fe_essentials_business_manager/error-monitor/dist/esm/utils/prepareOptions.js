import { __assign } from "tslib";
import { enrichBreadcrumbsWithDataHooks } from './enrichBreadcrumbsWithDataHooks';
export function prepareOptions(options) {
    var dsn = options.dsn, _a = options.appName, appName = _a === void 0 ? '' : _a, version = options.version, environment = options.environment, beforeSend = options.beforeSend, transport = options.transport;
    return __assign(__assign(__assign({ dsn: dsn }, (environment && { environment: environment })), (version && { release: appName + "@" + version })), { beforeBreadcrumb: enrichBreadcrumbsWithDataHooks, beforeSend: beforeSend, transport: transport });
}
//# sourceMappingURL=prepareOptions.js.map