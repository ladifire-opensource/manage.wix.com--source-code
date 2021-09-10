"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPageComponentMonitors = exports.REGISTER_PAGE_COMPONENT_MONITORS = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.REGISTER_PAGE_COMPONENT_MONITORS = 'businessManager.registerPageComponentMonitors';
exports.registerPageComponentMonitors = function (pageComponentId, options) {
    module_registry_1.default.invoke(exports.REGISTER_PAGE_COMPONENT_MONITORS, pageComponentId, options);
};
//# sourceMappingURL=monitors.js.map