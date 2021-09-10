import { __assign, __extends } from "tslib";
import * as React from 'react';
export var withLifecycle = function (_a) {
    var subscribers = _a.subscribers, ErrorComponent = _a.ErrorComponent, LoaderComponent = _a.LoaderComponent;
    return function (WrappedComponent) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1(props) {
                var _this = _super.call(this, props) || this;
                _this.isLoadingFromSuspense = false;
                _this.isLoadingFromNotification = false;
                _this.observerWasSet = false;
                _this.onStartLoading = function () {
                    subscribers === null || subscribers === void 0 ? void 0 : subscribers.forEach(function (subscriber) {
                        var _a;
                        (_a = subscriber.onStartLoading) === null || _a === void 0 ? void 0 : _a.call(subscriber);
                    });
                };
                _this.onLoadingFromSuspense = function () {
                    _this.isLoadingFromSuspense = true;
                };
                _this.onLoadingFromNotification = function () {
                    _this.isLoadingFromNotification = true;
                };
                _this.onLoadedFromSuspense = function () {
                    _this.isLoadingFromSuspense = false;
                    _this.onFinishedLoading();
                };
                _this.onLoadedFromNotification = function () {
                    _this.isLoadingFromNotification = false;
                    _this.onFinishedLoading();
                };
                _this.onFinishedLoading = function () {
                    if (!_this.isLoadingFromSuspense && !_this.isLoadingFromNotification) {
                        _this.setState({ isLoading: false });
                        subscribers === null || subscribers === void 0 ? void 0 : subscribers.forEach(function (subscriber) {
                            var _a;
                            (_a = subscriber.onFinishedLoading) === null || _a === void 0 ? void 0 : _a.call(subscriber);
                        });
                    }
                };
                _this.renderComponent = function () {
                    var isLoading = _this.state.isLoading;
                    return React.createElement(React.Fragment, null,
                        isLoading && React.createElement(LoaderComponent, null),
                        React.createElement("span", { style: isLoading ? { display: 'none' } : {} },
                            React.createElement(WrappedComponent, __assign({}, _this.props, { notifyStartLoading: _this.onLoadingFromNotification, notifyFinishedLoading: _this.onLoadedFromNotification }))));
                };
                _this.state = { hasError: false, isLoading: true };
                _this.onStartLoading();
                _this.componentRef = React.createRef();
                return _this;
            }
            class_1.prototype.componentDidMount = function () {
                this.onFinishedLoading();
                this.addInteractionObserver();
            };
            class_1.prototype.addInteractionObserver = function () {
                var _this = this;
                if (window.IntersectionObserver && !this.observerWasSet) {
                    var observer_1 = new window.IntersectionObserver(function (entries) {
                        var entry = entries.find(function (x) { return x.target === _this.componentRef.current && x.isIntersecting; });
                        if (entry) {
                            subscribers === null || subscribers === void 0 ? void 0 : subscribers.forEach(function (subscriber) {
                                var _a;
                                (_a = subscriber.onComponentShow) === null || _a === void 0 ? void 0 : _a.call(subscriber);
                            }, { threshold: 0.1 });
                            observer_1.unobserve(entry.target);
                        }
                    });
                    observer_1.observe(this.componentRef.current);
                    this.observerWasSet = true;
                }
            };
            class_1.getDerivedStateFromError = function (error) {
                return { hasError: true };
            };
            class_1.prototype.componentDidCatch = function (error, errorInfo) {
                subscribers === null || subscribers === void 0 ? void 0 : subscribers.forEach(function (subscriber) {
                    var _a;
                    (_a = subscriber.onError) === null || _a === void 0 ? void 0 : _a.call(subscriber, error, errorInfo);
                });
                this.setState({ hasError: true });
            };
            class_1.prototype.render = function () {
                return (React.createElement(React.Suspense, { fallback: React.createElement(Fallback, { onMount: this.onLoadingFromSuspense, onUnmount: this.onLoadedFromSuspense, LoaderComponent: LoaderComponent }) },
                    React.createElement("span", { ref: this.componentRef }, this.state.hasError ? React.createElement(ErrorComponent, null) : this.renderComponent())));
            };
            return class_1;
        }(React.Component));
    };
};
var Fallback = /** @class */ (function (_super) {
    __extends(Fallback, _super);
    function Fallback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fallback.prototype.componentWillUnmount = function () {
        this.props.onUnmount();
    };
    Fallback.prototype.componentDidMount = function () {
        this.props.onMount();
    };
    Fallback.prototype.render = function () {
        var LoaderComponent = this.props.LoaderComponent;
        return LoaderComponent ? React.createElement(LoaderComponent, null) : null;
    };
    return Fallback;
}(React.Component));
//# sourceMappingURL=with-lifecycle.js.map