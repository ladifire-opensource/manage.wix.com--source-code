import { __assign, __extends } from "tslib";
import * as React from 'react';
import styles from './Tooltip.scss';
import { Text } from 'wix-style-react';
import { log, BIEvent, BISource } from '../../../services/biLogger';
import { TooltipLink } from './TooltipLink';
var TooltipContent = /** @class */ (function (_super) {
    __extends(TooltipContent, _super);
    function TooltipContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleLinkClick = function () {
            _this.sendLinkClickedEvent();
            _this.props.onLinkClick && _this.props.onLinkClick();
        };
        _this.onWrapperClick = function (e) {
            _this.props.onWrapperClick && _this.props.onWrapperClick(e);
        };
        _this.sendLinkClickedEvent = function () {
            var _a = _this.props, biParams = _a.biParams, tooltipConfig = _a.tooltipConfig;
            log(__assign(__assign({}, biParams), { src: BISource.myAccount, evid: BIEvent.TOOLTIP_LINK_CLICKED, name: tooltipConfig.link.text, origin: tooltipConfig.title }));
        };
        return _this;
    }
    TooltipContent.prototype.render = function () {
        var _a = this.props.tooltipConfig, title = _a.title, text = _a.text, link = _a.link;
        return (React.createElement("div", { className: styles.contentContainer, onClick: this.onWrapperClick },
            title &&
                React.createElement("div", { "data-hook": "badge-tooltip-title", className: styles.title },
                    React.createElement(Text, { weight: "bold", size: "small", secondary: false }, title)),
            text &&
                React.createElement("div", { "data-hook": "badge-tooltip-text" },
                    React.createElement(Text, { weight: "thin", size: "small", secondary: true }, text)),
            React.createElement(TooltipLink, { link: link, onLinkClick: this.handleLinkClick })));
    };
    return TooltipContent;
}(React.PureComponent));
export default TooltipContent;
//# sourceMappingURL=TooltipContent.js.map