import { __spreadArrays } from "tslib";
import { hasPermissions } from '../selectors/select-has-permissions';
import * as businessManagerApi from '@wix/business-manager-api';
export var callShowUnAuthorizedIfNeeded = function (entry, state, bmAPI) {
    if (bmAPI === void 0) { bmAPI = businessManagerApi; }
    if (!entry) {
        return;
    }
    var requiredPermissions = __spreadArrays((entry.enabledByPermissions || []), (entry.visibleByPermission ? [entry.visibleByPermission] : []));
    var hasAllPermissions = requiredPermissions.every(function (permission) { return hasPermissions(state, permission); });
    if (!hasAllPermissions) {
        bmAPI.showUnauthorizedPage();
    }
};
//# sourceMappingURL=call-show-unauthorized.js.map