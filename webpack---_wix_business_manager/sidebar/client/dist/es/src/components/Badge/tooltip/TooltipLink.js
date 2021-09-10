import { __assign } from "tslib";
import * as React from 'react';
import styles from './Tooltip.scss';
import { Text } from 'wix-style-react';
import { getPageComponentLinkComponent } from '@wix/business-manager-api';
export var TooltipLink = function (props) {
    var link = props.link, onLinkClick = props.onLinkClick;
    if (!link || !link.navigationTarget) {
        return null;
    }
    var PageComponentLink = getPageComponentLinkComponent();
    return (React.createElement("div", { className: styles.link, onClick: onLinkClick, "data-hook": "badge-tooltip-link" },
        React.createElement(Text, { dataHook: "sidebar-tooltip-link", weight: "thin", size: "small", secondary: false },
            React.createElement(PageComponentLink, __assign({}, link.navigationTarget), link.text))));
};
//# sourceMappingURL=TooltipLink.js.map