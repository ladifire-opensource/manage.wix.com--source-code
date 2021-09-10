"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshInstance = exports.getCurrentInstance = exports.registerToInstanceChanges = exports.REFRESH_INSTANCE_METHOD_NAME = exports.GET_CURRENT_INSTANCE_METHOD_NAME = exports.REGISTER_TO_INTANCE_CHANGE_METHOD_NAME = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.REGISTER_TO_INTANCE_CHANGE_METHOD_NAME = 'businessManager.registerToInstanceChanges';
exports.GET_CURRENT_INSTANCE_METHOD_NAME = 'businessManager.getCurrentInstance';
exports.REFRESH_INSTANCE_METHOD_NAME = 'businessManager.refreshInstance';
exports.registerToInstanceChanges = function (appDefId, callback) {
    return module_registry_1.default.invoke(exports.REGISTER_TO_INTANCE_CHANGE_METHOD_NAME, appDefId, callback);
};
exports.getCurrentInstance = function (appDefId) { return module_registry_1.default.invoke(exports.GET_CURRENT_INSTANCE_METHOD_NAME, appDefId); };
exports.refreshInstance = function (appDefId) { return module_registry_1.default.invoke(exports.REFRESH_INSTANCE_METHOD_NAME, appDefId); };
//# sourceMappingURL=instancesHandling.js.map