"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideBadge = exports.showBadge = exports.UploadStatus = exports.CountBadgeSkin = exports.BadgeType = void 0;
var module_registry_1 = require("react-module-container/dist/src/module-registry");
var sidebar_api_method_names_1 = require("./sidebar-api-method-names");
var BadgeType;
(function (BadgeType) {
    BadgeType["NOTIFICATION"] = "NOTIFICATION";
    BadgeType["UPLOAD"] = "UPLOAD";
    BadgeType["COUNT"] = "COUNT";
    BadgeType["NEW"] = "NEW";
})(BadgeType = exports.BadgeType || (exports.BadgeType = {}));
var CountBadgeSkin;
(function (CountBadgeSkin) {
    CountBadgeSkin["SUCCESS"] = "SUCCESS";
})(CountBadgeSkin = exports.CountBadgeSkin || (exports.CountBadgeSkin = {}));
var UploadStatus;
(function (UploadStatus) {
    UploadStatus["UPLOADING"] = "UPLOADING";
    UploadStatus["SUCCESS"] = "SUCCESS";
    UploadStatus["ERROR"] = "ERROR";
})(UploadStatus = exports.UploadStatus || (exports.UploadStatus = {}));
exports.showBadge = function (badge) { return module_registry_1.default.invoke(sidebar_api_method_names_1.SHOW_BADGE_METHOD_NAME, badge); };
exports.hideBadge = function (hideBadgeConfig) { return module_registry_1.default.invoke(sidebar_api_method_names_1.HIDE_BADGE_METHOD_NAME, hideBadgeConfig); };
//# sourceMappingURL=badges.js.map