"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBackToSiteQueryString = exports.getBackToSiteQuery = exports.extractPagePath = void 0;
var tslib_1 = require("tslib");
exports.extractPagePath = function (location, withSearch) {
    if (location === void 0) { location = window.location; }
    if (withSearch === void 0) { withSearch = false; }
    var path = location.pathname.split('/').slice(3).join('/') + (withSearch ? (location.search ? location.search : '') : '');
    return decodeURIComponent(path);
};
exports.getBackToSiteQuery = function (location) {
    if (location === void 0) { location = window.location; }
    var pathParts = location.pathname.split('/');
    var isInDashboard = pathParts[1] === 'dashboard';
    if (!isInDashboard) {
        return {};
    }
    var dashboardPath = exports.extractPagePath(location, true);
    var metaSiteId = pathParts[2];
    return tslib_1.__assign({ metaSiteId: metaSiteId }, dashboardPath && { dashboardPath: "/" + dashboardPath });
};
exports.buildBackToSiteQueryString = function (_a) {
    var _b = _a === void 0 ? exports.getBackToSiteQuery() : _a, metaSiteId = _b.metaSiteId, dashboardPath = _b.dashboardPath;
    if (!metaSiteId) {
        return '';
    }
    var dashboardPathQueryString = dashboardPath ? "&dashboardPath=" + dashboardPath : '';
    return "metaSiteId=" + metaSiteId + dashboardPathQueryString;
};
//# sourceMappingURL=extract-page-path.js.map