import { __assign } from "tslib";
import * as React from 'react';
import { Text, Box } from 'wix-style-react';
import { connect } from 'react-redux';
import { BIEvent, BISource, log } from '../../services/biLogger';
import { getPageComponentLinkComponent } from '@wix/business-manager-api';
var DefaultTooltipView = function (_a) {
    var t = _a.t, title = _a.title, text = _a.text, biParams = _a.biParams, _b = _a.entryId, entryId = _b === void 0 ? null : _b, _c = _a.linkText, linkText = _c === void 0 ? null : _c, _d = _a.navigateToConfig, navigateToConfig = _d === void 0 ? null : _d;
    var sendBiOnTooltipClick = function () {
        log(__assign(__assign({}, biParams), { src: BISource.myAccount, evid: BIEvent.TOOLTIP_LINK_CLICKED, name: linkText, origin: "sidebar.tooltip." + entryId }));
    };
    var PageComponentLink = getPageComponentLinkComponent();
    return (React.createElement(Box, { direction: "vertical" },
        React.createElement("div", null,
            title &&
                React.createElement("div", null,
                    React.createElement(Text, { size: "small", weight: "bold", dataHook: "tooltip-title" }, t(title))),
            text &&
                React.createElement(Text, { size: "small", weight: "thin", dataHook: "tooltip-text", secondary: true }, t(text))),
        navigateToConfig &&
            React.createElement("div", { "data-hook": "tooltip-link-wrapper", onClick: sendBiOnTooltipClick },
                React.createElement(Text, { dataHook: "tooltip-link-text", size: "small", weight: "thin" },
                    React.createElement(PageComponentLink, { pageComponentId: navigateToConfig.pageComponentId, openInNewTab: navigateToConfig.openInNewTab, contextData: navigateToConfig.contextData }, t(linkText))))));
};
var mapStateToProps = function (state) { return ({
    biParams: state.biParams
}); };
export var DefaultTooltip = connect(mapStateToProps)(DefaultTooltipView);
//# sourceMappingURL=DefaultTooltip.js.map