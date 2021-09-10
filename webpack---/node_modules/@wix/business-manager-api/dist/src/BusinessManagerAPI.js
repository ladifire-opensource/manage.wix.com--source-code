"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPageComponentLink = exports.getAllModules = exports.configModule = exports.getModule = exports.registerModule = exports.BUILD_PAGE_COMPONENT_LINK = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.BUILD_PAGE_COMPONENT_LINK = 'businessManager.buildPageComponentLink';
function registerModule(moduleId, businessManagerModule) {
    module_registry_1.default.registerModule(moduleId, businessManagerModule, [moduleId]);
}
exports.registerModule = registerModule;
function getModule(moduleId) {
    return module_registry_1.default.getModule(moduleId);
}
exports.getModule = getModule;
function configModule(sourceModuleId, moduleId, configPayload) {
    var module = getModule(moduleId);
    if (module) {
        module.config(sourceModuleId, configPayload);
    }
}
exports.configModule = configModule;
function getAllModules() {
    return module_registry_1.default.getAllModules();
}
exports.getAllModules = getAllModules;
function buildPageComponentLink(_a) {
    var pageComponentId = _a.pageComponentId, contextData = _a.contextData;
    return module_registry_1.default.invoke(exports.BUILD_PAGE_COMPONENT_LINK, pageComponentId, contextData);
}
exports.buildPageComponentLink = buildPageComponentLink;
//# sourceMappingURL=BusinessManagerAPI.js.map