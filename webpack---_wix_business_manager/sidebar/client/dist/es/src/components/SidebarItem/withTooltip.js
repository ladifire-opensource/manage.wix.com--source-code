import { __assign, __extends, __rest } from "tslib";
import * as React from 'react';
import { Popover } from 'wix-style-react';
import { ModuleRegistry } from 'react-module-container';
import style from './TooltipWrapper.scss';
import { withTranslation } from '@wix/wix-i18n-config';
import { log, BIEvent, BISource } from '../../services/biLogger';
import { connect } from 'react-redux';
import { SidebarPopoverContext } from '../SidebarPopoverMenu/SidebarPopoverContext';
import classnames from 'classnames';
var reportTooltipShownBI = function (biParams) {
    log(__assign({ evid: BIEvent.TOOLTIP_SHOWN, is_hover: 'true', place: 'sidebar', src: BISource.myAccount }, biParams));
};
var TooltipWrapper = /** @class */ (function (_super) {
    __extends(TooltipWrapper, _super);
    function TooltipWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.show = function () {
            _this.setState({ shown: true });
            var biParams = _this.props.biParams;
            var type = _this.props.tooltip.type;
            reportTooltipShownBI(__assign(__assign({}, biParams), { name: type }));
        };
        _this.state = {
            shown: false,
        };
        return _this;
    }
    TooltipWrapper.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props.tooltip, type = _b.type, tooltipProps = __rest(_b, ["type"]);
        var ContentComponent = getTooltipComponent(type);
        var _c = this.props, id = _c.id, element = _c.element, t = _c.t;
        var content = (React.createElement("div", { className: style.tooltipContainer, "data-hook": "tooltip-content-" + id },
            React.createElement(ContentComponent, __assign({ id: id }, tooltipProps, { t: t }))));
        var popoverClasses = classnames(style.popover, (_a = {}, _a[style.inPopoverMenu] = this.context.isPopoverMenu, _a));
        return (React.createElement(Popover, { className: popoverClasses, shown: this.state.shown, appendTo: "window", dataHook: "tooltip-" + id, placement: "left", showArrow: true, maxWidth: "", theme: "light", moveBy: { y: 0, x: this.context.isPopoverMenu ? -10 : -20 }, hideDelay: 0, onMouseEnter: this.show, onMouseLeave: function () { return _this.setState({ shown: false }); } },
            React.createElement(Popover.Element, null,
                React.createElement("div", { className: style.tooltipElement }, element)),
            React.createElement(Popover.Content, null, content)));
    };
    TooltipWrapper.contextType = SidebarPopoverContext;
    return TooltipWrapper;
}(React.Component));
var getTooltipComponent = function (tooltipType) {
    return ModuleRegistry.component(tooltipType);
};
var isTooltipRegistred = function (tooltipType) { return !!ModuleRegistry.component(tooltipType); };
var mapStateToProps = function (state) { return ({ biParams: state.biParams }); };
export var withTooltip = function (tooltip) { return function (Component) {
    if (!tooltip || !isTooltipRegistred(tooltip.type)) {
        return Component;
    }
    return connect(mapStateToProps)(withTranslation()(function (props) { return (React.createElement(TooltipWrapper, { id: props.id, element: React.createElement(Component, __assign({}, props)), tooltip: tooltip, biParams: props.biParams, t: props.t })); }));
}; };
//# sourceMappingURL=withTooltip.js.map