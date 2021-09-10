"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportAppEngaged = exports.PremiumIntent = exports.isAppInstalled = exports.provisionApp = exports.APP_ENGAGED = exports.IS_APP_INSTALLED = exports.PROVISION_APP = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
exports.PROVISION_APP = 'businessManager.provisionApp';
exports.IS_APP_INSTALLED = 'businessManager.isAppInstalled';
exports.APP_ENGAGED = 'businessManager.appEngaged';
exports.provisionApp = function (appDefId, metaSiteId) {
    return module_registry_1.default.invoke(exports.PROVISION_APP, appDefId, null, metaSiteId);
};
exports.isAppInstalled = function (appDefId) { return module_registry_1.default.invoke(exports.IS_APP_INSTALLED, appDefId); };
var PremiumIntent;
(function (PremiumIntent) {
    PremiumIntent["NEUTRAL"] = "NEUTRAL";
    PremiumIntent["FREE"] = "FREE";
    PremiumIntent["PAID"] = "PAID";
})(PremiumIntent = exports.PremiumIntent || (exports.PremiumIntent = {}));
exports.reportAppEngaged = function (appEngagedParams) { return module_registry_1.default.invoke(exports.APP_ENGAGED, appEngagedParams); };
//# sourceMappingURL=app-apis.js.map