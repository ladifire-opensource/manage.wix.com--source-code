import { __extends } from "tslib";
import * as React from 'react';
import classNames from 'classnames';
var styles = require('./ConnectivityIndicator.scss');
var ConnectivityIndicator = /** @class */ (function (_super) {
    __extends(ConnectivityIndicator, _super);
    function ConnectivityIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectivityIndicator.prototype.render = function () {
        var _a;
        var online = this.props.online;
        return (React.createElement("div", { "data-hook": "connectivity-indicator", "data-online": online, className: classNames(styles.wrapper, (_a = {},
                _a[styles.online] = online,
                _a)) }));
    };
    return ConnectivityIndicator;
}(React.PureComponent));
export { ConnectivityIndicator };
//# sourceMappingURL=ConnectivityIndicator.js.map