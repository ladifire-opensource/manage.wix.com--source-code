import { __assign, __extends, __rest } from "tslib";
import * as React from 'react';
import { Popover } from 'wix-style-react';
import css from './SidebarTooltip.scss';
var SidebarTooltip = /** @class */ (function (_super) {
    __extends(SidebarTooltip, _super);
    function SidebarTooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { shown: false };
        return _this;
    }
    SidebarTooltip.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, popoverContent = _a.popoverContent, dataHook = _a.dataHook, props = __rest(_a, ["children", "popoverContent", "dataHook"]);
        return (React.createElement(Popover, __assign({ shown: this.state.shown, className: css.popoverWrapper, dataHook: dataHook, placement: "left", moveBy: { x: -23, y: 0 }, appendTo: "window", hideDelay: 200, showArrow: true, onMouseEnter: function () { return _this.setState({ shown: true }); }, onMouseLeave: function () { return _this.setState({ shown: false }); } }, props),
            React.createElement(Popover.Element, null, children),
            React.createElement(Popover.Content, null,
                React.createElement("div", { className: css.tooltipWrapper }, popoverContent))));
    };
    return SidebarTooltip;
}(React.Component));
export { SidebarTooltip };
//# sourceMappingURL=SidebarTooltip.js.map