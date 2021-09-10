import { __assign, __extends } from "tslib";
import * as React from 'react';
import * as Sentry from '@sentry/browser';
var ErrorBoundaryContext = React.createContext(null);
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (error) {
        return { hasError: true };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        if (window['Sentry']) {
            Sentry.withScope(function (scope) {
                scope.setExtra('componentStack', errorInfo);
                Sentry.captureException(error);
            });
        }
    };
    ErrorBoundary.prototype.clearErrorState = function () {
        this.setState({ hasError: false });
    };
    ErrorBoundary.prototype.render = function () {
        var _this = this;
        if (this.state.hasError) {
            return (React.createElement(ErrorBoundaryContext.Provider, { value: { clearErrorState: function () { return _this.clearErrorState(); } } }, this.props.errorComponent ? React.createElement(this.props.errorComponent, null) : React.createElement("div", null)));
        }
        return React.createElement(React.Fragment, null, this.props.children);
    };
    return ErrorBoundary;
}(React.Component));
export { ErrorBoundary };
export var withErrorBoundary = function (errorComponent) { return function (WrappedComponent) {
    return function (props) { return (React.createElement(ErrorBoundary, { errorComponent: errorComponent },
        React.createElement(WrappedComponent, __assign({}, props)))); };
}; };
export var withErrorBoundaryMethods = function () { return function (WrappedComponent) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.render = function () {
                var _this = this;
                return (React.createElement(WrappedComponent, __assign({}, this.props, { clearError: function () { return _this.context.clearErrorState(); } })));
            };
            return class_1;
        }(React.Component)),
        _a.contextType = ErrorBoundaryContext,
        _a;
}; };
//# sourceMappingURL=ErrorBoundary.js.map