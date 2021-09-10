import { withLifecycle } from './with-lifecycle';
import { buildFedopsSubscriber } from './subscribers/fedops';
import { buildSentrySubscriber } from './subscribers/sentry';
import { buildBiLoggerSubscriber } from './subscribers/bi-logger';
export var wrapRemoteComponent = function (WrappedComponent, _a) {
    var wrapperContextId = _a.wrapperContextId, componentId = _a.componentId, sentryDsn = _a.sentryDsn, ErrorComponent = _a.ErrorComponent, getBiExtraFields = _a.getBiExtraFields, _b = _a.LoaderComponent, LoaderComponent = _b === void 0 ? function () { return null; } : _b;
    var subscribers = [];
    subscribers.push(buildFedopsSubscriber({ wrapperContextId: wrapperContextId, componentId: componentId }));
    subscribers.push(buildBiLoggerSubscriber({ wrapperContextId: wrapperContextId, componentId: componentId, getBiExtraFields: getBiExtraFields }));
    if (sentryDsn) {
        subscribers.push(buildSentrySubscriber({ dsn: sentryDsn }));
    }
    return withLifecycle({ subscribers: subscribers, ErrorComponent: ErrorComponent, LoaderComponent: LoaderComponent })(WrappedComponent);
};
//# sourceMappingURL=wrap-remote-component.js.map