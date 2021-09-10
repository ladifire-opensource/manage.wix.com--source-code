import { __assign, __extends } from "tslib";
import React from 'react';
var biContext = React.createContext(null);
export var BiProvider = biContext.Provider;
export var WithBi = function (WrappedComponent) { var _a; return _a = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            var newProps = __assign(__assign({}, this.props), { biLogger: this.context });
            return React.createElement(WrappedComponent, newProps);
        };
        return class_1;
    }(React.Component)),
    _a.contextType = biContext,
    _a; };
//# sourceMappingURL=provider.js.map