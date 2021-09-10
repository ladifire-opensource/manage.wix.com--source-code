import { __awaiter, __generator } from "tslib";
import * as businessManagerApi from '@wix/business-manager-api';
import { DataCapsule, LocalStorageStrategy } from 'data-capsule';
var DAY_IN_SECONDS = 60 * 60 * 24;
var ToastTimeout = businessManagerApi.ToastTimeout, ToastScope = businessManagerApi.ToastScope, ToastType = businessManagerApi.ToastType, ToastActionUiType = businessManagerApi.ToastActionUiType;
var removePaymentToast;
export var removeCurrentPaymentToastIfNeeded = function () {
    if (removePaymentToast) {
        removePaymentToast();
        removePaymentToast = null;
    }
};
export var buildShowPaymentToast = function (api) {
    if (api === void 0) { api = businessManagerApi; }
    return function (badge, siteId) { return __awaiter(void 0, void 0, void 0, function () {
        var tooltip, dataCapsule, lastClosedStorageItemKey, itemInLocalStorage, notificationRecentlyClosed, setTimestampToLocalStorage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tooltip = badge.tooltip;
                    dataCapsule = new DataCapsule({
                        strategy: new LocalStorageStrategy(),
                        namespace: 'wix-business-manager'
                    });
                    lastClosedStorageItemKey = "business-manager-sidebar.connect-payment.last-closed-" + siteId;
                    return [4 /*yield*/, dataCapsule.getItem(lastClosedStorageItemKey).catch(function (err) { return null; })];
                case 1:
                    itemInLocalStorage = _a.sent();
                    notificationRecentlyClosed = !!itemInLocalStorage;
                    setTimestampToLocalStorage = function () {
                        dataCapsule.setItem(lastClosedStorageItemKey, "true", { expiration: DAY_IN_SECONDS });
                    };
                    if (!notificationRecentlyClosed) {
                        if (removePaymentToast) {
                            removePaymentToast();
                        }
                        removePaymentToast = api.showToast({
                            message: tooltip.text,
                            biName: 'business-manager-sidebar.connect-payment',
                            timeout: ToastTimeout.NONE,
                            scope: ToastScope.DASHBOARD,
                            type: ToastType.WARNING,
                            action: {
                                uiType: ToastActionUiType.LINK,
                                text: tooltip.link.text,
                                navigationTarget: {
                                    navigateToConfig: tooltip.link.navigationTarget
                                },
                                removeToastOnClick: false
                            },
                            onCloseClick: setTimestampToLocalStorage
                        }).remove;
                    }
                    return [2 /*return*/];
            }
        });
    }); };
};
//# sourceMappingURL=showPaymentToast.js.map