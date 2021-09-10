import { __assign } from "tslib";
import { getFirstEnabledNode } from './getFirstEnabledNode';
import { isAppInstalled, navigateTo, PageComponentId, appDefIds, extractPagePath } from '@wix/business-manager-api';
var nttRoles = [
    'customerManager',
    'customerFinanceManager'
];
export var redirectHomePageIfNeeded = function (nodes, roles) {
    var navigate = function (navigateToConfig) {
        navigateTo(navigateToConfig);
        return true;
    };
    var primaryPath = extractPagePath();
    if (primaryPath.replace('/', '') === 'home') {
        var firstAvailableNode = getFirstEnabledNode(nodes);
        if (!firstAvailableNode) {
            return false;
        }
        var isDashboardEnabled = firstAvailableNode.navigateToConfig.pageComponentId === PageComponentId.Home;
        if (isAppInstalled(appDefIds.wixExpertsDashboard)) {
            return navigate({ pageComponentId: appDefIds.wixExpertsDashboard });
        }
        else if (roles.some(function (role) { return nttRoles.includes(role); })) {
            return navigate({ pageComponentId: PageComponentId.AnalyticsNgBm });
        }
        else if (!isDashboardEnabled) {
            var navigateToConfig = __assign({}, firstAvailableNode.navigateToConfig);
            delete navigateToConfig.contextData.referrer;
            return navigate(navigateToConfig);
        }
    }
    return false;
};
//# sourceMappingURL=redirect-home-page-if-needed.js.map