"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSuspense = void 0;
var tslib_1 = require("tslib");
var React = require("react");
var hoistNonReactStatics = require("hoist-non-react-statics");
exports.withSuspense = function (Component) {
    var Wrapper = /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            return React.createElement(React.Suspense, { fallback: null },
                React.createElement(Component, tslib_1.__assign({}, this.props)));
        };
        return class_1;
    }(React.Component));
    hoistNonReactStatics(Wrapper, Component);
    return Wrapper;
};
//# sourceMappingURL=withSuspense.js.map