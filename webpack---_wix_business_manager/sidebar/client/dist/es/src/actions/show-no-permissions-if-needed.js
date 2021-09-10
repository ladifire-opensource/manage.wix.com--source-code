import { ModuleRegistry } from 'react-module-container';
import { ROOT_ENTRY_ID } from '../services/convert-entries-to-nodes';
export var showNoPermissionsPageIfNeeded = function () {
    return function (dispatch, getState) {
        var sidebarNodes = getState().nodes;
        var visibleNodeIds = sidebarNodes[ROOT_ENTRY_ID].subItemIds;
        var anyEnabledNode = visibleNodeIds && visibleNodeIds.some(function (id) { return sidebarNodes[id].enabled; });
        if (!anyEnabledNode) {
            ModuleRegistry.invoke('businessManager.showNoPermissionsPage');
        }
    };
};
//# sourceMappingURL=show-no-permissions-if-needed.js.map