"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyViewFirstInteractive = exports.notifyViewFinishedLoading = exports.notifyViewStartLoading = exports.VIEW_FIRST_INTERACTIVE = exports.VIEW_FINISHED_LOADING = exports.VIEW_START_LOADING = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.VIEW_START_LOADING = 'businessManager.viewStartLoading';
exports.VIEW_FINISHED_LOADING = 'businessManager.viewFinishedLoading';
exports.VIEW_FIRST_INTERACTIVE = 'businessManager.viewFirstInteractive';
exports.notifyViewStartLoading = function (subViewId) { return module_registry_1.default.notifyListeners(exports.VIEW_START_LOADING, subViewId); };
exports.notifyViewFinishedLoading = function (subViewId) { return module_registry_1.default.notifyListeners(exports.VIEW_FINISHED_LOADING, subViewId); };
exports.notifyViewFirstInteractive = function (subViewId) { return module_registry_1.default.notifyListeners(exports.VIEW_FIRST_INTERACTIVE, subViewId); };
//# sourceMappingURL=bi.js.map