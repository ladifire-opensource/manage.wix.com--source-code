"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportSidePanelLoaded = exports.hideSidePanelLoadingSignal = exports.onSidePanelOpen = exports.onSidePanelClose = exports.closeSidePanel = exports.openSidePanel = exports.SidePanelSize = exports.REPORT_SIDE_PANEL_LOADED = exports.HIDE_SIDE_PANEL_LOADING_SIGNAL = exports.ON_SIDE_PANEL_OPEN = exports.ON_SIDE_PANEL_CLOSE = exports.CLOSE_SIDE_PANEL = exports.OPEN_SIDE_PANEL = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.OPEN_SIDE_PANEL = 'businessManager.openSidePanel';
exports.CLOSE_SIDE_PANEL = 'businessManager.closeSidePanel';
exports.ON_SIDE_PANEL_CLOSE = 'businessManager.onSidePanelClose';
exports.ON_SIDE_PANEL_OPEN = 'businessManager.onSidePanelOpen';
exports.HIDE_SIDE_PANEL_LOADING_SIGNAL = 'businessManager.hideSidePanelLoadingSignal';
exports.REPORT_SIDE_PANEL_LOADED = 'businessManager.reportSidePanelLoadingSignal';
var SidePanelSize;
(function (SidePanelSize) {
    SidePanelSize["DEFAULT"] = "default";
    SidePanelSize["LARGE"] = "large";
})(SidePanelSize = exports.SidePanelSize || (exports.SidePanelSize = {}));
exports.openSidePanel = function (openSidePanelParams) { return module_registry_1.default.invoke(exports.OPEN_SIDE_PANEL, openSidePanelParams); };
exports.closeSidePanel = function () { return module_registry_1.default.invoke(exports.CLOSE_SIDE_PANEL); };
exports.onSidePanelClose = function (listener) { return module_registry_1.default.addListener(exports.ON_SIDE_PANEL_CLOSE, listener); };
exports.onSidePanelOpen = function (listener) { return module_registry_1.default.addListener(exports.ON_SIDE_PANEL_OPEN, listener); };
exports.hideSidePanelLoadingSignal = function () { return module_registry_1.default.invoke(exports.HIDE_SIDE_PANEL_LOADING_SIGNAL); };
exports.reportSidePanelLoaded = function () { return module_registry_1.default.invoke(exports.REPORT_SIDE_PANEL_LOADED); };
//# sourceMappingURL=sidePanel.js.map