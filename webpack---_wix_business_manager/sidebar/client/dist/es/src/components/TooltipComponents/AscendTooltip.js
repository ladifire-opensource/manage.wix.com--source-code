import * as React from 'react';
import { getPageComponentLinkComponent } from '@wix/business-manager-api';
import { Text } from 'wix-style-react';
export var AscendTooltip = function (_a) {
    var t = _a.t;
    var Link = getPageComponentLinkComponent();
    return React.createElement("div", { "data-hook": "ascend-tooltip" },
        React.createElement("div", null,
            React.createElement(Text, { dataHook: "ascend-tooltip-title", weight: "bold", size: "small" }, t("menu.ascend.title"))),
        React.createElement(Text, { size: "small", secondary: true, weight: "thin", dataHook: "ascend-tooltip-text" }, t('menu.ascend.explanation') + " "),
        React.createElement(Text, { size: "small" },
            React.createElement(Link, { pageComponentId: "engage" }, t('menu.ascend.learnMore'))));
};
//# sourceMappingURL=AscendTooltip.js.map