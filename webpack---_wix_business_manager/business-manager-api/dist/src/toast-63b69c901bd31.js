"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showToast = exports.isInternalNavigationTarget = exports.isExternalNavigationTarget = exports.SHOW_TOAST = exports.ToastTimeout = exports.ToastActionUiType = exports.ToastScope = exports.ToastPriority = exports.ToastType = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
var ToastType;
(function (ToastType) {
    ToastType["STANDARD"] = "STANDARD";
    ToastType["PREMIUM"] = "PREMIUM";
    ToastType["SUCCESS"] = "SUCCESS";
    ToastType["WARNING"] = "WARNING";
    ToastType["ERROR"] = "ERROR";
})(ToastType = exports.ToastType || (exports.ToastType = {}));
var ToastPriority;
(function (ToastPriority) {
    ToastPriority["LOW"] = "LOW";
    ToastPriority["NORMAL"] = "NORMAL";
    ToastPriority["HIGH"] = "HIGH";
})(ToastPriority = exports.ToastPriority || (exports.ToastPriority = {}));
var ToastScope;
(function (ToastScope) {
    ToastScope["APP"] = "APP";
    ToastScope["DASHBOARD"] = "DASHBOARD";
})(ToastScope = exports.ToastScope || (exports.ToastScope = {}));
var ToastActionUiType;
(function (ToastActionUiType) {
    ToastActionUiType["BUTTON"] = "BUTTON";
    ToastActionUiType["LINK"] = "LINK";
})(ToastActionUiType = exports.ToastActionUiType || (exports.ToastActionUiType = {}));
var ToastTimeout;
(function (ToastTimeout) {
    ToastTimeout["NONE"] = "NONE";
    ToastTimeout["NORMAL"] = "NORMAL";
})(ToastTimeout = exports.ToastTimeout || (exports.ToastTimeout = {}));
exports.SHOW_TOAST = 'businessManager.showToast';
exports.isExternalNavigationTarget = function (navigationTarget) {
    return !!navigationTarget.url;
};
exports.isInternalNavigationTarget = function (navigationTarget) {
    return !!navigationTarget.navigateToConfig;
};
exports.showToast = function (toastConfig) { return module_registry_1.default.invoke(exports.SHOW_TOAST, toastConfig); };
//# sourceMappingURL=toast.js.map