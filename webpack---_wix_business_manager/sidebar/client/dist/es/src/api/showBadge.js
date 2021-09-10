import { __assign } from "tslib";
import { ModuleRegistry } from 'react-module-container';
import { removeBadge, setBadge } from '../actions/badges';
import { BadgeType, HIDE_BADGE_METHOD_NAME, SHOW_BADGE_METHOD_NAME } from '@wix/business-manager-api';
import { buildShowPaymentToast, removeCurrentPaymentToastIfNeeded } from '../components/Badge/showPaymentToast';
import { selectMetaSiteId } from '../selectors/select-basic-aspects';
export var SETTINGS_SHOW_CONNECT_PAYMENTS_NOTIFICATION = 'businessSettings.showConnectPaymentNotification';
export var SETTINGS_HIDE_CONNECT_PAYMENTS_NOTIFICATION = 'businessSettings.hideConnectPaymentNotification';
export var SETTINGS_LOBBY_ENTRY_ID = 'settings-lobby';
var isConnectPaymentsNotificationBadge = function (_a) {
    var itemId = _a.itemId, type = _a.type;
    return (itemId === 'payments' && type === BadgeType.NOTIFICATION);
};
export var registerShowBadgeApi = function (_a) {
    var dispatch = _a.dispatch, getState = _a.getState;
    var hideConnectPaymentsBadge = function (_a) {
        var type = _a.type;
        removeCurrentPaymentToastIfNeeded();
        ModuleRegistry.invoke(SETTINGS_HIDE_CONNECT_PAYMENTS_NOTIFICATION);
        return dispatch(removeBadge(SETTINGS_LOBBY_ENTRY_ID, type));
    };
    var hideBadge = function (badge) {
        if (isConnectPaymentsNotificationBadge(badge)) {
            return hideConnectPaymentsBadge(badge);
        }
        return dispatch(removeBadge(badge.itemId, badge.type));
    };
    var showBadge = function (badge) {
        if (badge.type !== BadgeType.NEW) {
            if (isConnectPaymentsNotificationBadge(badge)) {
                dispatch(showConnectPaymentsBadge(badge, getState()));
            }
            else {
                dispatch(setBadge(badge));
            }
            return {
                hide: function () { return hideBadge(badge); }
            };
        }
    };
    ModuleRegistry.registerMethod(SHOW_BADGE_METHOD_NAME, function () { return showBadge; });
    ModuleRegistry.registerMethod(HIDE_BADGE_METHOD_NAME, function () { return hideBadge; });
};
var showConnectPaymentsBadge = function (badge, state) {
    buildShowPaymentToast()(badge, selectMetaSiteId(state));
    ModuleRegistry.invoke(SETTINGS_SHOW_CONNECT_PAYMENTS_NOTIFICATION, badge);
    return setBadge(__assign(__assign({}, badge), { itemId: SETTINGS_LOBBY_ENTRY_ID }));
};
//# sourceMappingURL=showBadge.js.map