"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unhideSidebar = exports.hideSidebar = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
var sidebar_api_method_names_1 = require("./sidebar-api-method-names");
exports.hideSidebar = function () { return module_registry_1.default.invoke(sidebar_api_method_names_1.SIDEBAR_HIDE_METHOD_NAME, true); }; // the true here is temp until new sb is fully merged
exports.unhideSidebar = function () { return module_registry_1.default.invoke(sidebar_api_method_names_1.SIDEBAR_UNHIDE_METHOD_NAME); };
//# sourceMappingURL=sidebar.js.map