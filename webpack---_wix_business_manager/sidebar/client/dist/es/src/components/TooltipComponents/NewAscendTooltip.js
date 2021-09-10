import * as React from 'react';
import { Text, Button } from 'wix-style-react';
import css from './NewAscendTooltip.scss';
import { buildBackToSiteQueryString } from '@wix/business-manager-api';
export var NewAscendTooltip = function (_a) {
    var t = _a.t;
    var navigateToAscendHomePage = function () { return window.location.href = "/account/explore/ascend-new?" + buildBackToSiteQueryString(); };
    return React.createElement("div", { "data-hook": "ascend-tooltip" },
        React.createElement("img", { "data-hook": "ascend-new-tooltip-logo", alt: "", src: require('../../assets/svg/ascendLogo.svg').default, className: css.ascendLogo }),
        React.createElement("div", { className: css.text },
            React.createElement(Text, { size: "small", dataHook: "ascend-new-tooltip-text" }, t('menu.ascend.explanation.new'))),
        React.createElement("div", { className: css.explore },
            React.createElement(Button, { dataHook: "ascend-new-tooltip-button", onClick: navigateToAscendHomePage, size: "tiny" }, t('menu.ascend.explanation.button.new'))));
};
//# sourceMappingURL=NewAscendTooltip.js.map