"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCloseInEditor = exports.onNavigationCompleted = exports.onNavigation = exports.getPageComponentLinkComponent = exports.navigateToAndShowBackToast = exports.navigateTo = exports.ON_CLOSE_IN_EDITOR = exports.ON_NAVIGATION_COMPLETED = exports.ON_NAVIGATION = exports.PAGE_LINK_COMPONENT = exports.NAVIGATE_TO_AND_SHOW_BACK_TOAST = exports.NAVIGATE_TO = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.NAVIGATE_TO = 'businessManager.navigateTo';
exports.NAVIGATE_TO_AND_SHOW_BACK_TOAST = 'businessManager.navigateToAndShowBackToast';
exports.PAGE_LINK_COMPONENT = 'businessManager.PageComponentLink';
exports.ON_NAVIGATION = 'businessManager.onNavigation';
exports.ON_NAVIGATION_COMPLETED = 'businessManager.onNavigationCompleted';
exports.ON_CLOSE_IN_EDITOR = 'businessManager.onCloseInEditor';
exports.navigateTo = function (navigateToPageConfig) { return module_registry_1.default.invoke(exports.NAVIGATE_TO, navigateToPageConfig); };
exports.navigateToAndShowBackToast = function (toConfig, backConfig, toastConfig) {
    return module_registry_1.default.invoke(exports.NAVIGATE_TO_AND_SHOW_BACK_TOAST, toConfig, backConfig, toastConfig);
};
exports.getPageComponentLinkComponent = function () { return module_registry_1.default.component(exports.PAGE_LINK_COMPONENT); };
exports.onNavigation = function (callback) { return module_registry_1.default.addListener(exports.ON_NAVIGATION, callback); };
exports.onNavigationCompleted = function (callback) { return module_registry_1.default.addListener(exports.ON_NAVIGATION_COMPLETED, callback); };
exports.onCloseInEditor = function (callback) { return module_registry_1.default.addListener(exports.ON_CLOSE_IN_EDITOR, callback); };
//# sourceMappingURL=navigation.js.map