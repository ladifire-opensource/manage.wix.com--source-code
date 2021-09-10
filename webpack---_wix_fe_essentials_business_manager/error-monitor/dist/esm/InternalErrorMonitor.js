import { Severity } from '@sentry/types';
import { sanitizeTags } from './utils/addTags';
/**
 * Wrapper around Sentry instance or Sentry hub
 */
var InternalErrorMonitor = /** @class */ (function () {
    function InternalErrorMonitor(Sentry, appName) {
        if (appName === void 0) { appName = ''; }
        this.sentry = Sentry;
        this.appName = appName;
    }
    InternalErrorMonitor.prototype.captureException = function (exception, options) {
        if (options) {
            if (options.tags) {
                options.tags = sanitizeTags(options.tags, this.appName);
            }
            var sentry = this.sentry;
            if (this.isHub(sentry)) {
                return sentry.captureException(exception, { captureContext: options });
            }
            else {
                return sentry.captureException(exception, options);
            }
        }
        else {
            return this.sentry.captureException(exception);
        }
    };
    InternalErrorMonitor.prototype.captureMessage = function (message, options) {
        if (options) {
            var _a = options.level, level = _a === void 0 ? Severity.Error : _a, tags = options.tags;
            if (tags) {
                options.tags = sanitizeTags(tags, this.appName);
            }
            var sentry = this.sentry;
            if (this.isHub(sentry)) {
                return sentry.captureMessage(message, level, {
                    captureContext: options,
                });
            }
            else {
                return sentry.captureMessage(message, options);
            }
        }
        else {
            return this.sentry.captureMessage(message);
        }
    };
    /**
     * Added here to comply with already used api (e.g. in business-manager).
     *
     * @deprecated this API is unstable and could be removed in the future, please do not use this if you don't have a reasons for that.
     */
    InternalErrorMonitor.prototype.captureEvent = function (event) {
        return this.sentry.captureEvent(event);
    };
    InternalErrorMonitor.prototype.addBreadcrumb = function (breadcrumb) {
        this.sentry.addBreadcrumb(breadcrumb);
    };
    InternalErrorMonitor.prototype.isHub = function (sentry) {
        return sentry.captureMessage.length === 3;
    };
    return InternalErrorMonitor;
}());
export { InternalErrorMonitor };
//# sourceMappingURL=InternalErrorMonitor.js.map