import { updateActiveEntry } from './update-active-id';
import { selectActiveParentNode } from '../selectors/select-active-node';
import { experimentsSelectors } from '@wix/wix-experiments-redux';
export var goToParentMenu = function () { return function (dispatch, getState, _a) {
    var findBestMatchingEntry = _a.findBestMatchingEntry;
    var state = getState();
    var activeId = selectActiveParentNode(state).id;
    var activeEntry = findBestMatchingEntry.findActiveEntry(state.entries, experimentsSelectors(state));
    var currentPageId = activeEntry && activeEntry.id;
    dispatch(updateActiveEntry(activeId, currentPageId));
}; };
//# sourceMappingURL=go-to-parent-menu.js.map