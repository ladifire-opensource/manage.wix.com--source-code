"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideLoadingSignal = exports.HIDE_LOADING_SIGNAL = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.HIDE_LOADING_SIGNAL = 'businessManager.hideLoadingSignal';
exports.hideLoadingSignal = function () { return module_registry_1.default.notifyListeners(exports.HIDE_LOADING_SIGNAL); };
//# sourceMappingURL=hideLoadingSignal.js.map