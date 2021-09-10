import * as Sentry from '@sentry/browser';
export var SentryEventHandlerResponse;
(function (SentryEventHandlerResponse) {
    SentryEventHandlerResponse[SentryEventHandlerResponse["HANDLED"] = 0] = "HANDLED";
    SentryEventHandlerResponse[SentryEventHandlerResponse["UNHANDLED"] = 1] = "UNHANDLED";
})(SentryEventHandlerResponse || (SentryEventHandlerResponse = {}));
export var addSentryEventProcessor = function (eventHandler) {
    Sentry.configureScope(function (scope) {
        scope.addEventProcessor(function (event) {
            var needToHandle = eventHandler(event) === SentryEventHandlerResponse.UNHANDLED;
            return Promise.resolve(needToHandle ? event : null);
        });
    });
};
//# sourceMappingURL=add-sentry-event-processor.js.map