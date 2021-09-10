import { isCategory } from '@wix/business-manager-sidebar-data';
import { manageBackofficePermission, openDashboardPermission } from '../permissions';
import { hasPermissions } from '../selectors/select-has-permissions';
var getDefaultPermissions = function (entry) {
    if (isCategory(entry)) {
        return openDashboardPermission;
    }
    else {
        return manageBackofficePermission;
    }
};
export var filterByPermissions = function (state) { return function (entry) {
    return hasPermissions(state, entry.visibleByPermission || getDefaultPermissions(entry));
}; };
//# sourceMappingURL=filter-by-permission.js.map