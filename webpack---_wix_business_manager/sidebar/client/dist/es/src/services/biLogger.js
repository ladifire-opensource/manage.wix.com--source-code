import { __assign } from "tslib";
import biLogger from '@wix/web-bi-logger';
export var BIEvent = {
    MENU_ITEM_CLICKED: 550,
    BACK_MENU_CLICKED: 570,
    TOOLTIP_SHOWN: 583,
    TOOLTIP_LINK_CLICKED: 584,
    UPGRADE_BUTTON_CLICKED: 73,
    NEW_BADGE_SHOWN: 673,
    SHOW_QUICK_ACCESS: 488,
    MENU_DISPLAYED: 107
};
export var ClickType = {
    CLICK: 'click',
    EXPAND: 'expand',
    COLLAPSE: 'collapse',
};
export var BISource = {
    myAccount: 5,
};
var logger = biLogger.factory({ endpoint: 'dash' }).logger();
export var log = function (eventData) { return logger.log(__assign({}, eventData)); };
//# sourceMappingURL=biLogger.js.map