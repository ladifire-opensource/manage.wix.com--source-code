"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupExtensionComponent = exports.getHostContainer = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.getHostContainer = function (hostContainerId) { return module_registry_1.default.invoke('businessManager.getHostContainer', hostContainerId); };
exports.setupExtensionComponent = function (componentId, componentConfig) { return module_registry_1.default.invoke('businessManager.setupExtensionComponent', componentId, componentConfig); };
//# sourceMappingURL=hosting.js.map