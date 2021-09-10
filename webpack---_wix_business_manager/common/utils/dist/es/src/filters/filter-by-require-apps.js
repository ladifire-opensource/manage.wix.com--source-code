import { isGroupEnabled } from './common-filters';
export var buildFilterByInstalledApps = function (isAppInstalled) { return function (requiredApps) {
    if (requiredApps === void 0) { requiredApps = []; }
    var appIsAsRequired = function (_a) {
        var appDefId = _a[0], isRequired = _a[1];
        return isAppInstalled(appDefId) === isRequired;
    };
    var isEnabled = function (requiredApp) {
        if (typeof (requiredApp) === 'object') {
            return Object.entries(requiredApp).every(appIsAsRequired);
        }
        return isAppInstalled(requiredApp);
    };
    return isGroupEnabled(isEnabled, requiredApps);
}; };
//# sourceMappingURL=filter-by-require-apps.js.map