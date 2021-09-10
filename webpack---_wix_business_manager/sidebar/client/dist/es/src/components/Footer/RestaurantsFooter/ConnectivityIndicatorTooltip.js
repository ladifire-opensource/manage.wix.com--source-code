import { __extends } from "tslib";
import * as React from 'react';
import { Tooltip } from 'wix-style-react';
import * as languageOverrideHelper from './LanguageOverride';
import { TOOLTIPS_Z_INDEX } from './RestaurantsFooter';
var moveOffset = 80, arrowOffset = 21;
var ConnectivityIndicatorTooltip = /** @class */ (function (_super) {
    __extends(ConnectivityIndicatorTooltip, _super);
    function ConnectivityIndicatorTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectivityIndicatorTooltip.prototype.calculateMoveOffset = function (isRtl) {
        return {
            x: isRtl ? -moveOffset : moveOffset,
            y: 0
        };
    };
    ConnectivityIndicatorTooltip.prototype.calcaulateArrowOffset = function (isRtl) {
        return isRtl ? -arrowOffset : arrowOffset;
    };
    ConnectivityIndicatorTooltip.prototype.renderTooltipContent = function (isOnline) {
        return (React.createElement("div", null, this.props.t("sidebar.restaurantsFooter.connectivity" + (isOnline ? 'On' : 'Off'))));
    };
    ConnectivityIndicatorTooltip.prototype.render = function () {
        var _a = this.props, isOnline = _a.isOnline, locale = _a.locale, children = _a.children;
        var tooltipContent = this.renderTooltipContent(isOnline);
        var isRtl = languageOverrideHelper.isRtl(locale);
        var moveBy = this.calculateMoveOffset(isRtl);
        var moveArrowTo = this.calcaulateArrowOffset(isRtl);
        return (React.createElement(Tooltip, { dataHook: "connectivityIndicatorTooltip", content: tooltipContent, moveBy: moveBy, zIndex: TOOLTIPS_Z_INDEX, moveArrowTo: moveArrowTo },
            React.createElement("div", null, children)));
    };
    return ConnectivityIndicatorTooltip;
}(React.PureComponent));
export { ConnectivityIndicatorTooltip };
//# sourceMappingURL=ConnectivityIndicatorTooltip.js.map