"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPaymentPimple = void 0;
var notificationsApi_1 = require("./notificationsApi");
var wix_storage_1 = require("data-capsule/dist/src/strategies/wix-storage");
var data_capsule_1 = require("data-capsule/dist/src/data-capsule");
var _ = require("lodash");
var notificationTypes_1 = require("@wix/wixstores-dashboard-storemanager-common/dist/src/common/notificationTypes");
var business_manager_api_1 = require("@wix/business-manager-api");
function getNotification(serverNotifications, displayedNotifications) {
    return _.reduce(serverNotifications, function (result, value, key) {
        if (_.includes([notificationTypes_1.NotificationTypes.PAYMENTS, notificationTypes_1.NotificationTypes.RECURRING_PAYMENTS], key) &&
            !_.includes(displayedNotifications, key)) {
            return result;
        }
        result[key] = value;
        return result;
    }, {});
}
function invokePimpleIfNeeds(notifications, translations) {
    if (notifications && notifications.payments) {
        business_manager_api_1.showBadge({
            itemId: 'payments',
            type: business_manager_api_1.BadgeType.NOTIFICATION,
            tooltip: {
                text: translations['notifications.payments.CONTENT'],
                title: translations['notifications.payments.TITLE'],
                link: {
                    text: translations['info.ADD_PAYMENTS'],
                    navigationTarget: { pageComponentId: business_manager_api_1.PageComponentId.Cashier },
                },
            },
        });
    }
}
function invokeToastIfNeeds(notifications, translations) {
    if (notifications && notifications.recurringPayments) {
        var toastConfig = {
            message: translations['notifications.payments.subscriptions.text'],
            biName: 'recurringPayments',
            type: business_manager_api_1.ToastType.WARNING,
            priority: business_manager_api_1.ToastPriority.HIGH,
            timeout: business_manager_api_1.ToastTimeout.NONE,
            action: {
                text: translations['notifications.payments.subscriptions.CtaText'],
                uiType: business_manager_api_1.ToastActionUiType.LINK,
                navigationTarget: { navigateToConfig: { pageComponentId: business_manager_api_1.PageComponentId.Cashier } },
            },
        };
        business_manager_api_1.showToast(toastConfig);
    }
}
function getDisplayedNotificationFromCapsule(metaSiteId) {
    return __awaiter(this, void 0, void 0, function () {
        var capsule, displayedNotifications, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    capsule = new data_capsule_1.DataCapsule({
                        //use WixStorageStrategy instaed of CachedStorageStrategy because CachedStorageStrategy doesn't work well with sideId - it requires scope = metaSiteId, and not scope: {siteId: metaSiteId}
                        strategy: new wix_storage_1.WixStorageStrategy(),
                        namespace: 'wix-stores',
                        scope: { siteId: metaSiteId },
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, capsule.getItem('displayedNotifications')];
                case 2:
                    displayedNotifications = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    displayedNotifications = [];
                    return [3 /*break*/, 4];
                case 4:
                    displayedNotifications = _.isArray(displayedNotifications) ? displayedNotifications : [];
                    return [2 /*return*/, displayedNotifications];
            }
        });
    });
}
function addPaymentPimple(httpClient, metaSiteId, translationsPromise) {
    return __awaiter(this, void 0, void 0, function () {
        var notificationsApi, notificationsDataFromServer, translations, displayedNotifications, notifications;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    notificationsApi = new notificationsApi_1.NotificationsApi(httpClient);
                    return [4 /*yield*/, notificationsApi.getNotifications()];
                case 1:
                    notificationsDataFromServer = _a.sent();
                    return [4 /*yield*/, translationsPromise];
                case 2:
                    translations = _a.sent();
                    return [4 /*yield*/, getDisplayedNotificationFromCapsule(metaSiteId)];
                case 3:
                    displayedNotifications = _a.sent();
                    notifications = getNotification(notificationsDataFromServer, displayedNotifications);
                    //add show pimple to BM
                    return [4 /*yield*/, invokePimpleIfNeeds(notifications, translations)];
                case 4:
                    //add show pimple to BM
                    _a.sent();
                    return [4 /*yield*/, invokeToastIfNeeds(notifications, translations)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.addPaymentPimple = addPaymentPimple;
