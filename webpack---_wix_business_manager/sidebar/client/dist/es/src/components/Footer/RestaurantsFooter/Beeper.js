import { __extends } from "tslib";
import * as React from 'react';
var styles = require('./Beeper.scss');
var Beeper = /** @class */ (function (_super) {
    __extends(Beeper, _super);
    function Beeper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Beeper.prototype.render = function () {
        var beepState = this.props.enabled ? 'on' : 'off';
        return (React.createElement("div", { className: styles.wrapper, "data-hook": "beeper", onClick: this.props.onClick },
            React.createElement("div", { className: styles[beepState], "data-state-hook": beepState })));
    };
    return Beeper;
}(React.PureComponent));
export { Beeper };
//# sourceMappingURL=Beeper.js.map