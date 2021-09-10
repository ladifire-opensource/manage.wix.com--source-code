import { SET_ACTIVE_ENTRY } from './types';
import { showUnauthorizedIfNeeded } from './show-unauthorized-if-needed';
import { redirectHomePageIfNeeded } from '../services/redirect-home-page-if-needed';
import { selectNodes } from '../selectors/select-node';
import { selectRoles } from '../selectors/select-role';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
import { getEditorType } from '../selectors/select-site';
export var updateSidebarState = function () {
    return function (dispatch, getState) {
        var isRedirected = redirectHomePageIfNeeded(selectNodes(getState()), selectRoles(getState()));
        if (!isRedirected) {
            dispatch(updateActiveId());
        }
    };
};
export var updateActiveId = function () {
    return function (dispatch, getState, _a) {
        var findBestMatchingEntry = _a.findBestMatchingEntry, i18n = _a.i18n;
        var state = getState();
        var activeId = findBestMatchingEntry.findActiveNodeId(Object.values(state.nodes));
        var activeEntry = findBestMatchingEntry.findActiveEntry(state.entries, experimentsSelectors(state));
        var currentPageId = activeEntry && activeEntry.id;
        dispatch(updateActiveEntry(activeId, currentPageId));
        dispatch(showUnauthorizedIfNeeded());
        if (experimentsSelectors(state).enabled('specs.wosbm.ReflectPageNameOnBrowserTab')) {
            updateBrowserTabTitle(i18n.t(activeEntry.label), getEditorType(state));
        }
    };
};
var updateBrowserTabTitle = function (label, editor) {
    var brand = editor === 'EditorX' ? 'editorx.com' : 'Wix.com';
    document.title = label + " | " + brand;
};
export var updateActiveEntry = function (activeId, currentPageId) { return ({
    type: SET_ACTIVE_ENTRY,
    activeId: activeId,
    currentPageId: currentPageId
}); };
//# sourceMappingURL=update-active-id.js.map