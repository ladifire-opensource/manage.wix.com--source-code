"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showUnauthorizedPage = exports.HIDE_UNAUTHORIZED_PAGE_METHOD_NAME = exports.SHOW_UNAUTHORIZED_PAGE_METHOD_NAME = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.SHOW_UNAUTHORIZED_PAGE_METHOD_NAME = 'businessManager.showUnauthorizedPage';
exports.HIDE_UNAUTHORIZED_PAGE_METHOD_NAME = 'businessManager.hideUnauthorizedPage';
exports.showUnauthorizedPage = function () {
    return module_registry_1.default.invoke(exports.SHOW_UNAUTHORIZED_PAGE_METHOD_NAME);
};
//# sourceMappingURL=showUnauthorizedPage.js.map