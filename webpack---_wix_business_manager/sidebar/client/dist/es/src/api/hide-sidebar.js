import { ModuleRegistry } from 'react-module-container';
import { setIsHidden } from '../actions/set-is-hidden';
import { SIDEBAR_HIDE_METHOD_NAME, SIDEBAR_UNHIDE_METHOD_NAME } from '@wix/business-manager-api';
export var registerHideSidebarApi = function (_a) {
    var dispatch = _a.dispatch;
    ModuleRegistry.registerMethod(SIDEBAR_HIDE_METHOD_NAME, function () { return function () {
        dispatch(setIsHidden(true));
        return function () { return dispatch(setIsHidden(false)); };
    }; });
    ModuleRegistry.registerMethod(SIDEBAR_UNHIDE_METHOD_NAME, function () { return function () { return dispatch(setIsHidden(false)); }; });
};
//# sourceMappingURL=hide-sidebar.js.map