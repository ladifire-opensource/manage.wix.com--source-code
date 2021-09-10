import * as Sentry from '@sentry/browser';
export var buildSentrySubscriber = function (_a) {
    var dsn = _a.dsn;
    var sentryClient = new Sentry.BrowserClient({ dsn: dsn });
    return {
        onError: function (error, errorInfo) {
            var scope = new Sentry.Scope();
            scope.setExtra('componentStack', errorInfo);
            sentryClient.captureException(error, {}, scope);
        },
    };
};
//# sourceMappingURL=sentry.js.map