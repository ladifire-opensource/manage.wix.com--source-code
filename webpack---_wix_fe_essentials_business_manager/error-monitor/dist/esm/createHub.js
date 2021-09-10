import { __assign, __spreadArray } from "tslib";
import { prepareOptions } from './utils/prepareOptions';
import { configureScope } from './utils/configureScope';
import { InternalErrorMonitor } from './InternalErrorMonitor';
/**
 * Creates new Sentry hub, to be used inside nested libraries (when you want them to track errors into a different DSN)
 *
 * @param options
 * @return sentryHub
 */
export function createHub(options) {
    var Sentry = options.Sentry;
    var clientOptions = __assign({ 
        /**
         * "Integrations are setup on the "Client", if you need to deal with multiple clients and hubs
         * you have to make sure to also do the integration handling correctly."
         *
         * (Sentry docs, see https://docs.sentry.io/platforms/javascript/troubleshooting/#dealing-with-integrations)
         */
        integrations: __spreadArray([], Sentry.defaultIntegrations) }, prepareOptions(options));
    var sentryClient = new Sentry.BrowserClient(clientOptions);
    var sentryHub = new Sentry.Hub(sentryClient);
    configureScope(sentryHub, options);
    return new InternalErrorMonitor(sentryHub, options.appName);
}
//# sourceMappingURL=createHub.js.map