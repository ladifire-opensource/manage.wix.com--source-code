import * as React from 'react';
import { SidebarBackButton } from 'wix-style-react';
export var BackButtonView = function (_a) {
    var animateArrow = _a.animateArrow, onClick = _a.onClick, text = _a.text;
    return React.createElement(SidebarBackButton, { dataHook: "go-to-main-menu", animateArrow: animateArrow, onClick: onClick }, text);
};
//# sourceMappingURL=BackButtonView.js.map