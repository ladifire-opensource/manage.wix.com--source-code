"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeepLinkContext = exports.getNavigateToConfigFromDeepLink = exports.getDashboardUrl = void 0;
var URI = require("urijs");
var MY_ACCOUNT_PREFIX = '/my-account/app';
exports.getDashboardUrl = function (_a) {
    var appDefId = _a.appDefId, metaSiteId = _a.metaSiteId, appState = _a.appState, referralInfo = _a.referralInfo;
    var dashboardUrl = "/dashboard/" + metaSiteId + "/app/" + appDefId + "/" + appState;
    return URI(dashboardUrl).addQuery({ referralInfo: referralInfo }).toString();
};
function getNavigateToConfigFromDeepLink(url) {
    var deepLinkContext = getDeepLinkContext(url);
    if (deepLinkContext) {
        return {
            pageComponentId: deepLinkContext.appDefinitionId,
            viewId: '',
            contextData: {
                appState: deepLinkContext.appState
            }
        };
    }
}
exports.getNavigateToConfigFromDeepLink = getNavigateToConfigFromDeepLink;
function getDeepLinkContext(url) {
    var uri = url && URI(url);
    if (canDeepLink(uri)) {
        return {
            appDefinitionId: uri.segment(2),
            appState: getState(uri).replace('%23', '')
        };
    }
}
exports.getDeepLinkContext = getDeepLinkContext;
function getState(uri) {
    var segments = uri.segment();
    var pathSuffix = segments.splice(4);
    var state = pathSuffix.join('/');
    return state + uri.search() + uri.hash();
}
function canDeepLink(uri) {
    return uri && uri.pathname().indexOf(MY_ACCOUNT_PREFIX) === 0;
}
//# sourceMappingURL=DeepLinkContextBuilder.js.map