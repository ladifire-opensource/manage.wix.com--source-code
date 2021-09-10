import { __assign, __extends } from "tslib";
import * as React from 'react';
import styles from './Tooltip.scss';
import { Popover } from 'wix-style-react';
import TooltipContent from './TooltipContent';
import { log, BIEvent, BISource } from '../../../services/biLogger';
export var withTooltip = function (Component, tooltip, biParams) {
    if (!tooltip || !tooltip.text) {
        return React.createElement(Component, null);
    }
    return (React.createElement(TooltipWrapper, { element: React.createElement(Component, null), tooltip: tooltip, biParams: biParams }));
};
var TooltipWrapper = /** @class */ (function (_super) {
    __extends(TooltipWrapper, _super);
    function TooltipWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.reportTooltipShownBI = function () {
            var _a = _this.props, biParams = _a.biParams, tooltip = _a.tooltip;
            log(__assign(__assign({}, biParams), { evid: BIEvent.TOOLTIP_SHOWN, is_hover: true, place: 'sidebar', src: BISource.myAccount, name: tooltip.title }));
        };
        _this.onEnter = function () {
            _this.reportTooltipShownBI();
            _this.setState({ shown: true });
        };
        _this.onLeave = function () {
            _this.setState({ shown: false });
        };
        _this.onWrapperClick = function (e) {
            if (!e.target.closest("[data-hook=\"badge-tooltip-link\"]")) {
                e.stopPropagation();
            }
        };
        _this.onLinkClick = function () {
            _this.setState({ shown: false });
        };
        _this.state = {
            shown: false
        };
        return _this;
    }
    TooltipWrapper.prototype.render = function () {
        var _a = this.props, tooltip = _a.tooltip, element = _a.element, biParams = _a.biParams;
        var shown = this.state.shown;
        var tooltipContent = React.createElement(TooltipContent, { tooltipConfig: tooltip, biParams: biParams, onWrapperClick: this.onWrapperClick, onLinkClick: this.onLinkClick });
        return (React.createElement("div", { "data-hook": "badge-with-tooltip", className: styles.BadgeWithTooltipContainer },
            React.createElement(Popover, { shown: shown, placement: "right", showArrow: true, theme: "light", appendTo: "window", moveBy: { x: 5 }, dataHook: "badge-tooltip", animate: true, hideDelay: 200, onMouseEnter: this.onEnter, onMouseLeave: this.onLeave },
                React.createElement(Popover.Element, null, element),
                React.createElement(Popover.Content, null,
                    React.createElement("span", null, tooltipContent)))));
    };
    return TooltipWrapper;
}(React.Component));
export { TooltipWrapper };
//# sourceMappingURL=TooltipWrapper.js.map